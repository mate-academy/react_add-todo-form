import './App.scss';

import todosFromServer from './api/todos';
import { PostForm } from './components/PostForm/PostForm';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './components/services/interfaces';
import { getUserId } from './services/user';

const defaultTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserId(todo.userId),
  };
});

const getNewTodosId = (todos: Todo[]): number => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(defaultTodos);
  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodosId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <PostForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
