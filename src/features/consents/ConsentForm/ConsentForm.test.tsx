import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConsentForm from './ConsentForm';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('<ConsentForm />', () => {
  test('it should mount', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConsentForm />
        </BrowserRouter>
      </Provider>
    );

    // getByTestId ist not really advised, but the React CLI generates the tests this way
    const consentForm = screen.getByTestId('ConsentForm');
    expect(consentForm).toBeInTheDocument();
  });

  test('it should handle error', async () => {
    const testNameInput = 'Irregular Test Input';
    const testEmailInput = 'test@test.com';

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ConsentForm />
        </BrowserRouter>
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

    // getByText is not working here
    expect(
      await screen.findByText('Error on consent save')
    ).toBeInTheDocument();

    // This doesn't work because of the multiple elements that are satisfying the query
    // userEvent.click(
    //   await screen.getByRole('button', {
    //     name: /Close/i,
    //   })
    // );

    // Close the snackbar with the button "Close"
    userEvent.click(screen.getByText(/Close/i));

    // This doesn't work, because findByText is async
    // await waitForElementToBeRemoved(() => screen.findByText('Error on consent save'));
    await waitForElementToBeRemoved(() =>
      screen.queryByText('Error on consent save')
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Give consent/i,
      })
    );

    expect(
      await screen.findByText('Error on consent save')
    ).toBeInTheDocument();

    // Close the snackbar with the icon x
    userEvent.click(await screen.getByLabelText(/Close/i));

    await waitForElementToBeRemoved(() =>
      screen.queryByText('Error on consent save')
    );

    // This is also not working
    // Warning: You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one.
    // await waitFor(() => {
    //   expect(screen.findByText('Error on consent save')
    //   ).not.toBeInTheDocument()
    // });
  });
});
