import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';

import { Todo } from './Types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const addTodo = (todo: Todo) => {
    setTodos(currentTodo => [...currentTodo, todo]);
  };

  const todosWithUser: Todo[] = todos.map(todo => {
    const user = usersFromServer.find(person => person.id === todo.userId);

    return { ...todo, user };
  });

  const arrayTodosId = todosWithUser.map(todo => todo.id);
  const maxTodoId = Math.max(...arrayTodosId);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onAdd={addTodo} users={usersFromServer} max={maxTodoId} />

      <TodoList todos={todosWithUser} />
    </div>
  );
};
