import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConsentTable from './ConsentTable';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { testConsents } from '../../../mocks/handlers';

describe('<ConsentTable />', () => {
  test('it should mount', async () => {
    render(
      <Provider store={store}>
        <ConsentTable />
      </Provider>
    );

    // const consentTable = screen.getByTestId('ConsentTable');
    const consentTable = screen.getByRole('table');
    expect(consentTable).toBeInTheDocument();

    expect(await screen.findByText(testConsents[0].name)).toBeInTheDocument();
  });
});
