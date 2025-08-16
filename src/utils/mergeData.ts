import { ITodos, IUsers } from '../components/types/data.interface';

export const mergeData = (todosData: ITodos[], usersData: IUsers[]) => {
  const merged = todosData.map(todo => {
    return {
      id: todo.id,
      title: todo.title,
      userId: todo.userId,
      completed: todo.completed,
      user: usersData.find(x => x.id === todo.userId)!,
    };
  });

  return merged;
};
