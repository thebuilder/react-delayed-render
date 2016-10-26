import React from 'react';
import ReactDom from 'react-dom';
import delayedRender from '../';

jest.mock('react-dom');

const lookup = {
  Components: {
    Header: ({title}) => <h1>{title}</h1>, // eslint-disable-line
  },
};

// Mock document.getElementById
document.getElementById = jest.fn(id => (id === 'mount-point' ? {} : null));

it('should render header', () => {
  const input = {name: 'Components.Header', props: {title: 'Hello'}, element: 'mount-point'};
  delayedRender([input], lookup);
  expect(ReactDom.render).toHaveBeenCalled();
});

it('log error if element not found', () => {
  const input = {name: 'Components.Header', props: {title: 'Hello'}, element: 'invalid-point'};
  expect(() => {
    delayedRender([input], lookup);
  }).toThrow();
});

it('log error if component not found', () => {
  const input = {name: 'Components.InvalidHeader', props: {title: 'Hello'}, element: 'mount-point'};
  expect(() => {
    delayedRender([input], lookup);
  }).toThrow();
});