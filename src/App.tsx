import './App.scss';
import { Todo, TodoList, User } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Form } from './components/Form';
import { useState } from 'react';

export const App = () => {
  const [usersList] = useState<User[]>(usersFromServer);
  const [todoList, setTodoList] = useState<Todo[]>(todosFromServer); // Fixed typo in setter name

  const addNewTodo = (newTodo: Todo) => {
    setTodoList(currentTodos => [...currentTodos, newTodo]); // Fixed setter name and simplified type
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Form users={usersList} todos={todoList} addFunc={addNewTodo} />

      <TodoList todos={todoList} users={usersList} />
    </div>
  );
};
