const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath:
      process.env.NODE_ENV === "production" ? "/currency-converter-vue3/" : "/",
  transpileDependencies: true,
});
