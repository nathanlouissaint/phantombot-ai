import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}`
    );
  }

  return value;
}

export const redis = new Redis({
  host: required("REDIS_HOST"),

  port: Number(
    required("REDIS_PORT")
  ),
});
