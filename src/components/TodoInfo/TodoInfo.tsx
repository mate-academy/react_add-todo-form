import classNames from 'classnames';

type TodoInfoProps = {
  id: number;
  title: string;
  email: string;
  name: string;
  completed: boolean;
};

export const TodoInfo = ({
  id,
  title,
  email,
  name,
  completed,
}: TodoInfoProps) => {
  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    </article>
  );
};
