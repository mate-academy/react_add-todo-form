import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { PostForm } from './PostForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const onAddTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onSubmit={onAddTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
