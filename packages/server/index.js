import { createRequire } from "module";
import { dirname, resolve } from "path";

import express from "express";
import { createRequestHandler } from "@remix-run/express";

let require = createRequire(import.meta.url);
let requirePath = require.resolve("remix-app");
let publicPath = resolve(dirname(requirePath), "../public");

let app = express();

app.use(express.static(publicPath, { maxAge: "5m" }));

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  app.all("*", async (req, res, next) => {
    try {
      for (let key of Object.keys(require.cache)) {
        if (key.startsWith(requirePath)) {
          delete require.cache[key];
        }
      }

      await createRequestHandler({
        build: require(requirePath),
        mode: "production",
      })(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
} else {
  app.all(
    "*",
    createRequestHandler({
      build: await import("remix-app"),
      mode: "production",
    })
  );
}

// eslint-disable-next-line no-undef
let port = Number(process.env.PORT || `3000`);
app.listen(port, () => {
  console.log(`🚀 Remix app is running at http://localhost:${port}`);
});
