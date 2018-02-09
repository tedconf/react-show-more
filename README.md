# React Show More

Ever need a component which allows you to display a certain number of items in
a list, then allow a user to show that many more, over and over, until they
reach the end of the list?

`@tedconf/react-show-more` does just that while giving you complete control of
your style by using [render props](https://reactjs.org/docs/render-props.html).

## install

```
yarn add @tedconf/react-show-more
```

## use

[Here's a CodeSandbox demo](https://codesandbox.io/s/xjykw83n7z)

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

|Required |Prop       |Type     |Purpose                                      |
|--------:|-----------|---------|---------------------------------------------|
|✔        |`items`    |__Array__|the entire list of items you'd like to act on|
|1        |`by`       |__Int__  |the number of items to show at a time        |
|false    |`replace`  |__Array__|should it add to the results, or replace them|

### props passed to the child function

`@tedconf/react-show-more` provides a function as the child, and that function
comes with some useful arguments:

|Prop     |Type                |Purpose                                       |
|---------|--------------------|----------------------------------------------|
|`current`|__Array__           |the currently visible results                 |
|`by`     |__Int__             |same number you passed in as `by` prop        |
|`all`    |__Array__           |same array you passed in as `items prop       |
|`onMore` |__Function \| null__|returns either a __function that tells the component to update the `current` prop__ with the next result or __null__, which means there are no results left to show|
