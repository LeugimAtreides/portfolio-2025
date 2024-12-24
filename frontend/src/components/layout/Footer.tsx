import React from "react";
import { Box, Flex, HStack, Icon, Link, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";

export const Footer: React.FC = () => {
    return (
        <Box as="footer" bg="black.700/60" color="white" py={4} mt="auto">
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                align="center"
                px={6}
            >
                {/* Left Section: Copyright */}
                <Text fontSize="sm" textAlign={{ base: "center", md: "left" }}>
                    © 2025 Miguel Villarreal. All Rights Reserved.
                </Text>

                {/* Center Section: Social Media Links */}
                <HStack>
                    <Link href="https://github.com/LeugimAtreides">
                        <Icon fontSize="2xl" color="white">
                            <FaGithub/>
                        </Icon>
                    </Link>
                    <Link href="https://www.linkedin.com/in/miguel-villarreal-90b271b1/">
                        <Icon fontSize="2xl" color="white">
                            <FaLinkedin/>
                        </Icon>
                    </Link>
                    <Link href="https://twitter.com/miguelvillarreal">
                        <Icon fontSize="2xl" color="white">
                            <FaBluesky/>
                        </Icon>
                    </Link>
                </HStack>

                <Text fontSize="sm" textAlign={{ base: "center", md: "right" }} mt={{ base: 2, md: 0 }}>
                    Crafted with passion and precision.
                </Text>
            </Flex>
        </Box>
    );
};
