/* eslint-disable max-len, no-console */
import React, { useState } from 'react';
import { Good } from './types/Good';
import { GoodForm } from './GoodForm';

type Props = {
  good: Good;
  onDelete?: (goodId: number) => void;
  onUpdate?: (good: Good) => void;
};

export const GoodItem: React.FC<Props> = ({
  good,
  onUpdate = () => { },
  onDelete = () => { },
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <article
      key={good.id}
      className="GoodCard"
    >
      {editing ? (
        <GoodForm
          onSubmit={(updatedGood: Good) => {
            onUpdate(updatedGood);
            setEditing(false);
          }}
          onReset={() => setEditing(false)}
          good={good}
        />
      ) : (
        <p
          className="GoodCard__title"
          style={{ color: good.color?.name || 'black' }}
        >
          <button type="button" onClick={() => onDelete(good.id)}>
            x
          </button>

          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>

          {good.name}
        </p>
      )}
    </article>
  );
};

type State = {
  editing: boolean;
};

export class GoodItem2 extends React.Component<Props, State> {
  state: Readonly<State> = {
    editing: false,
  };

  constructor(props: Props) {
    super(props);

    console.log('Created');
  }

  componentDidMount(): void {
    console.log('Mounted');
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.good.name !== this.props.good.name) {
      console.log(
        `Good was renamed from ${prevProps.good.name} to ${this.props.good.name}`,
      );
    }

    console.log('Updated');
  }

  componentWillUnmount(): void {
    console.log('Is about to be unmounted');
  }

  render() {
    const {
      good,
      onUpdate = () => { },
      onDelete = () => { },
    } = this.props;
    const { editing } = this.state;

    const setEditing = (newValue: boolean) => {
      this.setState({ editing: newValue });
    };

    return (
      <article
        key={good.id}
        className="GoodCard"
      >
        {editing ? (
          <GoodForm
            onSubmit={(updatedGood: Good) => {
              onUpdate(updatedGood);
              setEditing(false);
            }}
            onReset={() => setEditing(false)}
            good={good}
          />
        ) : (
          <p
            className="GoodCard__title"
            style={{ color: good.color?.name || 'black' }}
          >
            <button type="button" onClick={() => onDelete(good.id)}>
              x
            </button>

            <button type="button" onClick={() => setEditing(true)}>
              edit
            </button>

            {good.name}
          </p>
        )}
      </article>
    );
  }
}
