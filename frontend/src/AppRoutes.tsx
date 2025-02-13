import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout.tsx";
import { SciFiLoader } from "./components/custom_components/Loader";

// Lazy load the CentralHub component
const CentralHub = lazy(() =>
    import("@/pages/CentralHub.tsx").then((module) => ({ default: module.CentralHub }))
  );

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<SciFiLoader />}>
      <Routes>
        {/* Home Page Layout */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<CentralHub />} /> {/* Default Orrery */}
          <Route path="about" element={<CentralHub />} />
          <Route path="references" element={<CentralHub />} />
          <Route path="blog" element={<CentralHub />}>
            {/* Nested route for single blog article */}
            <Route path=":blogId" element={<CentralHub />} />
          </Route>
          <Route path="projects" element={<CentralHub />} />
          <Route path="contact" element={<CentralHub />} />
          <Route path="*" element={<CentralHub />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;