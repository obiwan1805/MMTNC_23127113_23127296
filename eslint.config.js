const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        files: ["public/*.js"],
        languageOptions: {
            globals: {
                ...globals.browser
            }
        },
        rules: {
            "no-undef": "error",
            "no-unused-vars": "warn",
            "semi": ["error", "always"]
        }
    }
];