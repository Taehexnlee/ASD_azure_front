module.exports = {
    // Use babel-jest to transpile JavaScript files
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
    // Transforming node_modules containing ES6 code (like axios)
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testEnvironment: 'jsdom',
  };
  