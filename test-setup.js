/* global React, shallow, render, mount */
const React = require('react');
const {
  configure,
  shallow,
  render,
  mount,
} = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;

/* eslint-disable */
global.MOCK = Object.freeze({
  SIMPLE: {
    items: [
      1,
      2,
      3,
      4,
      5,
    ],
  },
  ADVANCED: {
    by: 3,
    replace: true,
    onEnd: jest.fn(),
    items: [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
  },
});
/* eslint-enable */
