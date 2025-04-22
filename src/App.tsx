import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { todos } from './services/todos';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/users';

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const onAdd = (todo: Todo) => {
    const newUser = {
      ...todo,
      id:
        todoList.length > 0
          ? Math.max(...todoList.map(currentTodo => +currentTodo.id)) + 1
          : 1,
      user: getUserById(todo.userId),
    };

    setTodoList([...todoList, newUser]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm handleAdd={onAdd} />
      <TodoList todos={todoList} />
    </div>
  );
};
