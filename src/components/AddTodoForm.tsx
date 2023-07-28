import { useContext } from 'react';
import { TodoForm } from './TodoForm';
import { TodoMethodsContext } from './TodoConetxt';

export const AddTodoForm = () => {
  const { addTodo } = useContext(TodoMethodsContext);

  return (
    <TodoForm onSubmit={addTodo} />
  );
};
