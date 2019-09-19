function getTodosWithUsers(listOfTodos, listOfUsers) {
  return listOfTodos.map((todo) => {
    const todoUser = listOfUsers.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: todoUser,
    };
  });
}

export default getTodosWithUsers;
