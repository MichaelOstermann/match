import { defineConfig } from "vitepress"

export default defineConfig({
    title: "$NAME",
    description: "$DESC",
    base: "/$NAME/",
    themeConfig: {
        search: {
            provider: "local",
        },
        sidebar: [
            {
                text: "",
                base: "",
                items: [],
            },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/$NAME" },
        ],
    },
})
