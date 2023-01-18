export const getNewId = (arr: { id: number }[]) => (
  Math.max(...arr.map(todo => todo.id)) + 1
);
