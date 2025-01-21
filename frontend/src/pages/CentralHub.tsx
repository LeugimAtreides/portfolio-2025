import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { Orrery } from "@/components/custom_components/Orrery";
import { useLocation, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Tablet } from "@/components/custom_components/Tablet";
import { About } from "@/pages/About.tsx";
import { Contact } from "@/pages/Contact.tsx";
import { Projects } from "@/pages/Projects.tsx";
import { Blog } from "@/pages/Blog.tsx";
import { NotFoundPage } from "@/pages/NotFoundPage.tsx";
import { BlogArticle } from "@/pages/BlogArticle.tsx";

const getTabletData = (route: string, blogId?: string) => {
    const baseRoute = route?.split("/")[1];
    switch (baseRoute) {
        case "about":
            return { title: "About Me", content: <About/> };
        case "contact":
            return { title: "Contact Me", content: <Contact/> };
        case "projects":
            return { title: "My Projects", content: <Projects/> };
        case "blog":
            if (blogId) {
                return { title: "Blog Article", content: <BlogArticle/> };
            }
            return { title: "Blog", content: <Blog/> };
        default:
            return { title: "", content: <NotFoundPage/> };
    }
};

export const CentralHub: React.FC = () => {
    const { pathname } = useLocation();
    const params = useParams();
    const blogId = params?.blogId;

    useEffect(() => {
        console.log("params", params);
    }, [params]);

    const tabletData = getTabletData(pathname, blogId);

    return (
        <Box
            minHeight="100vh"
            height="100vh"
            bg="transparent"
            overflow="hidden"
            position="relative"
        >
            <Canvas
                style={{ height: "100%", width: "100%" }} // Ensure the canvas fills its container
                camera={{ position: [0, 20, 20], fov: 35 }}
            >
                <Orrery/>
            </Canvas>

            {/* Render Tablet */}
            <Tablet title={tabletData.title}>
                {tabletData.content}
            </Tablet>
        </Box>
    );
};
