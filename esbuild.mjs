import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/*"],
  outdir: "dist",
  bundle: true,
  loader: { ".ts": "ts" },
  jsxFactory: "h",
  chunkNames: "chunks/[name]-[hash]",
  format: "esm",
  splitting: true,
  inject: ["./f/h.ts"],
  minify: false,
});

console.log("⚡ Done");
