import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConsentForm from './ConsentForm';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';
import App from '../../../App';
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

    expect(
      await screen.findByText('Error on consent save')
    ).toBeInTheDocument();
  });
});
