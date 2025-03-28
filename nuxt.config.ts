// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  // app: {
  //   head: {
  //     charset: "utf-16",
  //     viewport: "width=device-width",
  //     title: "Schedule",
  //     link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  //     htmlAttrs: {
  //       lang: "ja",
  //       prefix: "og: https://ogp.me/ns#",
  //     },
  //   },
  // },
});
