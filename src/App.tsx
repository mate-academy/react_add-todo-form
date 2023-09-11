import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoWithUser } from './components/Types/TodoWithUser';

export const App = () => {
  const [todosArray, setTodosArray] = useState<TodoWithUser[]>(
    todosFromServer.map((todo) => {
      const userToAdd = usersFromServer.find((user) => user.id === todo.userId);

      const todoWithUser: TodoWithUser = {
        ...todo,
        user: userToAdd || null,
      };

      return todoWithUser;
    }),
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        users={usersFromServer}
        todosArray={todosArray}
        onAddTodo={(todo) => {
          setTodosArray((prevTodoArray) => [...prevTodoArray, todo]);
        }}
      />
      <TodoList todos={todosArray} />
    </div>
  );
};
