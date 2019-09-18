'use strict';

import todos from '../todos';
import users from '../users';

const todosWithUsers = getTodosWithUsers(todos, users);

function getTodosWithUsers(todoList, userList) {
  return todoList.map(todo => {
    return (
      {
        ...todo,
        user: userList.find(user => user.id === todo.userId),
      }
    );
  });
}

export default todosWithUsers;
