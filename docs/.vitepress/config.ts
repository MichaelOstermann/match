import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/match/",
    description: "Zero-runtime exhaustive pattern matching.",
    title: "match",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            {
                base: "/API/",
                text: "API",
                items: [
                    { link: "returnType", text: "returnType" },
                    { link: "case", text: "case" },
                    { link: "onCase", text: "onCase" },
                    { link: "shape", text: "shape" },
                    { link: "onShape", text: "onShape" },
                    { link: "cond", text: "cond" },
                    { link: "onCond", text: "onCond" },
                    { link: "or", text: "or" },
                    { link: "orElse", text: "orElse" },
                    { link: "orThrow", text: "orThrow" },
                ],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/match" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
