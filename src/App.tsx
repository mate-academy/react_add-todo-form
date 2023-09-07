import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { ToDoForm } from './components/ToDoForm/ToDoForm';

type UserType = User | null;

function getUserById(userId: number) : UserType {
  return usersFromServer.find((user) => user.id === userId) || null;
}

function createToDos() {
  return todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));
}

const getNewToDoId = (todos: ToDo[]): number => {
  const maxId: number = Math.max(...todos.map((todo) => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(createToDos());

  const addToDo = (userId: number, newTitle: string) => {
    const user: UserType = getUserById(userId);
    const todo: ToDo = {
      id: getNewToDoId(todos),
      title: newTitle,
      completed: false,
      userId,
      user,
    };

    if (user !== null) {
      setTodos((currentToDos) => [...currentToDos, todo]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <ToDoForm onAdd={addToDo} users={usersFromServer} />

      <TodoList todos={todos} />

    </div>
  );
};
