import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('<App />', () => {
  test('renders navigation', async () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(container).toMatchSnapshot();

    // expect(screen.getByTestId('App')).toBeInTheDocument();
    // getByRole is cool because it gives you back the list of existing roles
    // in case there is no match
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByLabelText('navigation')).toBeInTheDocument();
  });

  test('it should submit and go to the consents table', async () => {
    const testNameInput = 'John Doe';
    const testEmailInput = 'john.doe@gmail.com';

    await render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: testNameInput },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: testEmailInput },
    });
    fireEvent.click(screen.getByLabelText('Receive newsletter'));
    fireEvent.click(screen.getByLabelText('Be shown targeted ads'));
    fireEvent.click(
      screen.getByLabelText('Contribute to anonymous visit statistics')
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Give consent/i,
      })
    );

    expect(await screen.findByLabelText('mui table')).toBeInTheDocument();
  });
});
