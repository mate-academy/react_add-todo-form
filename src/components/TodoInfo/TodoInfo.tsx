import type { InfoRender } from '../../types/InfoRender';

type TodoInfoProps = {
  item: InfoRender;
};
export const TodoInfo = ({ item }: TodoInfoProps) => {
  return (
    <article data-id={item.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{item.title}</h2>

      <a className="UserInfo" href={`mailto:${item.email}`}>
        {item.name}
      </a>
    </article>
  );
};
