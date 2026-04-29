import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState(todosWithUsers);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        onAdd={todo => setTodos(prevTodo => [...prevTodo, todo])}
        todos={todos}
        users={usersFromServer}
      />
      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
