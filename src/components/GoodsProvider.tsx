import {
  ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import {
  createTodo, deleteTodo, getTodos, updateTodo,
} from '../api';

interface GoodsActionsOptions {
  addGoodHandler: (newGood: Todo) => void;
  deleteGoodHandler: (id: number) => void;
  updateGoodsHandler: (newGood: Todo) => void
}

interface GoodsOptions {
  todos: Todo[];
  loading: boolean;
}

export const GoodsContext = createContext<GoodsOptions>({
  todos: [],
  loading: true,
});

export const GoodsOperationsContext = createContext<GoodsActionsOptions>({
  addGoodHandler: () => { },
  deleteGoodHandler: () => { },
  updateGoodsHandler: () => { },
});

export const GoodsProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const addGoodHandler = useCallback((newTodo: Todo) => {
    const temporaryTodo = {
      ...newTodo,
      id: Date.now(),
    };

    createTodo(newTodo)
      .then((todo) => {
        setTodos(prev => (
          prev.map(t => (t.id === temporaryTodo.id ? todo : t))
        ));
      })
      .catch(() => setTodos(prev => (
        prev.filter(t => t.id !== temporaryTodo.id))));

    setTodos(prev => [temporaryTodo, ...prev]);
  }, []);

  const deleteGoodHandler = useCallback((id: number) => {
    let prevTodo: Todo | null = null;

    deleteTodo(id)
      .catch(() => {
        if (!prevTodo) {
          return;
        }

        const todoToCreate = prevTodo;

        setTodos(prev => [todoToCreate, ...prev]);
      });

    setTodos(currentGood => currentGood.filter(good => {
      if (good.id === id) {
        prevTodo = good;
      }

      return good.id !== id;
    }));
  }, []);

  const updateGoodsHandler = useCallback((updatedTodo: Todo) => {
    let prevTodo: Todo | null = null;

    updateTodo(updatedTodo.id, { ...updatedTodo, id: undefined })
      .catch(() => {
        setTodos(prev => prev.map(todo => (
          todo.id === updatedTodo.id && prevTodo ? prevTodo : todo
        )));
      });

    setTodos(currentGoods => (
      currentGoods.map(good => {
        if (good.id === updatedTodo.id) {
          prevTodo = good;
        }

        return good.id === updatedTodo.id ? updatedTodo : good;
      })
    ));
  }, []);

  const value = {
    addGoodHandler, deleteGoodHandler, updateGoodsHandler,
  };

  const operationsValue = useMemo(() => value, []);

  const goodsContextValue = useMemo(() => ({
    todos,
    loading,
  }), [todos, loading]);

  return (
    <GoodsOperationsContext.Provider value={operationsValue}>
      <GoodsContext.Provider value={goodsContextValue}>
        {children}
      </GoodsContext.Provider>
    </GoodsOperationsContext.Provider>
  );
};
