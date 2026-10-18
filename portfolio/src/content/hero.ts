export const heroSnippets = {
  client: `const res = await fetch('/api/books?limit=10');\nconst books = await res.json();`,
  controller: `@Get()\nfindAll(@Query() query: ListBooksDto) {\n  return this.booksService.findAll(query);\n}`,
  database: `prisma.book.findMany({\n  take: 10,\n  orderBy: { createdAt: 'desc' },\n  select: { id: true, title: true, author: true },\n});`,
} as const;
