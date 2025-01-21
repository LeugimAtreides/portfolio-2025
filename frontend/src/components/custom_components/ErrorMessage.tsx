import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface ErrorMessageProps {
    message: string;
    onRetry?: () => void; // Optional retry callback
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <Box textAlign="center" py="6">
            <Heading as="h2" fontSize="xl" color="red.500" mb="4">
                Something went wrong
            </Heading>
            <Text color="gray.500" mb="6">{message}</Text>
            {onRetry && (
                <Button colorScheme="red" onClick={onRetry}>
                    Retry
                </Button>
            )}
        </Box>
    );
};
