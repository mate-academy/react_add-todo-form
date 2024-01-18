import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList';
import { findUser } from './utils/userFind';
import { Todo } from './types/todo';

const todosWiaUser = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>(todosWiaUser);
  const addTodo = (newTodo: Todo) => {
    setTodoItems(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form addTodo={addTodo} todos={todoItems} />
      <TodoList todos={todoItems} />
    </div>
  );
};
