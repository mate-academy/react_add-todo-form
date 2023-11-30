import { useState } from 'react';

import './App.scss';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Types/Todo';
import { getUserById } from './services/getUserById';
import todosFromServer from './api/todos';

const todos:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todosList:Todo[]) {
  const maxId = Math.max(...todosList.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [newTodos, setNewTodos] = useState(todos);

  const addTodo = ({ id, ...data }:Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setNewTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form onSubmit={addTodo} />
      <TodoList todos={newTodos} />

    </div>
  );
};
