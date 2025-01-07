import React, { useRef } from "react";
import { planets } from "@/constants/Planets.ts";
import { Color, Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { Sun } from "@/components/custom_components/Sun.tsx";
import { Planet } from "@/components/custom_components/Planet.tsx";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";

export const Scene: React.FC<{ navigate: (route: string) => void }> = ({ navigate }) => {
    const { pathname } = useLocation();

    const activePlanet = useSelector((state: RootState) => state.animation.activePlanet);
    const activePlanetStatus = useSelector((state: RootState) => state.animation.status);
    const cameraTarget = useRef(new Vector3()); // Store intermediate camera target positions
    const planetRefs = useRef<{ [key: string]: Mesh | null }>({}); // Store references to planet meshes

    useFrame(({ camera }) => {
        if(pathname === "/") {
            // Smooth zoom-out transition for the home page
            if(!cameraTarget.current.equals(new Vector3(0, 20, 20))) {
                cameraTarget.current.set(0, 20, 20); // Set zoom-out target
            }
            camera.position.lerp(cameraTarget.current, 0.1); // Smooth interpolation
            camera.lookAt(0, 0, 0);
        } else if(pathname === "/404") {
            // Zoom into the Sun for invalid routes
            camera.position.lerp(new Vector3(0, 0, 3), 0.1);
            camera.lookAt(0, 0, 0);
        } else if(activePlanet && activePlanetStatus === "success") {
            // Zoom into the selected planet
            const targetMesh = planetRefs.current[activePlanet.name];
            if(targetMesh) {
                const planetPosition = new Vector3();
                targetMesh.getWorldPosition(planetPosition);

                const zoomDistance = 2; // How close the camera gets to the planet
                const cameraOffset = new Vector3(0, 0, zoomDistance);

                cameraTarget.current.copy(planetPosition).add(cameraOffset);
                camera.position.lerp(cameraTarget.current, 0.1); // Smooth interpolation
                camera.lookAt(planetPosition);
            }
        } else if(activePlanetStatus === "idle" || activePlanetStatus === "loading") {
            // Hold the camera's position to avoid erratic movement
        }
    });


    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.5}/>
            <pointLight intensity={1} position={[0, 0, 0]}/>

            {/* Restrict user camera controls */}
            <OrbitControls enableDamping={true} dampingFactor={0.1} enableZoom={false} enablePan={false}
                           enableRotate={false}/>

            {/* Sun Component */}
            <Sun/>

            {/* Orbit Lines for planets */}
            {planets.map((planet, index) => (
                <Line
                    key={index}
                    points={getCirclePoints(planet.orbitRadius, 64)}
                    color="white"
                    lineWidth={0.5}
                />
            ))}

            {/* Render Planets */}
            {planets.map((planet) => (
                <Planet
                    key={planet.name}
                    initialPosition={planet.position}
                    texture={planet.texture}
                    orbitRadius={planet.orbitRadius}
                    speed={planet.speed}
                    glowColor={new Color(planet.glowColor)}
                    onClick={() => {
                        if(!activePlanet) {
                            navigate(`/${planet.route}`); // Navigate to the planet's route
                        }
                    }}
                    ref={(mesh) => (planetRefs.current[planet.name] = mesh)} // Store mesh reference
                    label={planet.route}
                />
            ))}

            {/* Postprocessing Effects */}
            <EffectComposer>
                <Bloom intensity={1.5} luminanceThreshold={0} luminanceSmoothing={0.9}/>
            </EffectComposer>
        </>
    );
};

// Function to generate points on a circular orbit
function getCirclePoints(radius: number, segments: number): [number, number, number][] {
    const points: [number, number, number][] = [];
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        points.push([x, 0, z]);
    }
    return points;
}
