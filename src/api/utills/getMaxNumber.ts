import { Todos } from '../../types/Todos';

export const getMaxNumber = (todo: Todos[]) => {
  const onAdd = Math.max(...todo.map(t => t.id));

  return onAdd + 1;
};
