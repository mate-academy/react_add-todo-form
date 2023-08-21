import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { useState } from 'react';
import { Todo } from './utils/types/types';
import { TodoForm } from './components/TodoForm';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './utils/getUserById';

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

      <TodoForm onAdd={onAdd} />
      <TodoList
        todos={todos}
      />
    </div>
  );
};
