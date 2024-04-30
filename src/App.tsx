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

function getNewTodoId(newTodos: Todo[]) {
  const maxId = Math.max(...newTodos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const addNewPost = (todo: Todo) => {
    const createdTodo = {
      ...todo,
      id: getNewTodoId(newTodos),
    };

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
