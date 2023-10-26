import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { getUserById } from './components/Helper/Helper';
import { TasksWithTodo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';

const tasksWithTodo: TasksWithTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TasksWithTodo[]>(tasksWithTodo);
  const getTodoId = tasksWithTodo.map(todo => todo.id);
  const getId = Math.max(...getTodoId) + 1;

  const addTask = (newTodo: Omit<TasksWithTodo, 'id'>) => {
    setTodos(currentTodos => [...currentTodos, { ...newTodo, id: getId }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTask} />
      <TodoList todos={todos} />
    </div>
  );
};
