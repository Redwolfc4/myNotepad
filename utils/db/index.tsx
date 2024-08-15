import { PrismaClient } from "@prisma/client";

let Database:PrismaClient;

if (process.env.NODE_ENV === 'production') {
  Database = new PrismaClient();
} else {
  if (!global.Database) {
    global.Database = new PrismaClient();
  }
  Database = global.Database;
}

// const Database = new PrismaClient()

export default Database;
