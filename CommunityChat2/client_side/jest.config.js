module.exports = {
    testEnvironment: 'jsdom', // For React/Next.js testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1', // Handle Next.js alias for imports (e.g., @/components)
    },
  };