import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    title: "match",
    description: "Zero-runtime exhaustive pattern matching.",
    base: "/match/",
    themeConfig: {
        outline: "deep",
        search: {
            provider: "local",
        },
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/match" },
        ],
    },
    markdown: {
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
