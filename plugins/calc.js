const { cmd } = require("../command");
const math = require("mathjs");

cmd(
  {
    pattern: "calc",
    alias: ["calculate", "math"],
    react: "🧮",
    desc: "Real calculator with advanced math support",
    category: "tools",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      q,
      reply,
    }
  ) => {
    try {
      if (!q)
        return reply(`*📌 Please provide a math expression to evaluate.*\n\n*Examples:*\n.calc 5 + 3\n.calc sqrt(25)\n.calc sin(30 deg)\n.calc 3^3 + log(100)`);

      // Clean and sanitize expression
      const sanitized = q.replace(/[^\d\s+\-*/%^().,a-zA-Z]/g, "");

      // Set up a math context to support degrees
      const scope = {
        deg: math.unit(1, "deg"),
        pi: math.pi,
        e: math.e
      };

      let result;
      try {
        result = math.evaluate(sanitized, scope);
      } catch (err) {
        return reply(`❌ *Invalid Expression:*\n\`\`\`${err.message}\`\`\``);
      }

      return reply(`*🧮 Calculator Result:*\n\`\`\`${q} = ${result}\`\`\``);
    } catch (e) {
      console.error(e);
      reply(`❌ *Unexpected Error:* ${e.message}`);
    }
  }
);
