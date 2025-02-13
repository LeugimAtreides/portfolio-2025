import React, { lazy, Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { Orrery } from "@/components/custom_components/Orrery";
import { useLocation, useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Tablet } from "@/components/custom_components/Tablet";
import { SciFiLoader } from "@/components/custom_components/Loader";

// Lazy load page components by mapping their named exports to default.
const About = lazy(() =>
  import("@/pages/About.tsx").then((module) => ({ default: module.About }))
);
const Contact = lazy(() =>
  import("@/pages/Contact.tsx").then((module) => ({ default: module.Contact }))
);
const Projects = lazy(() =>
  import("@/pages/Projects.tsx").then((module) => ({ default: module.Projects }))
);
const Blog = lazy(() =>
  import("@/pages/Blog.tsx").then((module) => ({ default: module.Blog }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage.tsx").then((module) => ({ default: module.NotFoundPage }))
);
const BlogArticle = lazy(() =>
  import("@/pages/BlogArticle.tsx").then((module) => ({ default: module.BlogArticle }))
);
const References = lazy(() =>
  import("@/pages/References.tsx").then((module) => ({ default: module.References }))
);

// Helper function to determine which tablet content to show
const getTabletData = (route: string, blogId?: string) => {
  const baseRoute = route?.split("/")[1];
  switch (baseRoute) {
    case "about":
      return { title: "About Me", content: <About /> };
    case "contact":
      return { title: "Contact Me", content: <Contact /> };
    case "projects":
      return { title: "My Projects", content: <Projects /> };
    case "references":
      return { title: "References", content: <References /> };
    case "blog":
      if (blogId) {
        return { title: "Blog Article", content: <BlogArticle /> };
      }
      return { title: "Blog", content: <Blog /> };
    default:
      return { title: "", content: <NotFoundPage /> };
  }
};

export const CentralHub: React.FC = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const blogId = params?.blogId;
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
        style={{ height: "100%", width: "100%" }}
        camera={{ position: [0, 20, 20], fov: 35 }}
      >
        <Orrery />
      </Canvas>

      {/* Wrap Tablet content in Suspense so lazy components are loaded on demand */}
      <Suspense fallback={<SciFiLoader />}>
        <Tablet title={tabletData.title}>
          {tabletData.content}
        </Tablet>
      </Suspense>
    </Box>
  );
};