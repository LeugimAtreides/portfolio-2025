import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { useFetchBlogArticleQuery } from "@/redux/slices/api.ts";
import { BlogComments } from "@/components/custom_components/BlogComments";
import { ErrorMessage } from "@/components/custom_components/ErrorMessage.tsx";
import { Prose } from "@/components/ui/prose.tsx";
import { Article } from "@/components/custom_components/StyledArticle.tsx";

export const BlogArticle: React.FC = () => {
    const { blogId = "" } = useParams();
    const { data, isLoading, isError, refetch } = useFetchBlogArticleQuery(blogId);

    if (isLoading) {
        return (
            <Box
                maxWidth="800px"
                height="80vh" // Ensure consistent height
                margin="5vh auto"
                padding="6"
                bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
                borderRadius="md"
                boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
                border="1px solid rgba(0, 153, 255, 0.5)"
            >
                <Skeleton height="30px" width="50%" mb="4"/>
                <SkeletonText noOfLines={8} gap="4"/>
            </Box>
        );
    }

    if (isError || !data) {
        return <ErrorMessage message="Failed to load blog post. Please try again later." onRetry={refetch}/>;
    }

    return (
        <Box
            maxWidth="800px"
            maxHeight="50vh" // Restrict height to fit within the tablet
            margin="5vh auto"
            padding="6"
            bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
            borderRadius="md"
            boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
            border="1px solid rgba(0, 153, 255, 0.5)"
            overflowY="auto" // Enable scrolling for overflowing content
            lineHeight="1.8"
            justifyItems="center"
        >
            <Heading as="h1" fontSize="2xl" mb="6" color="cyan.200" textShadow="0px 0px 10px cyan">
                {data.title}
            </Heading>

            {/* Blog Content */}
            {/*<Prose size="md" dangerouslySetInnerHTML={{ __html: data.content }}/>*/}
            <Prose size="lg">
                <Article variant="outline" dangerouslySetInnerHTML={{ __html: data.content }}/>
            </Prose>
            {/* Comments Section */}
            <Box mt="6">
                <BlogComments blogId={blogId!}/>
            </Box>
        </Box>
    );
};
