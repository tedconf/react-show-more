# React Show More
[![Build Status](https://img.shields.io/travis/tedconf/react-show-more.svg?style=flat-square)](https://travis-ci.org/tedconf/react-show-more)
[![Test Coverage](https://img.shields.io/coveralls/github/tedconf/react-show-more.svg?style=flat-square)](https://coveralls.io/github/tedconf/react-show-more)
[![npm](https://img.shields.io/npm/dt/@tedconf/react-show-more.svg?style=flat-square)](https://www.npmjs.com/package/@tedconf/react-show-more)
[![license](https://img.shields.io/npm/l/@tedconf/react-show-more.svg?style=flat-square)]()
[![dependencies](https://img.shields.io/david/tedconf/react-show-more.svg?style=flat-square)]()
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

Ever need a component which allows you to display a certain number of items in
a list, then allow a user to show that many more, over and over, until they
reach the end of the list?

`@tedconf/react-show-more` does just that while giving you complete control of
your style by using [render props](https://reactjs.org/docs/render-props.html).

![`@tedconf/react-show-more in action`](https://media.giphy.com/media/xUOwFTTRWEJmrLJJ0A/giphy.gif)

## install

```
yarn add @tedconf/react-show-more
```

## use

* [Here's a CodeSandbox demo](https://codesandbox.io/s/xjykw83n7z)
* [Here's an Infinite Scroll demo](https://codesandbox.io/s/43kw07j279)

```jsx
import React from 'react';
import ShowMore from '@tedconf/react-show-more';

const MyLongComponent = ({ listItems }) => (
  <ShowMore
    items={listItems}
    by={2}
  >
    {({
      current,
      onMore,
    }) => (
      <React.Fragment>
        <ul>
          {current.map(item => (
            <li
              key={item.id}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <button
          disabled={!onMore}
          onClick={() => { if (!!onMore) onMore(); }}
        >
          more
        </button>
      </React.Fragment>
    )}
  </ShowMore>
);

render(
  <MyLongComponent
    listItems={[
      {
        id: '1',
        label: 'You can grow new brain cells. Here\'s how',
      },
      {
        id: '2',
        label: 'The brain may be able to repair itself — with help',
      },
      {
        id: '3',
        label: 'Growing evidence of brain plasticity',
      },
      {
        id: '4',
        label: 'One more reason to get a good night\'s sleep',
      },
    ]}
  />,
  yourEl,
);
```

### props

`@tedconf/react-show-more` takes a few props:

|Required |Prop       |Type         |Purpose                                                               |
|--------:|-----------|-------------|----------------------------------------------------------------------|
|✔        |`items`    |__Array__    |the entire list of items you'd like to act on                         |
|1        |`by`       |__Int__      |the number of items to show at a time                                 |
|false    |`replace`  |__Boolean__  |should it add to the results, or replace them                         |
|() => {} |`onEnd`    |__Function__ |the function to be called when reaching the end of the list of items|

### props passed to the child function

`@tedconf/react-show-more` provides a function as the child, and that function
comes with some useful arguments:

|Prop     |Type                |Purpose                                       |
|---------|--------------------|----------------------------------------------|
|`current`|__Array__           |the currently visible results                 |
|`by`     |__Int__             |same number you passed in as `by` prop        |
|`all`    |__Array__           |same array you passed in as `items` prop      |
|`onMore` |__Function \| null__|returns either a __function that tells the component to update the `current` prop__ with the next result or __null__, which means there are no results left to show|
