import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { Todo, getLatestTodoId } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  function addTodo(title: string, userId: number) {
    const newTodo: Todo = {
      completed: false,
      title,
      userId,
      id: getLatestTodoId(todos) + 1,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  }

  return (
    <div className="App">
      <AddTodoForm
        users={usersFromServer}
        // eslint-disable-next-line react/jsx-no-bind
        addTodo={addTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
