import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const getNewTodoId = () => {
    const maxId = Math.max(...todos.map(({ id }) => id));

    return maxId + 1;
  };

  const addTodo = (todo: Todo) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...todo,
        id: getNewTodoId(),
      }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} users={usersFromServer} />
      <TodoList todos={todos} />
    </div>
  );
};
