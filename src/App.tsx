import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/types';
import { Form } from './components/Form/Form';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addNewTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form addNewTodo={addNewTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
