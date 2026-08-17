import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";

import getUserId from "./middleware/middleware";

import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { includes } from "zod";
import { channel } from "node:diagnostics_channel";

const R2_URL =
  "https://aec64b6970178986c891548e70bc2de3.r2.cloudflarestorage.com";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_ACCESS_SECRET_KEY = process.env.R2_ACCESS_SECRET_KEY!;

const S3 = new S3Client({
  region: "auto", // Required by SDK but not used by R2
  // Provide your Cloudflare account ID
  endpoint: R2_URL,
  // Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_ACCESS_SECRET_KEY,
  },
});

const express = require("express");
const app = express();
const cors = require("cors");
const z = require("zod");

const bcrypt = require("bcrypt");
const PORT = 3000;

const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

app.use(cors());
app.use(express.json());

/* validation schemas */

const signUpSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
  gender: z.enum(["Male", "Female", "Other"]),
  channelName: z.string().min(1),
});

const signInSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

const uploadSchema = z.object({
  videoUrl: z.url(),
  thumbnail: z.url(),
});

app.post("/api/signup", async (req, res) => {
  console.log(req.body, "req");
  const parsed = signInSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { username, password, gender, channelName } = req.body;
  console.log(channelName, "channelName");
  const existing = await prisma.user.findFirst({ where: { username } });
  if (existing) {
    return res.status(409).json({ error: "Username already taken" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, password: hashedPassword, gender, channelName },
  });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.status(201).json({ token, userId: user.id });
});

app.post("/api/signin", async (req, res) => {
  const parsed = signInSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.message });
  }
  const { username, password } = req.body;
  const user = await prisma.user.findFirst({ where: { username } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const validPassword = bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  return res.status(201).json({ token, userId: user.id });
});

app.get("/api/videos", async (req, res) => {
  const videos = await prisma.uploads.findMany({
    include: {
      user: {
        select: {
          id: true,
          channelName: true,
          profilePicture: true,
          username: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  res.json(videos);
});

app.get("/api/videos/:id", async (req, res) => {
  const video = await prisma.uploads.findUnique({
    where: { id: req.params.id },
    include: {
      user: { select: { id: true, channelName: true, profilePicture: true } },
    },
  });

  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json(video);
});

app.get("/api/channel/:username", async (req, res) => {
  const username = req.params.username;

  try {
    console.log(username);
    const findUser = await prisma.user.findFirst({
      where: { username: username },
      select: {
        username: true,
        id: true,
        channelName: true,
        subscriberCount: true,
        profilePicture: true,
      },
    });
    const uploads = await prisma.uploads.findMany({
      where: { userid: findUser.id },
    });
    res.json({ uploads, findUser });
  } catch (error) {
    res.status(500).json({ error: "Couldnt find" });
  }
});

app.post("/api/videos", async (req, res) => {
  const userId = getUserId(req);
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const parsed = uploadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
  }
  const video = await prisma.uploads.create({
    data: { ...req.body, userid: userId },
  });
  res.status(201).json(video);
});

app.post("/getPresignedUrl", async (req, res) => {
  // Generate presigned URL for reading (GET)
  const public_url = "https://pub-243c58f3d20f47dfb6bea976593f2b58.r2.dev";

  // https://my-bucket.<ACCOUNT_ID>.r2.cloudflarestorage.com/image.png?X-Amz-Algorithm=...

  // Generate presigned URL for writing (PUT)
  // Specify ContentType to restrict uploads to a specific file type
  const videoPath = "/videos/" + Math.random() + ".mp4";

  const putUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "youtube-clone",
      Key: videoPath,
      ContentType: "video/mp4",
    }),
    { expiresIn: 3600 },
  );

  res.json({
    putUrl,
    finalVideoUrl: public_url + "/" + videoPath,
  });
});
app.post("/getPresignedUrlForImageUpload", async (req, res) => {
  const public_url = "https://pub-243c58f3d20f47dfb6bea976593f2b58.r2.dev";
  // Generate presigned URL for reading (GET)

  // https://my-bucket.<ACCOUNT_ID>.r2.cloudflarestorage.com/image.png?X-Amz-Algorithm=...

  // Generate presigned URL for writing (PUT)
  // Specify ContentType to restrict uploads to a specific file type
  const videoPath = "/images/" + Math.random() + ".jpeg";

  const putUrl = await getSignedUrl(
    S3,
    new PutObjectCommand({
      Bucket: "youtube-clone",
      Key: videoPath,
      ContentType: "image./jpeg",
    }),
    { expiresIn: 3600 },
  );

  res.json({
    putUrl,
    finalVideoUrl: public_url + "/" + videoPath,
  });
});

app.listen(PORT, () => {
  console.log("app is listening in " + PORT);
});
