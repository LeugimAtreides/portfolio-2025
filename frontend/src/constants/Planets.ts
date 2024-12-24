import earthTexture from "@/assets/textures/earth_texture.jpg";
import marsTexture from "@/assets/textures/mars_texture.jpg";
import jupiterTexture from "@/assets/textures/jupiter_texture.jpg";
import venusTexture from "@/assets/textures/venus_texture.jpg";
import { PlanetData } from "@/types.ts";

export const planets: PlanetData[] = [
    {
        position: [3, 0, 2],
        texture: venusTexture, // Add the texture for Venus
        route: "contact", // Define the route for Venus
        name: "Venus",
        orbitRadius: 3,
        speed: 0.12,
        glowColor: "yellow",
    },
    {
        position: [5, 0, 0],
        texture: earthTexture,
        route: "about",
        name: "Earth",
        orbitRadius: 5,
        speed: 0.1,
        glowColor: "blue",
    },
    {
        position: [-7, 0, 3],
        texture: marsTexture,
        route: "blog",
        name: "Mars",
        orbitRadius: 7,
        speed: 0.08,
        glowColor: "red",
    },
    {
        position: [10, 0, -5],
        texture: jupiterTexture,
        route: "projects",
        name: "Jupiter",
        orbitRadius: 10,
        speed: 0.05,
        glowColor: "tan",
    },
];