import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

function getNewTodoId(todos: Todo[]) {
  // return +Math.random().toFixed(12).slice(2);
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1 || 0;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
