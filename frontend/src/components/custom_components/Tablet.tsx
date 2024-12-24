import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface TabletProps {
    title?: string; // Optional title for the tablet
    children: React.ReactNode; // Content to render inside the tablet
}

export const Tablet: React.FC<TabletProps> = ({ title, children }) => {
    const { pathname } = useLocation();

    // Hide the Tablet on the homepage
    if(pathname === "/") {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%", // Fill the main content area
                    zIndex: 10,
                }}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="90%"
                    top={20}
                    position="absolute"
                >
                    <Box
                        width="90%"
                        maxWidth="800px"
                        bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
                        borderRadius="md"
                        boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
                        border="1px solid rgba(0, 153, 255, 0.5)"
                        padding="6"
                        overflow="hidden"
                    >
                        <VStack gap="1" align="stretch">
                            {/* Optional Title */}
                            {title && (
                                <Box
                                    as="h1"
                                    fontSize="2xl"
                                    textAlign="center"
                                    color="cyan.200"
                                    textShadow="0px 0px 10px cyan"
                                    mb={1}
                                >
                                    {title}
                                </Box>
                            )}

                            {/* Content Area */}
                            <Box>{children}</Box>

                        </VStack>
                    </Box>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
};
