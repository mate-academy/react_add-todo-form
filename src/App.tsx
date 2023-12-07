import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUsersTodos, setNextId } from './helpers';
import { TodoWithUser } from './components/types';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

const allTodos = getUsersTodos(todosFromServer, usersFromServer);

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(allTodos);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorSelect, setIsErrorSelect] = useState(false);

  const addTodo = (todo:string, userId:number) => {
    const user = usersFromServer
      .find(({ id }) => id === userId);

    setTodos((currentUsersTodos) => {
      const newTodo:TodoWithUser = {
        id: setNextId(todos),
        title: todo.trim(),
        completed: false,
        userId,
        user,
      };

      return [...currentUsersTodos, newTodo];
    });
  };

  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setIsErrorTitle(false);
  };

  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(Number(event.target.value));
    setIsErrorSelect(false);
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    setIsErrorSelect(!selectedId);
    setIsErrorTitle(!todoTitle);
    if (!todoTitle || !selectedId) {
      return;
    }

    addTodo(todoTitle, selectedId);
    setTodoTitle('');
    setSelectedId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm
        isErrorTitle={isErrorTitle}
        isErrorSelect={isErrorSelect}
        handleSubmit={handleSubmit}
        todoTitle={todoTitle}
        selectedId={selectedId}
        handleInput={handleInput}
        handleSelect={handleSelect}
      />
      <TodoList todos={todos} />
    </div>
  );
};
