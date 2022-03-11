import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ConsentForm from './ConsentForm';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { BrowserRouter } from 'react-router-dom';

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
});
