import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-testing-library';
import SignInView from './SignInView';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignInView />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders a view title', () => {
  const { getByText } = render(<SignInView />);
  expect(getByText('Sign In')).toBeInTheDocument();
});
