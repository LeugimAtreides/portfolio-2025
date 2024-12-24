import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetActivePlanet, setActivePlanetStart, setActivePlanetSuccess } from "@/redux/slices/animationSlice";
import { planets } from "@/constants/Planets";

interface NavLinkProps {
    to: string; // The target route
    children: ReactNode; // The content of the link (can be text or other JSX)
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname === to; // Determine if the current route matches

    const handleClick = () => {
        const selectedPlanet = planets.find((planet) => planet.route === to.replace("/", ""));
        if(selectedPlanet) {
            dispatch(setActivePlanetStart());

            setTimeout(() => {
                // Complete the transition
                dispatch(setActivePlanetSuccess(selectedPlanet));
                navigate(to); // Navigate to the new route
            }, 100); // Adjust the timeout as necessary
        } else {
            dispatch(resetActivePlanet());
            navigate(to); // Navigate to the fallback route
        }
    };

    return (
        <span
            onClick={handleClick}
            style={{
                fontSize: "16px",
                fontWeight: isActive ? "bold" : "normal", // Ensure only active links are bold
                cursor: "pointer",
                color: isActive ? "#2A5298" : "white", // Canaveral Blue for active links
                textDecoration: isActive ? "underline" : "none", // Underline for active links
                textDecorationColor: isActive ? "#2A5298" : "transparent", // Canaveral Blue underline
                textDecorationThickness: "2px", // Thickness of the underline
                // Explicitly override the default :visited styles
                WebkitTextFillColor: "inherit", // Ensures color matches the `isActive` logic
                WebkitTextStrokeWidth: "0",
            }}
        >
            {children}
        </span>
    );
};
