module.exports = {
  extends: '@mate-academy/eslint-config-react',

  rules: {
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 2,
      },
    }],
  },
};
