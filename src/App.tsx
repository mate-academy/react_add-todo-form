import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './interfaces/todo';
import { User } from './interfaces/user';
import { Form } from './components/Form/Form';

export const App = () => {
  const [todosArr, setTodosArr] = useState<Todo[]>(todosFromServer);

  const addTodo = (todo: Todo) => setTodosArr([...todosArr, todo]);

  const createTodosArr = (todos: Todo[], users: User[]) => {
    const getUserById = (userId: number) => {
      return users.find(user => user && user.id === userId);
    };

    return todos.map(todo => ({ ...todo, todoUser: getUserById(todo.userId) }));
  };

  const finalTodos = createTodosArr(todosArr, usersFromServer);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form users={usersFromServer} addTodo={addTodo} />
      <TodoList todos={finalTodos} />
    </div>
  );
};
