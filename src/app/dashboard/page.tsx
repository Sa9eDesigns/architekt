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
import { Skeleton } from '@mui/joy';
import { useAction } from 'next-safe-action/hooks';
import { getProjects } from '@/actions/Project';

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
        <React.Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsGrid projects={[]} />
        </React.Suspense>
      </Grid>


    </Sheet>
  );
}

const ProjectsSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
          <Skeleton variant="rectangular" height={200} />
        </Grid>
      ))}
    </Grid>
  );
};


//PROJECTS GRID
interface I_ProjectsGridProps {
  projects: {
    id: number;
    title: string;
    description: string;
    image: string;
  }[];
}

interface P {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ProjectsGrid: React.FC<I_ProjectsGridProps> = ({ projects }) => {
  return (
    <Grid container spacing={2}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
          {/* <ProjectGridItem project={project as P} /> */}
        </Grid>
      ))}
    </Grid>
  );
};
