import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber"; // For animation
import { Color, Mesh, TextureLoader } from "three";
import sunTexturePath from "@/assets/textures/sun_texture.jpg";

export const Sun: React.FC = () => {
    const sunRef = useRef<Mesh>(null); // Reference for the Sun mesh

    // Load the texture
    const sunTexture = new TextureLoader().load(sunTexturePath);

    // Rotate the Sun
    useFrame(() => {
        if(sunRef.current) {
            sunRef.current.rotation.y += 0.002; // Rotate slowly on the Y-axis
        }
    });

    return (
        <mesh ref={sunRef}>
            {/* Sun Geometry */}
            <sphereGeometry args={[1.5, 32, 32]}/>

            {/* Material with Texture and Glow */}
            <meshStandardMaterial
                map={sunTexture} // Apply texture
                emissive={new Color("orange")} // Add emissive glow with stronger color
                emissiveIntensity={.8} // Higher intensity for glowing effect
            />
        </mesh>
    );
};