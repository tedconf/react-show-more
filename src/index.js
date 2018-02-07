import { Component } from 'react';

class ShowMore extends Component {
  static defaultProps = {
    by: 1,
    onEnd: null,
    replace: false,
    items: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      current: [0, props.by - 1],
    };
  }

  getNext = () => ([
    this.props.replace ? (this.state.current[1] + 1) : 0,
    (this.state.current[1] + this.props.by)
  ])

  onMore = () => {
    this.setState(state => ({
      current: this.getNext(),
    }));
  }

  getItemsChunk = current => items => items.slice(current[0], current[1] + 1);

  isLastChunk = by => chunk => {
    const { onEnd } = this.props;
    const isLast = chunk[1] >= (this.props.items.length - 1);
    if (isLast && onEnd) {
      onEnd();
    }
    return isLast;
  }

  render() {
    const onMore = this.onMore;
    const { current } = this.state;
    const {
      children,
      items,
      by,
      onEnd,
    } = this.props;

    const chunk = this.getItemsChunk(current)(items);

    const isLastPage = this.isLastChunk(by)(current);
    if(typeof children === 'function') {
      return children({
        current: chunk,
        by,
        onEnd,
        all: items,
        onMore: isLastPage ? () => { onEnd(); } : onMore,
      });
    }
    return null;
  }
}

export default ShowMore;
