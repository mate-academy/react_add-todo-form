import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodosWithUsers } from './type.ts/TodosWithUser';
import { TodoForm } from './components/TodoForm';
import { getUserById } from './utils/userId';
import { useState } from 'react';

const todos: TodosWithUsers[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function newTodoId(todosArr: TodosWithUsers[]) {
  const maxId = Math.max(...todosArr.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todosArr, setTodosArr] = useState(todos);

  const addTodo = ({ id, ...data }: TodosWithUsers) => {
    const newTodo = {
      id: newTodoId(todosArr),
      ...data,
    };

    setTodosArr(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAdd={addTodo} />
      <TodoList todos={todosArr} />
    </div>
  );
};
