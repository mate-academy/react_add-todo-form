import React from 'react';
import { Todo } from './types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  ),
  (prevProps, nextProps) => prevProps.todos === nextProps.todos,
);

function compareProps(prevProps: Props, nextProps: Props) {
  if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
    return false;
  }

  return Object.keys(prevProps).every(
    (key) => prevProps[key as keyof Props] === nextProps[key as keyof Props],
  );
}

export function memo(
  Component: React.FC<Props>,
  arePropsEqual = compareProps,
) {
  let prevProps: Props | void;
  let prevJSX: React.ReactNode | void;

  return (nextProps: Props) => {
    if (!prevProps || !arePropsEqual(prevProps, nextProps)) {
      prevJSX = Component({ ...nextProps });
    }

    prevProps = nextProps;

    return prevJSX;
  };
}
