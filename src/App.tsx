import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { useState } from 'react';
import { Todo } from './types/types';
import { TodoForm } from './TodoForm';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const todosSer = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosSer);

  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodos => [
      ...currentTodos,
      {
        ...newTodo,
        id: Math.max(...(todos.map(toDo => toDo.id))) + 1,
      },
    ]);
  };

  return (
    <div className="section App box">
      <h1 className="title is-1">Add todo form</h1>

      <TodoForm onAdd={onAdd} /* todos={todos} */ />
      <TodoList
        todos={todos}
      />
    </div>
  );
};
