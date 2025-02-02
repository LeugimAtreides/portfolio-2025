import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useFetchReferencesQuery } from "@/redux/slices/api"; // Adjust path to your RTK Query slice for references
import type { ReferenceData } from "@/types";
import { ReferenceCard } from "@/components/custom_components/ReferenceCard"; // A new component similar to ProjectCard

export const References: React.FC = () => {
    const { data, isLoading, isError } = useFetchReferencesQuery();

    if (isLoading) {
        return (
            <VStack gap="6" padding="6">
                {[...Array(4)].map((_, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="md"
                        overflow="hidden"
                        boxShadow="md"
                        padding="6"
                        width="100%"
                        maxWidth="600px"
                    >
                        <Skeleton height="50px" borderRadius="md" mb="4"/>
                        <Skeleton height="20px" width="60%" mb="2"/>
                        <SkeletonText noOfLines={2} gap="2" height="16px"/>
                    </Box>
                ))}
            </VStack>
        );
    }

    if (isError || !data) {
        return (
            <Box textAlign="center" py="6">
                <Text>Failed to load references.</Text>
            </Box>
        );
    }

    return (
        <Box maxWidth="800px" margin="0 auto" padding="6" height="100%" overflow="hidden">
            {/* Scrollable Container */}
            <Box
                height="500px" // Fixed height for the scrollable area
                overflowY="auto"
                paddingRight="4"
            >
                <VStack gap="6" align="stretch">
                    {data.map((reference: ReferenceData) => (
                        <ReferenceCard key={reference.id} reference={reference}/>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};
