import jwt from "jsonwebtoken";
import { prisma } from "./lib/prisma";
import { error } from "node:console";
import getUserId from "./middleware/middleware";

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
      user: { select: { id: true, channelName: true, profilePicture: true } },
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

app.listen(PORT, () => {
  console.log("app is listening in " + PORT);
});
