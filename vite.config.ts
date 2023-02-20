import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import dotenv from "dotenv";
import { defineConfig } from "vite";

export default defineConfig(() => {
  dotenv.config();
  return {
    plugins: [solid({
      ssr: false, adapter: netlify({ edge: true })
    })],
  };
});