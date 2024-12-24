import React from "react";
import { Box } from "@chakra-ui/react";
import backgroundImage from "@/assets/background/stars_milky_way.jpg"; // Adjust path as necessary

export const Background: React.FC = () => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundImage={`url(${backgroundImage})`} // Use the image as the background
            backgroundPosition="center"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            zIndex="-1"
        />
    );
};
