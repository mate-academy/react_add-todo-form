import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm/AddTodoForm';
import { TodoInfo } from './types';

export const App = () => {
  const [todoList, setTodoList] = useState<Array<TodoInfo>>(
    todosFromServer || [],
  );

  const handleSubmit = (todoData: Omit<TodoInfo, 'id'>) => {
    const newTodo = {
      ...todoData,
      userId: Number(todoData.userId),
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
    };

    setTodoList(prev => [...prev, newTodo]);
  };

  return (
    <div className="App">
      <AddTodoForm handleSubmit={handleSubmit} />
      <TodoList todos={todoList} />
    </div>
  );
};
