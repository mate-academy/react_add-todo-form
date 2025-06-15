import React from "react";
import { Post } from "../types/Post";

type Props = {
  posts: Post[];
};

export const TodoInfo: React.FC<Props> = ({ posts }) => {
  return posts.map(post => (
    <article
      key={post.id}
      data-id={post.id}
      className="TodoInfo TodoInfo--completed"
    >
      <h2 className="TodoInfo__title">{post.title}</h2>

      <a className="UserInfo" href={`mailto:${post.user?.email}`}>
        {post.user && <p>{post.user.name}</p>}
      </a>
    </article>
  ));
};
