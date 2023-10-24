import './App.scss';

import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { UsersToDo } from './types/ToDo';
import { getUserById } from './services/user';
import { TodoForm } from './components/TodoForm/TodoForm';

export const initialTodos: UsersToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: UsersToDo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));
  return maxId + 1;
}

export const App = () => {
  const [todos, setToDos] = useState<UsersToDo[]>(initialTodos);

  const addTodo = (newTodo: UsersToDo) => {
    const newTodoClone = {
      ...newTodo,
      id: getNewTodoId(todos),
    };
    setToDos(currentTodos => [...currentTodos, newTodoClone]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
