import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/Todo';
import { PostForm } from './PostForm';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewPostId(posts: Todo[]) {
  const maxId = Math.max(...posts.map(post => post.id));

  return maxId + 1;
}

export const App: React.FC = ({}) => {
  const [posts, setPosts] = useState<Todo[]>(todos);

  const addPost = (post: Todo) => {
    const newPost = {
      ...post,
      id: getNewPostId(posts),
    };

    setPosts(currentPosts => [...currentPosts, newPost]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <PostForm onSubmit={addPost} />
      <TodoList todos={posts} />

      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
