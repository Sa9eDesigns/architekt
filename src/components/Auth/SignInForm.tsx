import { Icon } from "@iconify/react";
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
  Stack,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/joy";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { login } from "./actions";
import { InputField } from "../UI/FormFields/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//INTERFACE
interface IFormInput {
  email: string;
  password: string;
}

//YUP VALIDATION
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignInForm() {
  //HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Card>
      <Container>
        <Typography level="title-md">Sign In</Typography>
        <Divider />

        <Stack spacing={2}>
          <form onSubmit={handleSubmit(onSubmit)}>

            <FormControl error={errors.email ? true : false}>
              <FormLabel>Email</FormLabel>
              <Input control={control} name="email" label="Email" />
              <FormHelperText>{errors.email?.message}</FormHelperText>
            </FormControl>


            <FormControl error={errors.password ? true : false}>
              <FormLabel>Password</FormLabel>
              <Input control={control} name="password" label="Password" />
              <FormHelperText>{errors.password?.message}</FormHelperText>
            </FormControl>

            <Button type="submit" variant="solid" color="primary">
              Sign In
            </Button>

          </form>
        </Stack>
      </Container>
    </Card>
  );
}
