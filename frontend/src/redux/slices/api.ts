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
                body: formData,
            }),
        }),
    }),
});

// Export hooks for each endpoint
export const {
    useFetchAboutMeQuery,
    useFetchProjectsQuery,
    useFetchBlogPostsQuery,
} = apiSlice;
