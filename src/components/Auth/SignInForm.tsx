import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Divider,
  Input,
  TextField,
  Typography,
  Stack
} from '@mui/joy';
import { useForm } from 'react-hook-form';
import { login } from './actions';
import { InputField } from '../UI/FormFields/InputField';

export default function SignInForm() {
  const {
    register
  } = useForm();

  const onSubmit = async (data: FormData) => {
    await login(data);
  };

  return (
    <Card>
      <Container>
        <Typography level='title-md'>Sign In</Typography>
        <Divider />
        
        <Stack spacing={2}>
          <InputField
            id='email'
            name='email'
            label='Email'
            control={register}
          />
          <InputField
            id='password'
            name='password'
            label='Password'
            control={register}
          />
          <Button
            size='md'
            variant='solid'
            color='primary'
          >
            Sign In
          </Button>
        </Stack>
      </Container>
    </Card>
  );
}