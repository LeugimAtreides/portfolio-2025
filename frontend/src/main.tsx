import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { system } from "../styles/theme.ts";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

// StrictMode is intentionally omitted: React 19 StrictMode double-invokes
// effects which destroys the WebGL context on first mount (R3F v9 breaking change).
createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <ChakraProvider value={system}>
            <App/>
            <Toaster/>
        </ChakraProvider>
    </Provider>,
);
