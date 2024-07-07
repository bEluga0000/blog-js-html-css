const { z } = require("zod");

const blogInputs = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    topic: z.string().optional(),
    imageLink: z.string().optional(),
    published: z.boolean().optional(),
});

module.exports = { blogInputs };
