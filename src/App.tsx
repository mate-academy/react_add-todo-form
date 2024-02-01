import { useContext } from 'react';
import './App.scss';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';
import { AddTodoForm } from './AddTodoForm';

export const App = () => {
  const todos = useContext(TodosContext);

  return (
    <div className="App">
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  );
};
