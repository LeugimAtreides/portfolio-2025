import React from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFetchAboutMeQuery } from "@/redux/slices/api.ts";
import { ErrorMessage } from "@/components/custom_components/ErrorMessage.tsx";

export const About: React.FC = () => {
    const { data, isLoading, isError } = useFetchAboutMeQuery();
    const navigate = useNavigate();

    if(isLoading) {
        return (
            <Box
                maxWidth="800px"
                margin="0 auto"
                padding="6"
                bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
                borderRadius="md"
                boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
                border="1px solid rgba(0, 153, 255, 0.5)"
            >
                Loading...
            </Box>
        );
    }

    if(isError || !data) {
        return <ErrorMessage message={"Failed to load about me content"}/>;
    }

    return (
        <Box
            maxWidth="800px"
            maxHeight="60vh" // Prevent tablet from exceeding the viewport
            margin="5vh auto" // Add vertical margin to prevent cutting off
            padding="6"
            bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
            borderRadius="md"
            boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
            border="1px solid rgba(0, 153, 255, 0.5)"
            overflowY="auto" // Enable scrolling for content overflow
            lineHeight="1.3"
            position="relative"
        >
            {/* Floating Image */}
            <Image
                src={data[0].image}
                alt={data[0].title}
                boxSize="150px"
                borderRadius="md"
                objectFit="cover"
                float="left"
                marginRight="16px"
                marginBottom="8px"
                boxShadow="md"
            />

            {/* Title */}
            <Heading
                as="h1"
                fontSize="xl"
                textAlign="left"
                mb="4"
                color="cyan.200"
                textShadow="0px 0px 10px cyan"
            >
                {data[0].title}
            </Heading>

            {/* Content */}
            <Text fontSize="sm" textAlign="justify" color="gray.300">
                {data[0].content}
            </Text>

            {/* Clear Floated Elements */}
            <Box clear="both" mt="6">
                <Button
                    bg="cyan.600"
                    color="white"
                    _hover={{
                        bg: "cyan.700",
                        boxShadow: "0px 0px 10px cyan",
                    }}
                    boxShadow="0px 0px 5px rgba(0, 153, 255, 0.5)"
                    onClick={() => navigate("/contact")}
                >
                    Work With Me
                </Button>
            </Box>
        </Box>
    );
};
