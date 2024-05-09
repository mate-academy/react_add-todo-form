import { useState } from 'react';
import { Todo } from '../types/Todo';

export const useTodos = (list: Todo[]) => {
  const [currentTodos, setCurrentTodos] = useState(list);

  return [currentTodos, setCurrentTodos] as const;
};
