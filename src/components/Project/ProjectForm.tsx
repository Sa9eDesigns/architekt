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
  Textarea,
  Box,
} from "@mui/joy";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import defaultTemplates from "@/demo/projects/templates";
import React, { useState } from "react";

//FORM INPUT
type IFormInput = {
  projectName: string;
  description: string;
  template: {
    id: number;
    name: string;
    description: string;
    ui: string;
    template_src: string;
  }
  created_at: string;
};

export default function NewProjectForm() {

  //YUP SCHEMA
  const schema = yup.object().shape({
    projectName: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    template: yup.object().shape({
      id: yup.number().required(),
      name: yup.string().required(),
      description: yup.string().required(),
      ui: yup.string().required(),
      template_src: yup.string().required(),
    }),
    created_at: yup.string().required(),
  });

  //CONSTANTS
  const templates = defaultTemplates;

  //STATE
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  //FUNCTIONS
  const handleTemplateChange = (template: any) => {
    setSelectedTemplate(template);
  };

  //HOOK FORM
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: "",
      description: "",
      template: selectedTemplate,
      created_at: moment().toISOString()
    },
    
  });

  //

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Typography level="title-md">Sign In</Typography>
      <Divider />

      <Stack spacing={2}>
       <Controller
        name="projectName"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input {...field} />
            <FormHelperText>{errors.projectName?.message}</FormHelperText>
          </FormControl>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea {...field} minRows={3} maxRows={5}/>
            <FormHelperText>{errors.description?.message}</FormHelperText>
          </FormControl>
        )}
      />


      </Stack>
      <Divider />

      <Typography level="title-md">Select Template</Typography>
        <Divider />
        <Grid container spacing={2}>
          {templates.map((template) => (
            <Grid key={template.id}>
              <Card
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  p: 2,
                  borderRadius: "var(--joy-radius-md)",
                  borderColor: selectedTemplate.id === template.id ? "primary.main" : "transparent",
                }}
                onClick={() => handleTemplateChange(template)}
              >
                <Typography level="title-sm">{template.name}</Typography>
                <Typography level="body-sm">{template.description}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider />

        <Button 
          type="submit" 
          variant="solid" 
          size="lg" 
          color="primary" 
          fullWidth
        >
          {loading ? <CircularProgress size={"sm"} color="primary" /> : "Create Project"}
        </Button>
      </form>
    </Container>
  );
}
