// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    'airbnb'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'import/no-unresolved' : 'off',
    'import/extensions' : 'off',
    'arrow-parens' : 'off',
    'guard-for-in' : 'off',
    'no-param-reassign' : 'off',
    'no-multi-spaces' : 'off',
    'array-bracket-spacing' : 'off',
    'comma-dangle' : 'off',
    'no-underscore-dangle' : 'off',
    'max-len' : 'off',
    'no-restricted-syntax' : 'off',
    'no-console' : 'off',
    'no-shadow' : 'off',
    'key-spacing': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
