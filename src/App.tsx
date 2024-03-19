import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodo] = useState<Todo[]>(initialTodos);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: id || getNewTodoId(todos),
      ...data,
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);
    setCount(current => current + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} key={count} />
      <TodoList todos={todos} />
    </div>
  );
};
