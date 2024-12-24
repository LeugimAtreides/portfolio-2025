import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        keyframes: {
            // Existing animations
            rotate: {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
            },
            zoomIn: {
                "0%": { transform: "scale(1)", opacity: "1" },
                "50%": { transform: "scale(1.2)", opacity: "0.9" },
                "100%": { transform: "scale(1.5)", opacity: "1" },
            },
            // Twinkling stars
            twinkling: {
                "0%": { opacity: "0.9" },
                "50%": { opacity: "0.5" },
                "100%": { opacity: "0.9" },
            },
            // Parallax effect for star layers
            parallax1: {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-10%)" },
            },
            parallax2: {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-20%)" },
            },
            parallax3: {
                "0%": { transform: "translateX(0)" },
                "100%": { transform: "translateX(-30%)" },
            },
            // Shooting stars
            shootingStars: {
                "0%": {
                    background: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
                    transform: "translate(-100%, -100%)",
                },
                "50%": {
                    background: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    transform: "translate(50%, 50%)",
                },
                "100%": {
                    background: "radial-gradient(circle, rgba(255,255,255,0) 1px, transparent 1px)",
                    transform: "translate(150%, 150%)",
                },
            },
        },
        tokens: {
            animations: {
                // Existing animations
                rotate: {
                    value: "rotate 20s linear infinite", // 20 seconds rotation
                    description: "Continuous rotation of planets",
                },
                zoomIn: {
                    value: "zoomIn 0.5s ease-in-out", // 0.5 seconds zoom
                    description: "Zoom-in effect on click or hover",
                },
                // New animations
                twinkling: {
                    value: "twinkling 3s infinite",
                    description: "Subtle twinkling effect for stars",
                },
                parallax1: {
                    value: "parallax1 30s linear infinite",
                    description: "Slow parallax movement for layer 1",
                },
                parallax2: {
                    value: "parallax2 50s linear infinite",
                    description: "Medium parallax movement for layer 2",
                },
                parallax3: {
                    value: "parallax3 70s linear infinite",
                    description: "Fast parallax movement for layer 3",
                },
                shootingStars: {
                    value: "shootingStars 5s ease-in-out infinite",
                    description: "Dynamic shooting stars animation",
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, customConfig);
