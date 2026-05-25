import postgres from "postgres";
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

export const sql = postgres({
  host: required("POSTGRES_HOST"),

  port: Number(
    required("POSTGRES_PORT")
  ),

  database:
    required("POSTGRES_DB"),

  username:
    required("POSTGRES_USER"),

  password:
    required("POSTGRES_PASSWORD"),
});
