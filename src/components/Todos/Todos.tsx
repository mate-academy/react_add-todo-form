import { FC, useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';
import { getTodosByUserId } from '../../api/todos';
import { useAuthContext } from '../Auth/AuthContext';
import { Loader } from '../Loader';

export const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const authUser = useAuthContext();

  useEffect(() => {
    const loadTodos = async () => {
      if (!authUser) {
        return;
      }

      setLoading(true);

      const todosFromServer = await getTodosByUserId(authUser.id);

      setTodos(todosFromServer);
      setLoading(false);
    };

    loadTodos();
  }, [authUser]);

  const addTodo = (todoData: Omit<Todo, 'id'>) => {
    const newTodo = {
      ...todoData,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => currentTodos.map(
      todo => (todo.id === updatedTodo.id ? updatedTodo : todo),
    ));
  };

  return (
    <>
      <TodoForm onSubmit={addTodo} />
      {loading
        ? (
          <Loader />
        )
        : (
          <TodoList
            todos={todos}
            onTodoDelete={deleteTodo}
            onTodoUpdate={updateTodo}
          />
        )}
    </>
  );
};
