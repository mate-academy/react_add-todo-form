import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo, Todos } from './types/Todo';
import { getUserById } from './utils/getUserById';
import './App.scss';

const initialTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  };
});

export const App:React.FC = () => {
  const [todos, setTodos] = useState<Todos>(initialTodos);

  const addTodo = (todo: Todo): void => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos, {
          ...todo,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        users={usersFromServer}
        onSubmit={addTodo}
        todosArr={todos}
      />
      <TodoList todos={todos} />
    </div>
  );
};
