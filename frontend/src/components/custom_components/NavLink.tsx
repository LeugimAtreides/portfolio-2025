import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetActivePlanet, setActivePlanetStart, setActivePlanetSuccess } from "@/redux/slices/animationSlice";
import { planets } from "@/constants/Planets";
import { SystemStyleObject, Text } from "@chakra-ui/react";

interface NavLinkProps {
    to: string; // The target route
    children: ReactNode; // The content of the link (can be text or other JSX)
    _hover: SystemStyleObject;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname === to; // Determine if the current route matches

    const handleClick = () => {
        const selectedPlanet = planets.find((planet) => planet.route === to.replace("/", ""));
        if (selectedPlanet) {
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
        <Text
            onClick={handleClick}
            fontSize="xl"
            fontWeight={isActive ? "bold" : "normal"}
            cursor="pointer"
            color={isActive ? "#2A5298" : "white"}
            textDecoration={isActive ? "underline" : "none"}
            textDecorationColor={isActive ? "#2A5298" : "transparent"}
            textDecorationThickness="2px"
            WebkitTextFillColor="inherit"
            WebkitTextStrokeWidth="0"
            _hover={{
                color: "#0ff",
                textShadow: "0 0 8px #0ff",
                transition: "0.2 ease-in-out",
            }}
        >
            {children}
        </Text>
    );
};
