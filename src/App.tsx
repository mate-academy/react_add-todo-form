import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Form } from './components/Form';

import { getUserById } from './services/user';
import { Todo } from './types/Todo';

const todos = todosFromServer.map(el => {
  return {
    ...el,
    user: getUserById(el.userId),
  };
});

export const App = () => {
  const [todoList, setTodoList] = useState(todos);

  const addTodo = (newTodo: Todo) => {
    setTodoList(currentList => [...currentList, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form
        todoList={todoList}
        onSubmit={addTodo}
      />

      <TodoList todos={todoList} />
    </div>
  );
};
