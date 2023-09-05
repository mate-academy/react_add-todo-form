import { useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormAddTodo } from './components/FormAddTodo';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);

  const matchTodosUsers = () => {
    setTodos(prevTodos => prevTodos.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })));
  };

  const addTodo = (title: string, userId: number) => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  useEffect(() => {
    matchTodosUsers();
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <FormAddTodo addTodo={addTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
