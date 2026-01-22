// Це краще винести в окремий файл, наприклад `types/Todo.ts`,
// але поки можна залишити і тут зверху.

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User; // Знак питання, бо сервер може не відразу дати юзера, але в нашому завданні ми його додаємо самі
}
