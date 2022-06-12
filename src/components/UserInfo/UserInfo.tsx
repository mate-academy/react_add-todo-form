import './UserInfo.css';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = (props) => (
  <div className="UserInfo">
    <p>
      {`${props.user.name}`}
    </p>
    <p>
      {`${props.user.email}`}
    </p>
  </div>
);
