import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/userService';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => {
      const newTodo = {
        ...todo,
        id: getNewTodoId(todos),
      };
      const newTodos = [...prevTodos, newTodo];

      return newTodos;
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
