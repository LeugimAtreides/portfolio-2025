import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { planets } from "@/constants/Planets.ts";
import { Scene } from "@/components/custom_components/Scene.tsx";
import { useDispatch } from "react-redux";
import { resetActivePlanet, setActivePlanetStart, setActivePlanetSuccess } from "@/redux/slices/animationSlice.ts";

export const Orrery: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Extract the base route for subroutes like /blog/:id
        const baseRoute = pathname?.split("/")[1];

        // Set the target planet in Redux when the page changes
        const selectedPlanet = planets.find((planet) => planet.route === baseRoute);

        if (selectedPlanet) {
            dispatch(setActivePlanetStart());

            setTimeout(() => {
                // Complete the transition
                dispatch(setActivePlanetSuccess(selectedPlanet));
            }, 100); // Adjust the timeout as necessary
        } else {
            dispatch(resetActivePlanet());
        }
    }, [pathname, dispatch]);

    return (
        <Scene navigate={navigate}/>
    );
};