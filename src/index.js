// @flow
import { Component } from 'react';
import type { Node } from 'react';

type ReturnedChildren = {
  current?: Array<number>,
  by?: number,
  all?: Array<any>,
  onMore?: null | () => void,
};

export type ShowMoreShape = {
  by: number,
  children: (ReturnedChildren) => Node,
  onEnd: null | () => void,
  items: Array<any>,
  replace: boolean
};

type State = {
  current: Array<number>,
};

class ShowMore extends Component<ShowMoreShape, State> {
  static defaultProps = {
    by: 1,
    onEnd: null,
    replace: false,
    items: [],
  };

  constructor(props: ShowMoreShape) {
    super(props);

    this.state = {
      current: [0, props.by - 1],
    };
  }

  onMore = (): void => {
    this.setState(() => ({
      current: this.getNext(),
    }));
  };

  getNext = (): Array<number> => [
    this.props.replace ? this.state.current[1] + 1 : 0,
    this.state.current[1] + this.props.by,
  ];

  getItemsChunk = (current: Array<number>) => (items: Array<any>): Array<any> => (
    items.slice(current[0], current[1] + 1)
  );

  isLastChunk = (chunk: Array<number>): boolean => {
    const { onEnd } = this.props;
    const isLast = chunk[1] >= this.props.items.length - 1;
    if (isLast && typeof onEnd === 'function') {
      onEnd();
    }
    return isLast;
  };

  render(): Node {
    const { onMore } = this;
    const { current } = this.state;
    const {
      children,
      items,
      by,
    } = this.props;

    const chunk = this.getItemsChunk(current)(items);

    const isLastPage = this.isLastChunk(current);
    if (typeof children === 'function') {
      return children({
        current: chunk,
        by,
        all: items,
        onMore: isLastPage ? null : onMore,
      });
    }
    throw new Error('`props.children` must be a function');
  }
}

export default ShowMore;
