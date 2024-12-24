import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* 404 Overlay */}
            <Box
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                bg="rgba(0, 0, 0, 0.8)"
                color="cyan.200"
                zIndex="1000"
                textAlign="center"
                padding="4"
            >
                <Text fontSize="6xl" fontWeight="bold" textShadow="0px 0px 10px cyan">
                    404
                </Text>
                <Text fontSize="lg" mb="6" textShadow="0px 0px 5px cyan">
                    Lost in Space! The page you're looking for doesn't exist.
                </Text>
                <Button
                    onClick={() => navigate("/")}
                    bg="cyan.600"
                    color="white"
                    _hover={{
                        bg: "cyan.700",
                        boxShadow: "0px 0px 10px cyan",
                    }}
                    boxShadow="0px 0px 5px rgba(0, 153, 255, 0.5)"
                >
                    Return to Orrery
                </Button>
            </Box>
        </>
    );
};
