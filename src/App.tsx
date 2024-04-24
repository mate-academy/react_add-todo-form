import './App.scss';

import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/todoWithUser';
import { findUser } from './services/findUser';
import TodoForm, { InputValues } from './components/TodoForm/TodoForm';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const handleNewUser = (inputValues: InputValues) => {
    const maxId = Math.max(...todos.map(todo => todo.id));
    const findedUser = findUser(inputValues.user);

    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title: inputValues.title,
      completed: false,
      userId: findedUser.id,
      user: findedUser,
    };

    setTodos(prevState => [...prevState, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onAddTodo={handleNewUser} />

      <TodoList todos={todos} />
    </div>
  );
};
