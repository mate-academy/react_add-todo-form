export function getTodosWithUsers(todos, users) {
  return todos.map(item => (
    {
      ...item,
      user: users.find(user => user.id === item.userId),
    }
  ));
}

export default getTodosWithUsers;
