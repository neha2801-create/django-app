import React, { useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import CanvasPage from "./pages/CanvasPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Playground from "./pages/Playground";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CanvasActivePage from "./pages/CanvasActivePage";
import CanvasPageActiveTwo from "./pages/CanvasPageActiveTwo";
import Dashboard from "./pages/Dashboard";
import UserPreferences from "./pages/UserPreferences";

import { createTheme, ThemeProvider } from "@mui/material";
import { getTheme } from "./Theme";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <div>404 not found</div>,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/canvas/:id", // Dynamic route to handle individual canvases
        element: (
            <DndProvider backend={HTML5Backend}>
                <CanvasActivePage />
            </DndProvider>
        ),
    },

    // {
    //     path: "/canvas",
    //     element: (
    //         <DndProvider backend={HTML5Backend}>
    //             <CanvasActivePage />
    //         </DndProvider>
    //     ),
    // },
    {
        path: "/payground",
        element: <Playground />,
    },
    {
        path: "/userPref",
        element: <UserPreferences />,
    },


]);

function App() {

    const [themeName, setThemeName] = useState("light");

    const toggleTheme = () => {
        setThemeName((prevThemeName) =>
            prevThemeName === "light" ? "dark" : "light"
        );
    };

    const theme = getTheme(themeName);

    return <RouterProvider router={router} />;
    // return (
    //     <DndProvider backend={HTML5Backend}>
    //         <CanvasActivePage />
    //     </DndProvider>
    // );
    // return <CanvasPage />;
    // return <Dashboard />;
}

export default App;
