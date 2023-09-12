import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { ToDoForm } from './components/ToDoForm/ToDoForm';

function getUserById(userId: number) : User | null {
  return usersFromServer.find((user) => user.id === userId) || null;
}

function getFormattedTodos() {
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
  const [todos, setTodos] = useState<ToDo[]>(getFormattedTodos());

  const addToDo = (userId: number, newTitle: string) => {
    const user = getUserById(userId);
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
