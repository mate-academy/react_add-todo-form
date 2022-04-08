import React from 'react';
import './TodoItem.scss';
import classNames from 'classnames';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userLink?: {
    name: string,
    email: string,
  }
}

type Props = {
  todoInfo: Todo;
};

const TodoItem: React.FC<Props> = ({ todoInfo }) => {
  return (
    <>
      <p>
        {'User: '}
        { todoInfo.userLink?.name}
        <br />
        <a className="TodoItem__mail" href={`mailto:${todoInfo.userLink?.email}`}>
          { todoInfo.userLink?.email}
          {' '}
        </a>
      </p>
      <div className="TodoItem__completed">
        <p>Completed:</p>
        <div className={classNames(
          'TodoItem__icon',
          { 'TodoItem__icon--yes': todoInfo.completed },
          { 'TodoItem__icon--no': !todoInfo.completed },
        )}
        />
      </div>
      <p className="TodoItem__title">
        {'Title: '}
        {todoInfo.title}
      </p>
    </>
  );
};

export default TodoItem;
