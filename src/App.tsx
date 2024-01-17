import { useState, useEffect } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { AddTodoFrom } from './components/Addtodoform';
import { Todo } from './types/Todo';
import { getUserByID } from './services/getUser';
import { getNewPostId } from './services/getTodoId';

export const currentTodos = todosFromServer.flatMap(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [...currentTodos];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewPostId(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <AddTodoFrom
        onAdd={addTodo}
      />

      <TodoList todos={todos} />
    </div>
  );
};
