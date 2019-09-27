export const required = (name, value) => (value
  ? null
  : `Field ${name} is required`);
