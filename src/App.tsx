import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { Form } from './components/Form';
import { getTodos } from './services/getTodos';
import { getPostId } from './services/getPostId';
import { getUserById } from './services/getUserById';
import { User } from './types/User';
import { getUsers } from './services/getUsers';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [users] = useState<User[]>(getUsers());

  const addNewTodo = (todo: Todo) => {
    const correctTodo = {
      ...todo,
      id: getPostId(todos),
      user: getUserById(todo.userId),
    };

    setTodos((currTodos) => [
      ...currTodos,
      correctTodo,
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form
        onSubmit={addNewTodo}
        users={users}
      />

      <TodoList
        todos={todos}
      />
    </div>
  );
};
