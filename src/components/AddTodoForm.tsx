import { useContext } from 'react';
import { TodoForm } from './TodoForm';
import { TodoUpdateContext } from './TodoConetxt';

export const AddTodoForm = () => {
  const { addTodo } = useContext(TodoUpdateContext);

  return (
    <TodoForm onSubmit={addTodo} />
  );
};
