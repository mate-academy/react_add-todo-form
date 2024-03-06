import React, { useState } from 'react';

import todosFromServer from './api/todos';
import { SelectForm } from './components/SelectForm';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import './App.scss';

import '@fortawesome/fontawesome-free/scss/fontawesome.scss';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoIt(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoIt(todos),
      ...data,
    };

    return setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <SelectForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
