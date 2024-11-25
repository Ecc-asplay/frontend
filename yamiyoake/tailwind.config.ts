import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'basebg': '#E8E7E6',
        'basegreen': '#A5BBA2',
        'middlebrown': '#B8A193',
        'inputbg': '#DDD4CF',
        // darkbrown
        'basetext': '#807267' ,
        'baseyellow': '#DBA958',

      },
    },
  },
  plugins: [],
};
export default config;
