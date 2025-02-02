import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "@/components/layout/HomeLayout.tsx";
import { CentralHub } from "@/pages/CentralHub.tsx";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Home Page Layout */}
            <Route path="/" element={<HomeLayout/>}>
                <Route index element={<CentralHub/>}/> {/* Default Orrery */}
                <Route path="about" element={<CentralHub/>}/>
                <Route path="references" element={<CentralHub/>}/>
                <Route path="blog" element={<CentralHub/>}>
                    {/* Nested route for single blog article */}
                    <Route path=":blogId" element={<CentralHub/>}/>
                </Route>
                <Route path="projects" element={<CentralHub/>}/>
                <Route path="contact" element={<CentralHub/>}/>
                <Route path="*" element={<CentralHub/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
