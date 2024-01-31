import './App.scss';
import { useState } from 'react';
import { PostForm } from './components/PostForm/PostForm';
import { TodoList } from './components/TodoList/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { getUserById } from './services/user';
import { getNewTodoId } from './services/todo';

const initialTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodo);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div>
      <PostForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
