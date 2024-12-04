import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodosWithUsers } from './type.ts/TodosWithUser';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './utils/userId';
import { useState } from 'react';
import usersFromServer from './api/users';

const todos: TodosWithUsers[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

export const App = () => {
  const [todosArr, setTodosArr] = useState(todos);

  const addTodo = (newTodo: TodosWithUsers) => {
    const maxId =
      todosArr.length > 0 ? Math.max(...todosArr.map(todo => todo.id)) : 0;
    const currentTodo = {
      ...newTodo,
      id: maxId + 1,
    };

    setTodosArr(currentTodos => [...currentTodos, currentTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} users={usersFromServer}/>
      <TodoList todos={todosArr} />
    </div>
  );
};
