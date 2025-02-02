// About Me Type
export type AboutMeData = {
    title: string;
    content: string;
    image: string;
};

// Project Type
export type ProjectData = {
    id: number;
    title: string;
    description: string;
    image: string;
    url: string;
};

// Reference Type
export type ReferenceData = {
    id: number;
    name: string;
    job_title: string;
    contact_info: string;
    created_at: string;
    updated_at: string;
}

export interface BlogPostData {
    id: number;
    title: string;
    content: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

export type BlogPostCommentData = {
    id?: number;
    blog: number;
    comment: string;
    name: string;
    created_at?: string;
}


// Contact Form Type
export type ContactFormData = {
    name: string;
    email: string;
    message: string;
};

// Define the type for the backend response (if any)
export interface ContactFormResponse {
    success: boolean;
    message: string;
}

// interface for each planet
export interface PlanetData {
    position: [number, number, number];
    texture: string;
    route: string;
    name: string;
    orbitRadius: number;
    speed: number;
    glowColor?: string;
}