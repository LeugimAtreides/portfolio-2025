import { Box, Flex, HStack, StackSeparator, Text } from "@chakra-ui/react";
import { NavLink } from "@/components/custom_components/NavLink";

export const Navbar = () => {

    const linkHoverStyles = {
        color: "#0ff",
        textShadow: "0 0 8px #0ff",
        transition: "0.2s ease-in-out",
    };

    return (
        <Flex
            as="nav"
            position="fixed"
            top="0"
            left="0"
            width="100%"
            bg="blackAlpha.700"
            backdropFilter="blur(10px)"
            color="white"
            px={6}
            py={4}
            justify="space-between"
            align="center"
            zIndex="1000000"
            // Subtle bottom neon glow
            boxShadow="0 0 10px 0 #0ff"
            // Slightly elevate the nav above the content
        >
            {/* Left Section: Name and Title */}
            <Box>
                <Text
                    fontSize="lg"
                    fontWeight="bold"
                    textShadow="0 0 5px #0ff, 0 0 15px #0ff"
                    lineHeight="2"
                    letterSpacing="2px"

                >
                    Miguel Villarreal
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="gray.300">
                    Sr. Software Engineer, 7 YOE
                </Text>
            </Box>

            {/* Right Section: Navigation Links */}
            <HStack
                separator={<StackSeparator borderColor="gray.500"/>} // Subtle line separator
                gap={4}
            >
                {/* Each NavLink can have a custom neon hover effect.
            Ensure your NavLink component styles are set up to handle className or pass props. */}
                <NavLink
                    to="/"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                >
                    About
                </NavLink>
                <NavLink
                    to="/blog"
                >
                    Blog
                </NavLink>
                <NavLink
                    to="/projects"
                >
                    Projects
                </NavLink>
                <NavLink to="/references">
                    References
                </NavLink>
                <NavLink
                    to="/contact"
                >
                    Contact Me
                </NavLink>
            </HStack>
        </Flex>
    );
};
