import { User } from '../../App'; // або правильний шлях до вашого інтерфейсу

interface Props {
  user?: User; // використовуємо знак ?, щоб уникнути помилок, якщо користувач undefined
}

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email || ''}`}>
      {user?.name || 'Unknown User'}
    </a>
  );
};
