import React from "react";
import { Box, Flex, Heading, Icon, Link } from "@chakra-ui/react";
// import { MdArticle } from "react-icons/md";
import { BlogPostData } from "@/types.ts";
import { Prose } from "@/components/ui/prose";
import AlienBookSVG from "@/assets/icons/alien-book.svg?react";

interface BlogPostCardProps {
    blogPost: BlogPostData;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ blogPost }) => {
    // Generate truncated content for the card
    const truncatedContent =
        blogPost.content.length > 200
            ? `${blogPost.content.slice(0, 200)}...`
            : blogPost.content;

    const html = String.raw;

    const htmlTruncatedContent = html`${truncatedContent}`;

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
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                gap="4"
                alignItems="flex-start"
            >
                {/* Blog Post Icon */}
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="md"
                    width="150px" // Fixed width
                    height="150px" // Fixed height
                    bg="rgba(0, 76, 153, 0.8)"
                    color="white"
                    boxShadow="0px 0px 10px rgba(0, 153, 255, 0.6)"
                    flexShrink={0}
                >
                    {/*<Icon as={MdArticle} boxSize="50px"/>*/}
                    {/*<Icon boxSize="50px">*/}
                    {/*    /!*<AlienBookSVG/>*!/*/}
                    {/*</Icon>*/}
                    <Icon fontSize="8xl" color="pink.700">
                        <AlienBookSVG/>
                    </Icon>
                </Flex>

                {/* Blog Post Content */}
                <Box flex="1">
                    <Heading as="h3" fontSize="xl" mb="2" color="blue.600">
                        {blogPost.title}
                    </Heading>

                    <Prose dangerouslySetInnerHTML={{ __html: htmlTruncatedContent }}/>

                    {/* View Full Blog Link */}
                    <Link
                        href={`/blog/${blogPost.id}`} // Adjust the route for individual blogs
                        fontSize="md"
                        color="blue.500"
                        fontWeight="bold"
                        display="block"
                        variant="plain"
                        mb="4"
                    >
                        Read Full Blog Article
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
};
