module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-preset-env": {},
    "postcss-bem-fix": {
      style: "bem",
      separators: {
        descendent: "__",
        modifier: "--"
      }
    },
    "postcss-autoreset": {
      reset: {
        margin: 0,
        padding: 0
      },
      rulesMatcher: "bem"
    },
    "postcss-apply": {},
    "postcss-nesting": {}
  }
};
