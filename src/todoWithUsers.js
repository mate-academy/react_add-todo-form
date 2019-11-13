function todoWithUsers(todos, users) {
  const todoWithUsersArray = Array.from(todos);

  for (let i = 0; i < todoWithUsersArray.length; i += 1) {
    todoWithUsersArray[i].user = users.find(
      user => user.id === todoWithUsersArray[i].userId
    );
  }

  return todoWithUsersArray;
}

export default todoWithUsers;
