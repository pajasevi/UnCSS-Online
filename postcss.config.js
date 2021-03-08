module.exports = {
  plugins: process.env.NODE_ENV === "production" ? [
    "postcss-nested",
    "autoprefixer",
    [
      "cssnano", {
        preset: ["default", {
          discardComments: {
            removeAll: true
          }
        }]
      }
    ]
  ] : []
};
