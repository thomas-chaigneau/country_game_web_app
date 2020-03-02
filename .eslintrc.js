module.exports = {
    "extends": [
        "airbnb",
        "plugin:flowtype/recommended",
    ],
    "plugins": [
		"flowtype",
		"react-hooks"
	],
    "env": {
		"browser": true,
	},
    "rules": {
        "react/jsx-filename-extension": 0,
		"react-hooks/rules-of-hooks": "error",
		"flowtype/define-flow-type": "warn",
		"flowtype/use-flow-type": "warn",
        "no-unused-vars": "warn",
        "object-curly-spacing": 0,
        "linebreak-style": 0,
        "indent": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "import/prefer-default-export": 0,
        "arrow-parens": 0,
        "no-confusing-arrow": 0,
        "object-curly-newline": 0,
        "react/jsx-props-no-spreading": 0,
        "arrow-body-style": 0,
        "no-use-before-define": 0,
        "max-len": 0,
        "no-underscore-dangle": 0,
        "react/jsx-wrap-multilines": 0,
	}
};