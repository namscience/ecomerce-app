const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for @/ path alias
config.resolver = {
  ...config.resolver,
  alias: {
    "@": __dirname,
  },
};

module.exports = withNativeWind(config, { input: './global.css' });
