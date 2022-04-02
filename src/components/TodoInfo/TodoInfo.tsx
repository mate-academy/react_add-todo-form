import React from 'react';
import { Form } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import '../../styles/components/TodoInfo.scss';

type Props = Todo;

export const TodoInfo: React.FC<Props> = ({
  user,
  todoId,
  title,
  completed,
}) => (
  <div className="
    TodoInfo
    d-flex
    justify-content-between
    align-items-center
    "
  >
    <div className="
      TodoInfo__title
      d-flex
      align-items-center
      "
    >
      <FormCheckLabel
        className="
        TodoInfo__title-text
        d-flex
        align-items-center
        "
      >
        <Form className="me-3">
          <Form.Check
            className="TodoInfo__check"
            id={String(todoId)}
            defaultChecked={completed}
          />
        </Form>

        {title}
      </FormCheckLabel>
    </div>

    {user && <UserInfo {...user} />}
  </div>
);
