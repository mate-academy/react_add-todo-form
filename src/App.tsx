import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getVisibleToDos } from './servises/VisibleTodos';
import { Form } from './components/Form';
import { getNewTodoId } from './servises/NewTodoId';
import { FieldsForm } from './types/FieldsForm';
import { User } from './types/User';
import { Todo } from './types/Todo';

const visibleToDos = getVisibleToDos(usersFromServer, todosFromServer);

export const App: React.FC = () => {
  const [todos, setTodos] = useState(visibleToDos);

  const addNewTodo = ({ title, selectUser }: FieldsForm) => {
    const newTodo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: selectUser,
      user: usersFromServer
        .find((user: User) => user.id === selectUser) || null,
    };

    setTodos((currentTodos: Todo[]) => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        onAdd={addNewTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
