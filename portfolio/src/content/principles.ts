import type { Principle } from "@/types/content";

export const principles: Principle[] = [
  {
    id: "systems-architecture",
    index: "01",
    title: "Systems Architecture",
    lab: {
      label: "University lab",
      summary:
        "Built a library management app as one Express file with routes, SQL and validation mixed together.",
    },
    production: {
      label: "Production",
      summary:
        "Split into NestJS modules with dependency injection, DTO validation and clear boundaries, so each feature can change without touching the others.",
      bullets: [
        "Each module (auth, books, loans) owns its controller, service and Prisma access; no cross-module imports except through exported services.",
        "Every request body passes a validated DTO, so bad input is rejected with a 400 before any business logic runs.",
      ],
    },
  },
  {
    id: "database-normalization",
    index: "02",
    title: "Database Normalization",
    lab: {
      label: "University lab",
      summary:
        "Normalized a schema to 3NF on paper and in an ER diagram, with no data volume and no indexes.",
    },
    production: {
      label: "Production",
      summary:
        "Model in 3NF by default, enforce it with Prisma migrations and constraints, and denormalize only when a measured query demands it.",
      bullets: [
        "Added a composite index on (user_id, created_at); the loan history query dropped from 180 ms to 12 ms on 100k seeded rows.",
        "Kept a denormalized loan_count column on books, documented in the schema, because the catalogue page read it on every request.",
      ],
    },
  },
  {
    id: "algorithms",
    index: "03",
    title: "Algorithms",
    lab: {
      label: "University lab",
      summary:
        "Analysed Big-O of sorting and searching on arrays of a few hundred items in a coursework exercise.",
    },
    production: {
      label: "Production",
      summary:
        "Complexity shows up as pagination, caching and N+1 queries; the right algorithm is the one that keeps p95 latency flat as data grows.",
      bullets: [
        "Replaced offset pagination with cursor pagination; a 40k-row list stays under 60 ms on any page.",
        "Fixed an N+1 query with a single Prisma include, cutting one endpoint from 31 queries to 2.",
      ],
    },
  },
];
