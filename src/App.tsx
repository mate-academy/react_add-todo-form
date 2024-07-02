import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import { FormData } from './types/FormData';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = (data: FormData) => {
    const { title, user: userId } = data;
    const idTodoNew = Math.max(...todos.map(todo => todo.id)) + 1;
    const todoNew = {
      id: idTodoNew,
      title,
      completed: false,
      userId: +userId,
    };

    setTodos(currentTodos => [...currentTodos, todoNew]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form onAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
};
