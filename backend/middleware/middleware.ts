import express from "express";

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "super-secret";

export default function getUserId(req: express.Request): string | null {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer")) return null;
  const token = auth?.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload.userId;
  } catch (error) {
    return null;
  }
}
