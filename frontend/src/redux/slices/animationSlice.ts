import { createSlice } from "@reduxjs/toolkit";
import { PlanetData } from "@/types.ts";

const initialState = {
    activePlanet: null as PlanetData | null, // Glow color as a string
    status: "idle",
};

const animationSlice = createSlice({
    name: "animation",
    initialState,
    reducers: {
        setActivePlanetStart(state) {
            state.status = "loading"; // Indicate transition is starting
        },
        setActivePlanetSuccess(state, action) {
            state.activePlanet = {
                name: action.payload.name,
                route: action.payload.route,
                glowColor: action.payload.glowColor, // Store as string
                position: action.payload.position,
                texture: action.payload.texture,
                orbitRadius: action.payload.orbitRadius,
                speed: action.payload.speed,
            };
            state.status = "success";
        },
        resetActivePlanet(state) {
            state.activePlanet = null;
            state.status = "idle";
        },
    },
});

export const { setActivePlanetStart, setActivePlanetSuccess, resetActivePlanet } = animationSlice.actions;
export default animationSlice.reducer;
