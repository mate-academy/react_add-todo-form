import { User } from './User';
import TodoType from '../Types/Type';

export const Todo:React.FC<TodoType> = ({ title, completed, user }) => (
  <li>
    <div>
      {'title - '}
      {title}
    </div>
    <div>
      {'completed - '}
      {(completed) ? 'true' : 'false'}
    </div>
    <User {...user} />
    <hr />
  </li>
);
