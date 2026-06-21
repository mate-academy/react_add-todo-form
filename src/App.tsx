import './App.scss';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user:
        usersFromServer.find(foundUser => foundUser.id === todo.userId) || null,
    })),
  );

  const addNewPost = (title: string, userId: number) => {
    const newTodo = {
      id: Math.max(...todos.map(todoItem => todoItem.id)) + 1,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(foundUser => foundUser.id === userId) || null,
    };

    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form usersServer={usersFromServer} onAdd={addNewPost} />
      <TodoList todos={todos} />
    </div>
  );
};
