import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
	experimental: {
		assets: true,
	},
	output: "server",
	// adapter: netlify(),
});
