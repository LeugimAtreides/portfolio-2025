import { chakra } from "@chakra-ui/react";

export const Article = chakra("article", {
    base: {
        shadow: "md",
        rounded: "lg",
        bg: "white",
        p: 6,
        fontFamily: "body",
        color: "gray.700",
        lineHeight: "tall",
        width: "100%",
    },
    variants: {
        variant: {
            clean: {
                p: 0,
                shadow: "none",
                bg: "transparent",
            },
            outline: {
                border: "1px solid",
                borderColor: "gray.200",
                p: 8,
            },
            solid: {
                bg: "gray.50",
                color: "gray.800",
                p: 8,
            },
        },
    },
});