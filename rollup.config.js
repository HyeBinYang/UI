import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import analyze from "rollup-plugin-analyzer";
// import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
    }),
    analyze(),
    // copy({
    //   targets: [{ src: "src/assets/**/*", dest: "dist/assets" }],
    // }),
  ],
};
