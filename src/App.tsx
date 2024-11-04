import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import TodosForm from './components/TodosForm/TodosForm';

import todosFromServer from './api/todos';

import { ITodo } from './types/todo';
import todosWithUser from './utils/todo/todosWithUser';

export const App = () => {
  const [todos, setTodos] = useState<ITodo[]>([...todosFromServer]);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      addTodo
      <TodosForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todosWithUser(todos)} />
    </div>
  );
};
