function addEnv(args, key, value) {
  let env = args[0]['process.env'];
  env[key] = JSON.stringify(value);
  return [{'process.env': env}];
}

const pkg = require('./package.json');

module.exports = {
  outputDir: './dist',
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => addEnv(args, '__VERSION__', pkg.version));
    config.plugin('define').tap((args) => addEnv(args, '__PKGNAME__', pkg.name));

    if (process.env.NODE_ENV === 'production') {
      config.externals({
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
        'element-ui': {
          root: 'ELEMENT',
          commonjs: 'element-ui',
          commonjs2: 'element-ui',
          amd: 'element-ui',
        },
      });
    }
  },
};
