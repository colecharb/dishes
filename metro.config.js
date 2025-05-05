const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.resolveRequest = (
  context,
  realModuleName,
  platform,
  moduleName,
) => {
  if (realModuleName === 'jotai') {
    return context.resolveRequest(context, 'jotai/index.js', platform);
  }
  return context.resolveRequest(context, realModuleName, platform);
};

module.exports = config;
