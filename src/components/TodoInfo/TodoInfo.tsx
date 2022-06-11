import classNames from 'classnames';
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = Omit<Todo, 'id' | 'userId'>;

export const TodoInfo: FC<Props> = ({ title, completed, user }) => {
  return (
    <section className="todo-info">
      <h2 className="todo-info__title">
        {title}
      </h2>
      <p className={classNames('todo-info__description',
        { 'todo-info__description--completed': completed })}
      >
        {completed ? 'Done' : 'In progress..'}
      </p>
      {user && (
        <>
          <div className="todo-info__assigned">Assigned: </div>
          <UserInfo
            name={user.name}
            email={user.email}
          />
        </>

      )}
    </section>
  );
};
