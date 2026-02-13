import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { Todo } from './types';

// Prepara os dados iniciais associando cada todo ao seu usuário
// Segue o princípio de preparar dados no componente raiz (checklist item 5)
const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

// Gera o próximo ID baseado no maior ID existente + 1
function getNewTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  // Callback passado ao TodoForm — recebe título e userId já validados
  const handleAddTodo = (title: string, userId: number) => {
    const selectedUser = usersFromServer.find(user => user.id === userId)!;

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      {/* Dados (users) são passados como prop, não importados no filho */}
      <TodoForm users={usersFromServer} onAddTodo={handleAddTodo} />

      <TodoList todos={todos} />
    </div>
  );
};
