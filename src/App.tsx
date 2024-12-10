import { useState } from 'react';

import './App.scss';
import todosFromServer from './api/todos';

import { getUserById } from './services/user';
import { TodosWithUser } from './types/TodosWithUser';

import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoInfo } from './components/TodoInfo';

export const todos: TodosWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todosArray: TodosWithUser[]) {
  const maxId = Math.max(...todosArray.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todo, setTodo] = useState<TodosWithUser[]>(todos);

  const addTodo = ({ id, ...data }: TodosWithUser) => {
    const newTodo = {
      id: getNewTodoId(todo),
      ...data,
    };

    setTodo(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} />
      <TodoInfo todos={todo} />
    </div>
  );
};
