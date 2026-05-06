import React from "react";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFetchAboutMeQuery } from "@/redux/slices/api.ts";
import { ErrorMessage } from "@/components/custom_components/ErrorMessage.tsx";

export const About: React.FC = () => {
    const { data, isLoading, isError } = useFetchAboutMeQuery();
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Box py={4} px={2} textAlign="center" color="cyan.100" letterSpacing="wide">
                Loading…
            </Box>
        );
    }

    if (isError || data == null) {
        return (
            <ErrorMessage message="Failed to load about me content" />
        );
    }

    if (data.length === 0) {
        return (
            <ErrorMessage message="No about me content yet — add one in Django admin (About me section)." />
        );
    }

    const about = data[0];

    return (
        <VStack align="stretch" gap={5} maxH={{ base: "65vh", md: "58vh" }} overflowY="auto" px={{ base: 1, sm: 2 }} pb={2}>
            {/* Readable content panel — contrast against the animated planet behind the tablet */}
            <Box
                bg="linear-gradient(180deg, rgba(0, 28, 56, 0.72) 0%, rgba(4, 40, 72, 0.65) 100%)"
                borderRadius="lg"
                border="1px solid rgba(56, 189, 248, 0.35)"
                boxShadow="inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.35)"
                px={{ base: 4, md: 6 }}
                py={{ base: 5, md: 6 }}
                backdropFilter="blur(8px)"
            >
                <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: 5, md: 8 }}
                    align={{ base: "center", md: "flex-start" }}
                >
                    {about.image ? (
                        <Box flexShrink={0}>
                            <Image
                                src={about.image}
                                alt={about.title}
                                width={{ base: "180px", md: "200px" }}
                                height={{ base: "180px", md: "200px" }}
                                borderRadius="xl"
                                objectFit="cover"
                                border="2px solid rgba(34, 211, 238, 0.45)"
                                boxShadow="0 4px 24px rgba(0,0,0,0.45), 0 0 20px rgba(34, 211, 238, 0.15)"
                            />
                        </Box>
                    ) : null}

                    <VStack align="stretch" gap={3} flex="1" minW={0}>
                        <Heading
                            as="h2"
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="semibold"
                            color="cyan.100"
                            letterSpacing="tight"
                            lineHeight="short"
                            textShadow="0 0 24px rgba(34, 211, 238, 0.35)"
                        >
                            {about.title}
                        </Heading>

                        <Text
                            fontSize={{ base: "sm", md: "md" }}
                            lineHeight="taller"
                            color="gray.100"
                            textAlign="left"
                            whiteSpace="pre-line"
                            css={{
                                textWrap: "pretty",
                            }}
                        >
                            {about.content}
                        </Text>
                    </VStack>
                </Flex>
            </Box>

            <Flex justify={{ base: "center", md: "flex-start" }} pt={1}>
                <Button
                    size="md"
                    bg="cyan.700"
                    color="white"
                    fontWeight="semibold"
                    px={8}
                    borderRadius="md"
                    border="1px solid rgba(103, 232, 249, 0.4)"
                    transition="all 0.2s ease"
                    _hover={{
                        bg: "cyan.600",
                        borderColor: "cyan.300",
                        boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
                        transform: "translateY(-1px)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    onClick={() => navigate("/contact")}
                >
                    Work With Me
                </Button>
            </Flex>
        </VStack>
    );
};
