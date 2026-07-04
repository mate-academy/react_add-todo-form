// Імпортуємо тип User із правильним розширенням файлу .ts
import { User } from '../../types/user';

// Визначаємо інтерфейс для пропсів компонента
interface UserInfoProps {
  user: User; // Компонент обов'язково приймає об'єкт користувача
}

// Компонент UserInfo тепер є посиланням (тегом <a>)
export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <a
      // Додаємо обов'язковий для тестів клас
      className="UserInfo"
      // Додаємо атрибут data-id із ідентифікатором користувача
      data-id={user.id}
      // Формуємо динамічне посилання mailto для електронної пошти
      href={`mailto:${user.email}`}
    >
      {/* Виводимо ім'я користувача всередині посилання */}
      <h3 className="UserInfo__name">{user.name}</h3>
    </a>
  );
};
