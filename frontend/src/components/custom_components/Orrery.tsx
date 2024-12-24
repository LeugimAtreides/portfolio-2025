import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { planets } from "@/constants/Planets.ts";
import { Scene } from "@/components/custom_components/Scene.tsx";
import { useDispatch } from "react-redux";
import { resetActivePlanet, setActivePlanetStart, setActivePlanetSuccess } from "@/redux/slices/animationSlice.ts";

interface OrreryProps {
    page?: string; // Passed from the router
}

export const Orrery: React.FC<OrreryProps> = ({ page }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Set the target planet in Redux when the page changes
    useEffect(() => {
        const selectedPlanet = planets.find((planet) => planet.route === page);
        if(selectedPlanet) {
            dispatch(setActivePlanetStart());

            setTimeout(() => {
                // Complete the transition
                dispatch(setActivePlanetSuccess(selectedPlanet));
            }, 100); // Adjust the timeout as necessary
        } else {
            dispatch(resetActivePlanet());
        }
    }, [page, dispatch]);

    return (
        <Scene navigate={navigate}/>
    );
};