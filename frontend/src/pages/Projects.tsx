import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useFetchProjectsQuery } from "@/redux/slices/api.ts"; // Adjust the path to your RTK Query API slice
import type { ProjectData } from "@/types.ts";
import { ProjectCard } from "@/components/custom_components/ProjectCard.tsx";

export const Projects: React.FC = () => {
    const { data, isLoading, isError } = useFetchProjectsQuery();

    if(isLoading) {
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
                        <Skeleton height="200px" borderRadius="md" mb="4"/>
                        <Skeleton height="20px" width="70%" mb="2"/>
                        <SkeletonText noOfLines={3} gap="4" height="20px"/>
                    </Box>
                ))}
            </VStack>
        );
    }

    if(isError || !data) {
        return (
            <Box textAlign="center" py="6">
                <Text>Failed to load projects.</Text>
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
                    {data.map((project: ProjectData) => (
                        <ProjectCard key={project.id} project={project}/>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};
