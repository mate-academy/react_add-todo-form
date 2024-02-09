import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Todo } from './types/todo';
import { getUserById } from './services/user';

const todosWithUsers = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function createNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const addNewTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: createNewTodoId(todos),
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <NewTodo onAdd={addNewTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
