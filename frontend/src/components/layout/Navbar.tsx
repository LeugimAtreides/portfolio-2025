import { Box, Flex, HStack, StackSeparator, Text } from "@chakra-ui/react";
import { NavLink } from "@/components/custom_components/NavLink";

export const Navbar = () => {
    return (
        <Flex
            as="nav"
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg="black.700/60" // Slightly transparent black background
            backdropFilter="blur(10px)" // Adds a frosted glass effect
            color="white"
            px={6}
            py={4}
            justify="space-between"
            align="center"
            zIndex="1000000" // Ensure it stays above all other components
        >
            {/* Left Section: Name and Title */}
            <Box>
                <Text fontSize="lg" fontWeight="bold">
                    Miguel Villarreal
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.300">
                    Sr. Software Engineer, 7 YOE
                </Text>
            </Box>

            {/* Right Section: Navigation Links */}
            <HStack separator={<StackSeparator/>}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/contact">Contact Me</NavLink>
            </HStack>
        </Flex>
    );
};
