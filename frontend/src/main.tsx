import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { system } from "../styles/theme.ts";
import App from "./App.tsx";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider value={system}>
                <App/>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);
