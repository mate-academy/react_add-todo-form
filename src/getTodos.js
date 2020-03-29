export const getTodosWithUsers = (todosArr, usersArr) => (
  todosArr.map((todo) => {
    const todoUser = usersArr.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: todoUser,
    };
  })
);
