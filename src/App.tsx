import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/Todo';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(({ id }) => id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const handleAddTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currTodos => [...currTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={handleAddTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
