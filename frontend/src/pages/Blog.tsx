import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useFetchBlogPostsQuery } from "@/redux/slices/api.ts"; // Adjust the path to your RTK Query API slice
import { ErrorMessage } from "@/components/custom_components/ErrorMessage.tsx";
import { BlogPostCard } from "@/components/custom_components/BlogPostCard.tsx";
import { BlogPostData } from "@/types.ts";

export const Blog: React.FC = () => {
    const { data, isLoading, isError } = useFetchBlogPostsQuery();

    if(isLoading) {
        return (
            <Box maxWidth="800px" margin="0 auto" padding="6" height="100%" overflow="hidden">
                <VStack gap="6" padding="6">
                    {[...Array(2)].map((_, index) => (
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
                            <SkeletonText noOfLines={2} gap="4" height="20px"/>
                        </Box>
                    ))}
                </VStack>
            </Box>
        );
    }

    if(isError || !data) {
        return <ErrorMessage message={"Something went wrong getting the blog articles"}/>;
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
                    {data.map((blogPost: BlogPostData) => (
                        <BlogPostCard key={blogPost.id} blogPost={blogPost}/>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};
