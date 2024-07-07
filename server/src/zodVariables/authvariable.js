const { z } = require('zod');

const authVariables = z.object({
    username: z.string(),
    password: z.string()
});

module.exports = { authVariables };
