import { FC } from 'react';

type Props = {
  name: string;
  email: string;
};

export const UserInfo: FC<Props> = (props) => {
  return (
    <div className="User">
      <h3 className="UserName">{props.name}</h3>
      <a
        className="UserEmail"
        href={`mailto:${props.email}`}
      >
        {props.email}
      </a>
    </div>
  );
};
