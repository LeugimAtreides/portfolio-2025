import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export const HomeLayout: React.FC = () => {
    const [, setScrollY] = useState(0);
    const heroControls = useAnimation();

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            setScrollY(scrollPos);

            if(scrollPos > 200) {
                heroControls.start({ opacity: 0, pointerEvents: "none" });
            } else {
                heroControls.start({ opacity: 1, pointerEvents: "auto" });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [heroControls]);

    return (
        <Box minHeight="100vh" bg="transparent" overflow="hidden" position="relative">
            {/* Hero Section */}
            {location.pathname === "/" && (
                <motion.div
                    animate={heroControls}
                    initial={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Flex
                        align="center"
                        justify="center"
                        height="100vh"
                        bg="rgba(0, 0, 0, 0.6)"
                        backdropFilter="blur(10px)"
                        color="white"
                        textAlign="center"
                        px={6}
                    >
                        <Text fontSize="3xl" fontWeight="bold" maxWidth="600px">
                            "Imagination is the only weapon in the war against reality." – Lewis Carroll
                        </Text>
                    </Flex>
                </motion.div>
            )}

            {/* Orrery Section */}
            <Box flex="1" position="relative" width="100%" minHeight="100%">
                <Outlet/>
            </Box>
        </Box>
    );
};
