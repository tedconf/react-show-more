/* eslint-env jest */

import ShowMore from './';

describe('<ShowMore /> with defaults', () => {
  const index = shallow(
    <ShowMore
      {...MOCK.SIMPLE}
    >
      {({
        current,
        onMore,
        by,
        onEnd,
        all,
      }) => (
        <React.Fragment>
          <ul>
            {current.map(x => (
              <li
                key={x}
              >
                {x}
              </li>
            ))}
          </ul>
          <button onClick={() => { onMore(); }}>more</button>
          <div id="all">
            {JSON.stringify(all)}
          </div>
          <div id="current">
            {JSON.stringify(current)}
          </div>
          <div id="by">
            {JSON.stringify(by)}
          </div>
          <div id="onEnd">
            {JSON.stringify(onEnd)}
          </div>
        </React.Fragment>
      )}
    </ShowMore>
  );

  test('renders children', () => {
    const actual = index.find('li');
    expect(index.find('ul')).toHaveLength(1);
    expect(actual).toHaveLength(1);
    expect(actual.last().text()).toBe('1');
  });

  test('when `onMore` is clicked, it loads another option (2 options)', () => {
    index.find('button').simulate('click');
    expect(index.find('li')).toHaveLength(2);
    expect(index.find('li').first().text()).toBe('1');
    expect(index.find('li').last().text()).toBe('2');
  });

  test('when `onMore` is clicked, it loads another option (3 options)', () => {
    index.find('button').simulate('click');
    expect(index.find('li')).toHaveLength(3);
    expect(index.find('li').first().text()).toBe('1');
    expect(index.find('li').last().text()).toBe('3');
  });

  test('props:all provides elements', () => {
    expect(index.find('#all').text()).toBe('[1,2,3,4,5]');
  });

  test('props:current provides current items', () => {
    expect(index.find('#current').text()).toBe('[1,2,3]');
  });

  test('props:by provides current `by` value', () => {
    expect(index.find('#by').text()).toBe('1');
  });

  test('props:onEnd is null when not provided', () => {
    expect(index.find('#onEnd').text()).toBe('null');
  });
});

describe('<ShowMore /> with advanced config', () => {
  const index = shallow(
    <ShowMore
      {...MOCK.ADVANCED}
    >
      {({
        current,
        onMore,
        by,
        onEnd,
        all,
      }) => (
        <React.Fragment>
          <ul>
            {current.map(x => (
              <li
                key={x.id}
              >
                {x.id}
              </li>
            ))}
          </ul>
          <button onClick={() => { onMore(); }}>more</button>
          <div id="all">
            {JSON.stringify(all)}
          </div>
          <div id="current">
            {JSON.stringify(current)}
          </div>
          <div id="by">
            {JSON.stringify(by)}
          </div>
        </React.Fragment>
      )}
    </ShowMore>
  );

  test('renders children', () => {
    const actual = index.find('li');
    expect(index.find('ul')).toHaveLength(1);
    expect(actual).toHaveLength(4);
    expect(actual.last().text()).toBe('4');
  });

  test('props:onEnd is not called when there are results left', () => {
    expect(MOCK.ADVANCED.onEnd).not.toHaveBeenCalled();
  });

  test('when `onMore` is clicked, it loads another option (4 options, 5-6)', () => {
    index.find('button').simulate('click');
    const actual = index.find('li');
    expect(actual).toHaveLength(2);
    expect(actual.first().text()).toBe('5');
    expect(actual.last().text()).toBe('6');
  });

  test('props:all provides elements', () => {
    const actual = index.find('#all').text();
    const expected = JSON.stringify(MOCK.ADVANCED.items);
    expect(actual).toBe(expected);
  });

  test('props:current provides current items', () => {
    const actual = index.find('#current').text();
    const expected = JSON.stringify(MOCK.ADVANCED.items.slice(4, 7));
    expect(actual).toBe(expected);
  });

  test('props:by provides current `by` value', () => {
    const actual = index.find('#by').text();
    const expected = '4'
    expect(actual).toBe(expected);
  });

  test('props:onEnd is called when provided', () => {
    expect(MOCK.ADVANCED.onEnd).toHaveBeenCalled();
  });
});

describe('<ShowMore /> with advanced config & \'perfect\' `by` number', () => {
  const index = shallow(
    <ShowMore
      {...MOCK.ADVANCED}
      by={3}
    >
      {({
        current,
        onMore,
        by,
        onEnd,
        all,
      }) => (
        <React.Fragment>
          <ul>
            {current.map(x => (
              <li
                key={x.id}
              >
                {x.id}
              </li>
            ))}
          </ul>
          <button onClick={() => { onMore(); }}>more</button>
          <div id="all">
            {JSON.stringify(all)}
          </div>
          <div id="current">
            {JSON.stringify(current)}
          </div>
          <div id="by">
            {JSON.stringify(by)}
          </div>
        </React.Fragment>
      )}
    </ShowMore>
  );

  test('renders children', () => {
    const actual = index.find('li');
    expect(index.find('ul')).toHaveLength(1);
    expect(actual).toHaveLength(3);
    expect(actual.last().text()).toBe('3');
  });

  test('props:onEnd is not called when there are results left', () => {
    expect(MOCK.ADVANCED.onEnd).toHaveBeenCalledTimes(1);
  });

  test('when `onMore` is clicked, it loads another option (3 options, 4-6)', () => {
    index.find('button').simulate('click');
    const actual = index.find('li');
    expect(actual).toHaveLength(3);
    expect(actual.first().text()).toBe('4');
    expect(actual.last().text()).toBe('6');
  });

  test('props:all provides elements', () => {
    const actual = index.find('#all').text();
    const expected = JSON.stringify(MOCK.ADVANCED.items);
    expect(actual).toBe(expected);
  });

  test('props:current provides current items', () => {
    const actual = index.find('#current').text();
    const expected = JSON.stringify(MOCK.ADVANCED.items.slice(3, 7));
    expect(actual).toBe(expected);
  });

  test('props:by provides current `by` value', () => {
    const actual = index.find('#by').text();
    const expected = '3'
    expect(actual).toBe(expected);
  });

  test('props:onEnd is called when provided', () => {
    expect(MOCK.ADVANCED.onEnd).toHaveBeenCalledTimes(2);
  });
});
