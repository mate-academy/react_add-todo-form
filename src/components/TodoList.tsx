import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  address: {};
  phone: string;
  website: string;
  company: {};
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | undefined;
}

type Props = {
  props: Todo[] | null,
};

export const TodoList: React.FC<Props> = ({ props }) => {
  return (
    <div className="TodoList">
      {props && props.map(
        (item) => (
          <div key={item.id}>
            { item.title }
            { item.completed ? 'done' : 'in progress' }
            {item.user?.name}
          </div>
        ),
      )}
    </div>
  );
};
