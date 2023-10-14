// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-gtag"],
  gtag: {
    id: "G-RXG9XVPSMH",
  },
  css: [
    "~/assets/css/tailwind.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
  ],
  build: {
    transpile: ["primevue", "vee-validate/dist/rules"],
  },
});
