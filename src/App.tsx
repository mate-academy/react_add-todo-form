import './App.scss';

import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';

import { getUserById } from './utils/getUserById';
import { useState } from 'react';

const neededTodos = todosFromServer.map((todo: Todo) => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(neededTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoForm onAdd={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
