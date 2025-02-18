import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { PostForm } from './components/PostForm';

import { TodoWithUser } from './types/TodoWithUser';
import { getUserById } from './services/user';
import { useState } from 'react';

export const InitialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: TodoWithUser[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(InitialTodos);

  const addTodo = ({ id, ...data }: TodoWithUser) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onSubmit={addTodo} />

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
