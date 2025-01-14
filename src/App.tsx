import './App.scss';
import { Todo, TodoList, User } from './components/TodoList';
import todosFromServer from './api/todos';

import usersFromServer from './api/users';
import { Form } from './components/Form';
import { useState } from 'react';

export const App = () => {
  const [usersList] = useState<User[]>(usersFromServer);
  const [todoList, setuTodoList] = useState<Todo[]>(todosFromServer);

  const addNewTodo = (newTodo: Todo) => {
    setuTodoList((currentTodo: Todo[]) => [...currentTodo, newTodo]);
  };

  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>

        <Form users={usersList} todos={todoList} addFunc={addNewTodo} />

        <TodoList todos={todoList} users={usersList} />
      </div>
    </>
  );
};
