import type { InfoRender } from '../../types/InfoRender';

type TodoInfoProps = {
  el: InfoRender;
};
export const TodoInfo = ({ el }: TodoInfoProps) => {
  return (
    <article data-id={el.id} className="TodoInfo TodoInfo--completed">
      <h2 className="TodoInfo__title">{el.title}</h2>

      <a className="UserInfo" href={`mailto:${el.email}`}>
        {el.name}
      </a>
    </article>
  );
};
