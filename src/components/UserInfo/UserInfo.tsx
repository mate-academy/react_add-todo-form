import { User } from '../../App';
export const UserInfo = ({ user }: { user: User }) => <a className="UserInfo" href={`mailto:${user.email}`}>{user.name}</a>;
