import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import { useState } from 'react';
import { Todo } from './types.ts/Todo';
import todosFromServer from './api/todos';
import { TodoFromServer } from './types.ts/TodoFromServer';
import { getUserById } from './utils/getUserByID';

const todos = todosFromServer.map((todo: TodoFromServer) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoArr, setTodoArr] = useState<Todo[]>(todos);

  function handleAdd(todo: Omit<Todo, 'id'>) {
    const maxTodoId: number = Math.max(...todoArr.map(todoItem => todoItem.id));

    setTodoArr(prevTodoList => [
      ...prevTodoList,
      { id: maxTodoId + 1, ...todo },
    ]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onAdd={handleAdd} />
      <TodoList todos={todoArr} />
    </div>
  );
};
