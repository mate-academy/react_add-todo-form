import { useState } from 'react';
import './App.scss';
import { Form } from './components/Form/Form';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';
import { todosWiaUser } from './utils/todoWiaUser';

export const App = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>(todosWiaUser);

  const addTodo = (newTodo: Todo) => {
    setTodoItems(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Form addTodo={addTodo} todos={todoItems} />
      <TodoList todos={todoItems} />
    </div>
  );
};
