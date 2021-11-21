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
		'array-bracket-spacing': 'off',
		'camelcase': 'off',
		'comma-dangle': 'off',
		'computed-property-spacing': 'off',
		'indent': ['error', 'tab'],
		'yoda': 'off',
		'no-tabs': 'off',
		'object-curly-newline': 'off',
		'object-curly-spacing': 'off',
		'one-var': 'off',
		'padded-blocks': 'off',
		'space-before-function-paren': 'off',
		'space-infix-ops': 'off',
		'quote-props': 'off',
		'quotes': 'off',
		'space-in-parens': 'off',
		'spaced-comment': 'off',
		'vue/html-indent': ['error', 'tab'],
		'vue/singleline-html-element-content-newline': 'off',
	}
}
