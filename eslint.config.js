import antfu from '@antfu/eslint-config'

export default antfu({
  // Enable features
  typescript: true,
  vue: false,
  react: false,

  // Ignore files
  ignores: [
    'dist',
    'node_modules',
    '.git',
    'prisma',
  ],

  // Custom rules
  rules: {
    'no-console': 'off',
    'style/semi': ['error', 'never'],
  },
})
