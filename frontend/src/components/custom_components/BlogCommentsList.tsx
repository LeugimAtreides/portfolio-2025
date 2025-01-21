import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useFetchBlogPostCommentsQuery } from "@/redux/slices/api.ts";
import { ErrorMessage } from "@/components/custom_components/ErrorMessage.tsx";

interface BlogCommentsListProps {
    blogId: string;
}

export const BlogCommentsList: React.FC<BlogCommentsListProps> = ({ blogId }) => {
    const { data: comments, isLoading, isError, refetch } = useFetchBlogPostCommentsQuery(blogId);

    if (isLoading) {
        return (
            <VStack gap="4" align="stretch">
                {[...Array(3)].map((_, index) => (
                    <Box
                        key={index}
                        border="1px solid rgba(0, 153, 255, 0.5)"
                        borderRadius="md"
                        padding="4"
                        bg="rgba(0, 0, 0, 0.6)"
                    >
                        <Skeleton height="20px" width="50%" mb="2"/>
                        <SkeletonText noOfLines={3} gap="4"/>
                    </Box>
                ))}
            </VStack>
        );
    }

    if (isError || !comments) {
        return <ErrorMessage message="Failed to load comments. Please try again later." onRetry={refetch}/>;
    }

    return (
        <VStack gap="4" align="stretch">
            {comments.sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime()).
                map((comment) => (
                    <Box
                        key={comment.id}
                        bg="rgba(0, 0, 0, 0.6)"
                        border="1px solid rgba(0, 153, 255, 0.5)"
                        padding="4"
                        borderRadius="md"
                    >
                        <Text fontWeight="bold" color="cyan.200">
                            {comment.name}
                        </Text>
                        <Text fontSize="sm" color="gray.300">
                            {comment.comment}
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt="2">
                            {new Date(comment.created_at as string).toLocaleString()}
                        </Text>
                    </Box>
                ))}
        </VStack>
    );
};
