import React from "react";
import { Box, Fieldset, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useSubmitContactFormMutation } from "@/redux/slices/api.ts";
import { toaster } from "@/components/ui/toaster";

interface ContactFormData {
    name: string;
    email: string;
    company: string;
    message?: string; // Optional field
}

// Basic sanitization function to prevent HTML injection
const sanitizeInput = (value: string): string => {
    return value.replace(/<[^>]*>?/gm, "").trim();
};

export const Contact: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>();
    const [submitContactForm] = useSubmitContactFormMutation();

    const onSubmit = async (data: ContactFormData) => {
        console.log(data);
        try {
            const sanitizedData = {
                ...data,
                message: data.message ? sanitizeInput(data.message) : "no message",
            };
            await submitContactForm(sanitizedData).unwrap();
            toaster.create({
                title: "Form submitted successfully!",
                description: "Thank you for getting in touch. We'll get back to you soon.",
                type: "success",
                duration: 5000,
            });
            reset();
        } catch (e) {
            console.error(e);
            toaster.create({
                title: "Submission failed.",
                description: "Something went wrong. Please try again later.",
                type: "error",
                duration: 5000,
            });
        }
    };

    return (
        <Box
            maxWidth="800px"
            margin="3vh auto"
            padding="6"
            bg="linear-gradient(135deg, rgba(0, 76, 153, 0.8), rgba(0, 153, 255, 0.3))"
            borderRadius="md"
            boxShadow="0px 0px 20px rgba(0, 153, 255, 0.6)"
            border="1px solid rgba(0, 153, 255, 0.5)"
            overflowY="auto"
            lineHeight="1.8"
            position="relative"
        >
            <Fieldset.Root size="lg">
                <Stack>
                    <Fieldset.Legend color="cyan.200" fontSize="lg" mb="2" textShadow="0px 0px 10px cyan">
                        Let's work together!
                    </Fieldset.Legend>
                    <Fieldset.HelperText color="gray.300">
                        Please provide your contact details below and I'll make sure to get back to you as soon as
                        possible!
                    </Fieldset.HelperText>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Fieldset.Content>
                        {/* Name Field */}
                        <Field required={true} color="cyan.200" label="Name" invalid={!!errors.name}
                               errorText={errors.name?.message}>
                            <Input
                                placeholder="Enter your name"
                                {...register("name", { required: "Name is required." })}
                                bg="rgba(0, 0, 0, 0.5)"
                                border="1px solid rgba(0, 153, 255, 0.5)"
                                _placeholder={{ color: "gray.400" }}
                            />
                        </Field>

                        {/* Email Field */}
                        <Field required={true} color="cyan.200" label="Email" invalid={!!errors.email}
                               errorText={errors.email?.message}>
                            <Input
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required.",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address.",
                                    },
                                })}
                                bg="rgba(0, 0, 0, 0.5)"
                                border="1px solid rgba(0, 153, 255, 0.5)"
                                _placeholder={{ color: "gray.400" }}
                            />
                        </Field>

                        {/* Company Field */}
                        <Field required={true} color="cyan.200" label="Company" invalid={!!errors.company}
                               errorText={errors.company?.message}>
                            <Input
                                placeholder="Enter your company"
                                {...register("company", { required: "Company is required." })}
                                bg="rgba(0, 0, 0, 0.5)"
                                border="1px solid rgba(0, 153, 255, 0.5)"
                                _placeholder={{ color: "gray.400" }}
                            />
                        </Field>

                        {/* Message Field */}
                        <Field required={false} color="cyan.200" label="Message" invalid={!!errors.message}
                               errorText={errors.message?.message}>
                            <Textarea
                                placeholder="Leave a message (optional)"
                                {...register("message", {
                                    maxLength: {
                                        value: 500,
                                        message: "Message must be under 500 characters.",
                                    },
                                })}
                                bg="rgba(0, 0, 0, 0.5)"
                                border="1px solid rgba(0, 153, 255, 0.5)"
                                _placeholder={{ color: "gray.400" }}
                                rows={4}
                            />
                        </Field>
                    </Fieldset.Content>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        size="lg"
                        marginTop={4}
                        loading={isSubmitting}
                        colorScheme="blue"
                        bg="cyan.600"
                        color="white"
                        _hover={{
                            bg: "cyan.700",
                            boxShadow: "0px 0px 10px cyan",
                        }}
                        boxShadow="0px 0px 5px rgba(0, 153, 255, 0.5)"
                        alignSelf="flex-start"
                    >
                        Submit
                    </Button>
                </form>
            </Fieldset.Root>
        </Box>
    );
};
