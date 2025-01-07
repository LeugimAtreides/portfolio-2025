import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AboutMeData, BlogPostData, ContactFormData, ProjectData } from "@/types.ts";

// Define the shared API slice
export const apiSlice = createApi({
    reducerPath: "api", // Single reducer for all API interactions
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL, // Dynamically load the base URL
    }),
    endpoints: (builder) => ({
        fetchAboutMe: builder.query<AboutMeData[], void>({
            query: () => "about-me/", // Fetch About Me data
        }),
        fetchProjects: builder.query<ProjectData[], void>({
            query: () => "projects/", // Fetch Portfolio data
        }),
        fetchBlogPosts: builder.query<BlogPostData[], void>({
            query: () => "blog-posts/", // Fetch Blog Posts data
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
    useFetchBlogPostsQuery,
    useSubmitContactFormMutation,
} = apiSlice;
