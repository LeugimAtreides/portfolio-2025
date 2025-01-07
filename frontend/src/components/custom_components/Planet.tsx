import React, { forwardRef, useCallback, useRef } from "react";
import { Color, Mesh, TextureLoader } from "three";
import { useFrame } from "@react-three/fiber";
import { animated, useSpring } from "@react-spring/three";
import { RootState } from "@/redux/store.ts";
import { useSelector } from "react-redux";
import { Text } from "@react-three/drei";

interface PlanetProps {
    initialPosition: [x: number, y: number, z: number]; // Initial position in orbit
    texture: string; // Path to the texture
    onClick: () => void; // Navigation handler
    orbitRadius: number; // Radius of the orbit
    speed: number; // Speed of orbit
    glowColor: Color;
    label: string;
}

// Wrap with forwardRef
export const Planet = React.memo(
    forwardRef<Mesh, PlanetProps>(({
        initialPosition,
        texture,
        onClick,
        orbitRadius,
        speed,
        glowColor,
        label = "label",
    }, ref) => {
        const meshRef = useRef<Mesh>(null!);
        const activePlanet = useSelector((state: RootState) => state.animation.activePlanet);

        // Memoize the texture loader to prevent reloading the texture unnecessarily
        const planetTexture = React.useMemo(() => new TextureLoader().load(texture), [texture]);

        // Smooth camera transition
        const [spring] = useSpring<{ position: [number, number, number] }>(() => ({
            position: initialPosition,
            config: { tension: 120, friction: 30 },
        }));

        // Memoize the click handler so it's stable
        const handlePlanetClick = useCallback(() => {
            if(activePlanet?.position === initialPosition) {
                return;
            } // Prevent duplicate actions

            // Trigger navigation
            onClick();
        }, [activePlanet?.position, initialPosition, onClick]);

        // Animation loop - updates planet's position and rotation
        useFrame(({ clock }) => {
            if(meshRef.current) {
                const t = clock.getElapsedTime();
                const x = Math.cos(t * speed) * orbitRadius;
                const z = Math.sin(t * speed) * orbitRadius;

                meshRef.current.position.set(x, initialPosition[1], z);
                meshRef.current.rotation.y += 0.01; // Rotate the planet for realism
            }
        });

        return (
            <group>
                <animated.mesh
                    onClick={handlePlanetClick}
                    position={spring.position} // Use spring position for smooth animation
                    ref={(mesh) => {
                        if(mesh) {
                            meshRef.current = mesh as Mesh; // Type-safe assignment
                            if(typeof ref === "function") {
                                ref(mesh);
                            } else if(ref) {
                                (ref as React.MutableRefObject<Mesh>).current = mesh;
                            }
                        }
                    }}
                    onPointerOver={(e) => e.object.scale.set(1.2, 1.2, 1.2)} // Enlarge on hover
                    onPointerOut={(e) => e.object.scale.set(1, 1, 1)} // Reset size
                >
                    {/* Floating Label */}
                    <Text
                        position={[0, 1.5, 0]} // Offset above the planet
                        fontSize={0.3}
                        color="cyan"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.01}
                        outlineColor="black"
                    >
                        {label.toUpperCase()} {/* Label text in uppercase for a sci-fi feel */}
                    </Text>
                    <sphereGeometry args={[0.5, 32, 32]}/>
                    <meshStandardMaterial map={planetTexture} emissive={glowColor} emissiveIntensity={0.2}/>
                </animated.mesh>
            </group>
        );
    }),
);
