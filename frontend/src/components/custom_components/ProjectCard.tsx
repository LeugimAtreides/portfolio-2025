import type { ProjectData } from "@/types.ts";
import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

interface ProjectCardProps {
    project: ProjectData;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            bg="white"
            padding="6"
            width="100%"
            maxWidth="800px"
            transition="all 0.3s ease"
            maxHeight={isExpanded ? "none" : "350px"} // Expandable height
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                gap="4"
                alignItems="flex-start"
            >
                {/* Project Image */}
                <Image
                    src={project.image}
                    alt={project.title}
                    borderRadius="md"
                    width="150px" // Fixed width
                    height="150px" // Fixed height
                    objectFit="cover" // Ensure proper cropping
                    flexShrink={0}
                />

                {/* Project Content */}
                <Box flex="1">
                    <Heading as="h3" fontSize="xl" mb="2" color="blue.600">
                        {project.title}
                    </Heading>

                    {/* Project Description */}
                    <Text
                        fontSize="md"
                        mb="4"
                        color="gray.700"
                        lineClamp={isExpanded ? undefined : 4} // Truncate if not expanded
                    >
                        {project.description}
                    </Text>

                    {/* GitHub Link */}
                    <Link
                        href={project.url}
                        fontSize="md"
                        color="blue.500"
                        fontWeight="bold"
                        display="block"
                        mb="4"
                    >
                        View on GitHub
                    </Link>

                    {/* Expand/Collapse Button */}
                    {project.description.length > 200 && (
                        <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={handleToggle}
                        >
                            {isExpanded ? "View Less" : "View More"}
                        </Button>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};