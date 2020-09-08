import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { NewTodoForm } from './components/NewTodoForm/NewTodoForm';

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  person: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const addNewTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleComplete = (id) => {
    const completedTodos = [...todos]
      .map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

    setTodos(completedTodos);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodoForm
        users={usersFromServer}
        todoId={todos.length + 1}
        addNewTodo={addNewTodo}
      />

      <TodoList todos={todos} toggleComplete={toggleComplete} />
    </div>
  );
};
