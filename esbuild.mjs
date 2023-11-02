import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index", "./src/h"],
  outdir: "dist",
  bundle: true,
  loader: { ".ts": "ts" },
  jsxFactory: "h",
  chunkNames: "chunks/[name]-[hash]",
  format: "esm",
  splitting: true,
  minify: true,
});

console.log("⚡ Done");
