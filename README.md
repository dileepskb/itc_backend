
# ITC Backend

There is the backend of ITC



## Prisma Install

To deploy this project run

```bash
  pnpm add prisma @types/node --save-dev
  pnpm add @prisma/client @prisma/adapter-pg dotenv
  pnpm dlx prisma init --db --output ../generated/prisma
  pnpm dlx prisma migrate dev --name init
  pnpm dlx prisma generate
  pnpm dlx tsx prisma/seed.ts
```


## Usage/Examples
prisma.config.ts
```javascript
import "dotenv/config";
import { defineConfig, env } from "prisma/config";
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```
lib/prisma.ts
```javascript


import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };

```
schema.prisma
```javascript
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}
datasource db {
  provider = "postgresql"
}
model User { 
  id    Int     @id @default(autoincrement()) 
  email String  @unique
  name  String?
  posts Post[]
} 
model Post { 
  id        Int     @id @default(autoincrement()) 
  title     String
  content   String?
  published Boolean @default(false) 
  author    User    @relation(fields: [authorId], references: [id]) 
  authorId  Int
} 

```
prisma/seed.ts
```javascript


import { prisma } from "./lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      posts: {
        create: {
          title: "Hello World",
          content: "This is my first post!",
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  console.log("Created user:", user);

  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

