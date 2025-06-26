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
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
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
