import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MUITable from './MUITable';

import userEvent from '@testing-library/user-event';
import { MUITableRow } from '../../types/MUITableRow';

describe('<MUITable />', () => {
  const testPageSize = 2;

  test('it should mount empty table', () => {
    render(<MUITable columns={[]} rows={[]} pageSize={testPageSize} />);

    // getByTestId ist not really advised, but the React CLI generates the tests this way
    // const table = screen.getByTestId('MUITable');
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table).toMatchSnapshot();
  });

  test('it should mount paging table', () => {
    const testColumns = [
      { id: 'id', label: 'Id' },
      { id: 'testName', label: 'testName' },
    ];
    const testRows: MUITableRow[] = [
      { id: 0, testName: 'Test Name 0' },
      { id: 1, testName: 'Test Name 1' },
      { id: 2, testName: 'Test Name 2' },
    ];
    render(
      <MUITable columns={testColumns} rows={testRows} pageSize={testPageSize} />
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(testPageSize + 1);

    userEvent.click(screen.getByLabelText('Go to next page'));
    const secondPageRows = screen.getAllByRole('row');
    expect(secondPageRows).toHaveLength((testRows.length % testPageSize) + 1);

    userEvent.click(screen.getByLabelText('Go to previous page'));
    const backToFirstPageRows = screen.getAllByRole('row');
    expect(backToFirstPageRows).toHaveLength(testPageSize + 1);
  });
});
