const path = require('path');
const tsNode = require('ts-node');

// Đăng ký TypeScript với ts-node
tsNode.register({
  compilerOptions: {
    module: 'commonjs',
  },
});

module.exports = {
  "config": path.resolve(__dirname, 'src/config/config.ts'),
  "models-path": path.resolve(__dirname, 'src/models'),
  "migrations-path": path.resolve(__dirname, 'src/migrations'),
  "seeders-path": path.resolve(__dirname, 'src/seeders')
};
