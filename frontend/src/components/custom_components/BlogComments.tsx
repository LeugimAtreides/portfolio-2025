import React from "react";
import { Box, Fieldset, Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSubmitBlogCommentFormMutation } from "@/redux/slices/api.ts";
import { toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { BlogCommentsList } from "@/components/custom_components/BlogCommentsList.tsx";

interface BlogCommentsProps {
    blogId: string;
}

interface NewCommentForm {
    name: string;
    comment: string;
}

export const BlogComments: React.FC<BlogCommentsProps> = ({ blogId }) => {
    const [submitComment] = useSubmitBlogCommentFormMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<NewCommentForm>();

    const onSubmit = async (data: NewCommentForm) => {
        try {
            await submitComment({ blog: Number(blogId), ...data }).unwrap();
            toaster.create({
                title: "Comment submitted!",
                description: "Your comment has been posted successfully.",
                type: "success",
                duration: 5000,
            });
            reset(); // Reset form fields on success
        } catch (error) {
            console.error("Error submitting comment:", error);
            toaster.create({
                title: "Submission failed.",
                description: "Something went wrong. Please try again later.",
                type: "error",
                duration: 5000,
            });
        }
    };

    return (
        <Box mt="8">
            <Fieldset.Root size="lg">
                <Stack>
                    <Fieldset.Legend color="cyan.200" fontSize="lg" mb="4" textShadow="0px 0px 10px cyan">
                        Share your thoughts!
                    </Fieldset.Legend>
                    <Fieldset.HelperText color="gray.300">
                        Please remain respectful and kind when commenting!
                    </Fieldset.HelperText>
                </Stack>

                {/* Comment Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset.Content>
                        <VStack gap="4" align="stretch" mb="8">
                            <Field label="Name" invalid={!!errors.name} required={true}>
                                <Input
                                    placeholder="Your Full Name"
                                    {...register("name", { required: "Name is required." })}
                                    bg="rgba(0, 0, 0, 0.5)"
                                    border="1px solid rgba(0, 153, 255, 0.5)"
                                    _placeholder={{ color: "gray.400" }}
                                />
                            </Field>
                            <Field label="Comment" invalid={!!errors.comment} required={true}>
                                <Textarea
                                    placeholder="Write a comment..."
                                    {...register("comment", {
                                        required: "Comment cannot be empty.",
                                        minLength: {
                                            value: 10,
                                            message: "Comment must be at least 10 characters long.",
                                        },
                                    })}
                                    bg="rgba(0, 0, 0, 0.5)"
                                    border="1px solid rgba(0, 153, 255, 0.5)"
                                    _placeholder={{ color: "gray.400" }}
                                />
                            </Field>
                            <Button
                                type="submit"
                                loading={isSubmitting}
                                colorScheme="blue"
                                bg="cyan.600"
                                _hover={{ bg: "cyan.700" }}
                            >
                                Submit Comment
                            </Button>
                        </VStack>
                    </Fieldset.Content>

                </form>
            </Fieldset.Root>

            {/* Comments List */}
            <BlogCommentsList blogId={blogId}/>
        </Box>
    );
};
