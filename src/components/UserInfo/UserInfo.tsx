import { Todo } from '../../types/Todo';

type Props = {
  toDoInfo: Todo;
};

export const UserInfo = (props: Props) => {
  return (
    <a
      className="UserInfo"
      href={'mailto:' + (!props.toDoInfo.user ? '' : props.toDoInfo.user.email)}
    >
      {props.toDoInfo.user.name}
    </a>
  );
};
