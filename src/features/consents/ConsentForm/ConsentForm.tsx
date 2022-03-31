import React, { FormEvent, useEffect } from 'react';
import styles from './ConsentForm.module.scss';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Snackbar,
  Stack,
  styled,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { addConsent, setAddConsentStatus } from '../consentSlice';

interface ConsentFormProps {}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ConsentForm: React.FC<ConsentFormProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };

  const [email, setEmail] = React.useState('');
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const addConsentSelector: string = useSelector(
    (state: any) => state.consent.addStatus
  );
  useEffect(() => {
    if (addConsentSelector === 'success') {
      navigate('/consents', { replace: true });
      dispatch(setAddConsentStatus('idle'));
    }
  }, [addConsentSelector]);

  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  const [newsletter, setNewsletter] = React.useState(false);
  const [ads, setAds] = React.useState(false);
  const [statistics, setStatistics] = React.useState(false);

  const handleCheckboxChange = (checkbox: string) => {
    if (checkbox === 'newsletter') {
      setNewsletter(!newsletter);
    } else if (checkbox === 'ads') {
      setAds(!ads);
    } else if (checkbox === 'statistics') {
      setStatistics(!statistics);
    }
  };

  useEffect(() => {
    if (newsletter || ads || statistics) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [newsletter, ads, statistics]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      addConsent({
        id: null,
        name: name,
        email: email,
        newsletter: newsletter,
        ads: ads,
        statistics: statistics,
      })
    );
  };

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => dispatch(setAddConsentStatus('idle'))}
      >
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => dispatch(setAddConsentStatus('idle'))}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={styles.ConsentForm} data-testid="ConsentForm">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Item>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                aria-describedby="name-helper-text"
                value={name}
                onChange={handleNameChange}
                required
              />
              <FormHelperText id="name-helper-text">
                We'll never share your name.
              </FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input
                id="email"
                type="email"
                aria-describedby="email-helper-text"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <FormHelperText id="email-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>
          </Item>
          <Item>
            I agree to:
            <br />
            <FormGroup className={styles.AlignItemsCenter}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleCheckboxChange('newsletter')}
                    checked={newsletter}
                    data-testid="newsletter"
                  />
                }
                label="Receive newsletter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleCheckboxChange('ads')}
                    checked={ads}
                    data-testid="ads"
                  />
                }
                label="Be shown targeted ads"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={() => handleCheckboxChange('statistics')}
                    checked={statistics}
                    data-testid="statistics"
                  />
                }
                label="Contribute to anonymous visit statistics"
              />
            </FormGroup>
          </Item>
          <Item>
            <Button variant="contained" type="submit" disabled={submitDisabled}>
              Give consent
            </Button>
          </Item>
        </Stack>
      </form>
      <Snackbar
        open={addConsentSelector === 'failed'}
        message="Error on consent save"
        action={action}
      />
    </div>
  );
};

export default ConsentForm;
