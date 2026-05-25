import Fastify from "fastify";
import dotenv from "dotenv";

import { ingestRoute } from "./routes/ingest.route";

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

const server = Fastify({
  logger: true,
});

server.get("/health", async () => {
  return {
    status: "ok",
    service: "ingestion-api",
  };
});

server.register(ingestRoute);

const start = async () => {
  try {
    await server.listen({
      port: Number(
        required("PORT")
      ),

      host: "0.0.0.0",
    });

    console.log(
      "Ingestion API running"
    );
  } catch (error) {
    server.log.error(error);

    process.exit(1);
  }
};

start();
