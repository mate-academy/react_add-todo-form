module.exports = {
  extends: '@mate-academy/eslint-config-react',
  rules: {
    "object-curly-newline": [2, {
      "ObjectExpression": {
        "consistent": true,
        "minProperties": 5,
      },
    }],
  },
};
