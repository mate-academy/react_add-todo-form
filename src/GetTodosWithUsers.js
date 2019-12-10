function GetTodosWithUsers(todos, users) {
  return (todos.map(todo => (
    {
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }
  )));
}

export default GetTodosWithUsers;
