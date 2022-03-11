import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import ConsentTable from './features/consents/ConsentTable/ConsentTable';
import {
	Container,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Stack,
	styled,
} from '@mui/material';
import {
	BrowserRouter as Router,
	Navigate,
	Routes,
	Route,
	Link as RouterLink,
	LinkProps as RouterLinkProps,
} from 'react-router-dom';
import ConsentForm from './features/consents/ConsentForm/ConsentForm';

interface ListItemLinkProps {
	to: string;
	primary: string;
}

/**
 * Renders router links into navigation button list.
 * This is React MUI boilerplate code.
 * @param props
 * @constructor
 */
function ListItemLink(props: ListItemLinkProps) {
	const { primary, to } = props;

	const renderLink = React.useMemo(
		() =>
			React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
				function Link(itemProps, ref) {
					return (
						<RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
					);
				}
			),
		[to]
	);
	return (
		<li>
			<ListItem button component={renderLink}>
				<ListItemText primary={primary} />
			</ListItem>
		</li>
	);
}

ListItemLink.propTypes = {
	icon: PropTypes.element,
	primary: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const App: React.FC = () => {
	return (
		<div className="App" data-testid="App">
			<Router>
				<Container>
					<Grid container spacing={3}>
						<Grid item xs={12} md={3}>
							<Paper elevation={0}>
								<List aria-label="navigation">
									<ListItemLink to="/give-consent" primary="Give consent" />
									<ListItemLink to="/consents" primary="Collected consents" />
								</List>
							</Paper>
						</Grid>
						<Grid item xs={12} md={9}>
							<Item className="Content">
								<Routes>
									<Route path="/" element={<Navigate to="/give-consent" />} />
									<Route path="/give-consent" element={<ConsentForm />} />
									<Route path="/consents" element={<ConsentTable />} />
								</Routes>
							</Item>
						</Grid>
					</Grid>
				</Container>
			</Router>
		</div>
	);
};

export default App;
