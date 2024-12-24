import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar.tsx";
import { Footer } from "@/components/layout/Footer.tsx";
import AppRoutes from "./AppRoutes.tsx";
import { Background } from "@/components/layout/Background.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Background/>
            <Navbar/>
            <AppRoutes/>
            <Footer/>
        </Router>
    );
};

export default App;
