import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/todo';
import { Form } from './components/Form';
import { getUserById } from './helpers/getUserById';

const todosWithUser = todosFromServer
  .map(todo => ({ ...todo, todoUser: getUserById(todo.userId) }));

export const App = () => {
  const [todosArr, setTodosArr] = useState<Todo[]>(todosWithUser);
  const addTodo = (todo: Todo) => setTodosArr([...todosArr, todo]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form users={usersFromServer} addTodo={addTodo} />
      <TodoList todos={todosArr} />
    </div>
  );
};
