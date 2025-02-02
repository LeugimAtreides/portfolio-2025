import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { ReferenceData } from "@/types";

type ReferenceCardProps = {
    reference: ReferenceData;
};

export const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            p="6"
            width="100%"
            bg="white"
        >
            <Stack gap={3}>
                <Heading as="h2" size="md">
                    {reference.name}
                </Heading>
                <Text fontWeight="semibold" color="gray.600">
                    {reference.job_title}
                </Text>
                <Text color="blue.500" fontSize="sm">
                    {reference.contact_info}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    Created: {new Date(reference.created_at).toLocaleDateString()}
                </Text>
                <Text fontSize="xs" color="gray.500">
                    Updated: {new Date(reference.updated_at).toLocaleDateString()}
                </Text>
            </Stack>
        </Box>
    );
};
