import { useState } from 'react';
import './App.scss';

import { Todo } from './types/Todo';

import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { getUserByTodo } from './components/services/user';

const todos: Todo[] = todosFromServer.map(todo => {
  return { ...todo, user: getUserByTodo(todo.userId) };
});

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const addNewPost = (createdTodo: Todo) => {
    setNewTodos(currTodo => [...currTodo, createdTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onSubmit={addNewPost} />
      <TodoList todos={newTodos} />
    </div>
  );
};
