import './App.scss';

import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  function addNewTodo(title: string, userId: number, completed = false) {
    const maxId = Math.max(...todos.map(item => item.id));

    const newT: Todo = {
      id: maxId + 1,
      title: title,
      completed: completed,
      userId: userId,
    };

    setTodos(current => [...current, newT]);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <NewTodo onChangeTodo={addNewTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
