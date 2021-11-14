module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended'
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		'comma-dangle': 'off',
		'indent': ['error', 'tab'],
		'no-tabs': 'off',
		'space-before-function-paren': 'off',
		'quote-props': 'off',
		'space-in-parens': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/singleline-html-element-content-newline': 'off',
	}
}
