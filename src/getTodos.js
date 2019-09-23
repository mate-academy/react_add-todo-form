// eslint-disable-next-line import/prefer-default-export
export function getTodosWithUsers(todos, users) {
  return todos.map((todo) => {
    const todoUser = users.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: todoUser,
    };
  });
}
