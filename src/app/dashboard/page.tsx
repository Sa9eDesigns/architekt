import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import Header from '@/components/Dashboard/Header';
import { Grid, Stack } from '@mui/material';
import ProjectGridItem from '@/components/Project/ProjectItem';

export default function Dashboard() {

  //CONSTANTS
  
  //STATES
  

  //FUNCTIONS
  
  //HOOKS

  //RENDER
  return (
    <Sheet
      sx={{
        //display: 'flex',
        //flexFlow: 'row nowrap',
        //justifyContent: 'center',
        //alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
      }}
    >
      <Header />

      {/* Header and Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: '100%',
          padding: '1rem',
        }}
      >
        <Typography 
        level='title-lg'
        >
          Projects
        </Typography>

        <Stack spacing={2} justifyContent={'flex-end'} direction={'row'}>
          <Button
            variant="soft"
            color="neutral"
            size="lg"
            sx={{ minWidth: '100px' }}
          >
            New Project
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {
          projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <ProjectGridItem project={project} />
            </Grid>
          ))
        }
      </Grid>


    </Sheet>
  );
}
