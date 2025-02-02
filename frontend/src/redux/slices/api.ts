import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    AboutMeData,
    BlogPostCommentData,
    BlogPostData,
    ContactFormData,
    ProjectData,
    ReferenceData,
} from "@/types.ts";

// Define the shared API slice
export const apiSlice = createApi({
    reducerPath: "api", // Single reducer for all API interactions
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL, // Dynamically load the base URL
    }),
    endpoints: (builder) => ({

        // Queries
        fetchAboutMe: builder.query<AboutMeData[], void>({
            query: () => "about-me/", // Fetch About Me data
        }),
        fetchProjects: builder.query<ProjectData[], void>({
            query: () => "projects/", // Fetch Portfolio data
        }),
        fetchReferences: builder.query<ReferenceData[], void>({
            query: () => "references/",
        }),
        fetchBlogPosts: builder.query<BlogPostData[], void>({
            query: () => "blog-posts/", // Fetch Blog Posts data
        }),
        fetchBlogArticle: builder.query<BlogPostData, string>({
            query: (blogId) => `blog-posts/?id=${blogId}`,
            transformResponse: (response: BlogPostData) => {
                if (Array.isArray(response)) {
                    return response[0];
                }
                return response;
            },
        }),
        fetchBlogPostComments: builder.query<BlogPostCommentData[], string>({
            query: (blogId) => `blog-comments/?id=${blogId}`, // Fetch blog comments
        }),

        // Mutations
        submitBlogCommentForm: builder.mutation<void, BlogPostCommentData>({
            query: (formData) => ({
                url: `blog-comments/`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    // Wait for query to succeed
                    await queryFulfilled;
                    // Optionally, add success handling here
                    console.log("Contact form submitted successfully!");
                } catch (error) {
                    // Handle errors gracefully
                    console.error("Error submitting contact form:", error);
                }
            },
        }),
        submitContactForm: builder.mutation<void, ContactFormData>({
            query: (formData) => ({
                url: "contact/", // Endpoint for contact form
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Explicitly define content type
                },
                body: JSON.stringify(formData), // Convert data to JSON for backend compatibility
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    // Wait for query to succeed
                    await queryFulfilled;
                    // Optionally, add success handling here
                    console.log("Contact form submitted successfully!");
                } catch (error) {
                    // Handle errors gracefully
                    console.error("Error submitting contact form:", error);
                }
            },

        }),

    }),
});

// Export hooks for each endpoint
export const {
    useFetchAboutMeQuery,
    useFetchProjectsQuery,
    useFetchReferencesQuery,
    useFetchBlogPostsQuery,
    useFetchBlogArticleQuery,
    useFetchBlogPostCommentsQuery,
    useSubmitBlogCommentFormMutation,
    useSubmitContactFormMutation,
} = apiSlice;
