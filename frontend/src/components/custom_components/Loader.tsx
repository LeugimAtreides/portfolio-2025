import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

// Define a spin animation for the loader
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// You can adjust this hex value to your desired canaveral blue shade
const CANAVERAL_BLUE = "#0a74da";

export const SciFiLoader: React.FC = () => {
  return (
    <Box
      minH="100vh"
      w="100%"
      // Create a space-like radial gradient background
      bg="radial-gradient(circle, #001f3f, #000000)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={4}
    >
      {/* Animated orbit-like spinner */}
      <Box
        w="120px"
        h="120px"
        border="8px solid"
        borderColor={CANAVERAL_BLUE}
        borderTopColor="transparent"
        borderRadius="full"
        animation={`${spin} 1.5s linear infinite`}
      />

      {/* Sci-fi loading text */}
      <Text color={CANAVERAL_BLUE} mt={6} fontSize="xl" textShadow="0px 0px 10px rgba(10, 116, 218, 0.8)">
        Engaging Hyperdrive...
      </Text>
    </Box>
  );
};