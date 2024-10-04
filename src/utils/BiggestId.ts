import { TodoWithUser } from '../Types/TodosWithUsers';

export const biggestId = (todos: TodoWithUser[]) => {
  const sortedTodos = [...todos].sort((todo1, todo2) => {
    return todo1.id - todo2.id;
  });

  return sortedTodos[sortedTodos.length - 1].id + 1;
};
