import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cocoa: "#A67B5B",
                sand: "#D9C7A1",
                cream: "#F5E9D4",
                espresso: "#3E352F",
                walnut: "#8C6A4A",
                ivory: "#F6F2EB",
            },
        },
    },
    plugins: [],
};

export default config;
