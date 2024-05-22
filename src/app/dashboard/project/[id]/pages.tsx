"use client";

import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Header from "@/components/Dashboard/Header";
import { Grid, Stack } from "@mui/material";
import ProjectGridItem from "@/components/Project/ProjectItem";
import { Box, Container, Skeleton } from "@mui/joy";
import { useAction } from "next-safe-action/hooks";
import { getProjects } from "@/actions/Project";
import demoProjects from "@/demo/projects/projects";

export default function Components() {
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
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />

      {/* Header and Button */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: "100%",
          padding: "1rem",
        }}
      >
        <Typography level="title-lg">Pages</Typography>

        <Stack spacing={2} justifyContent={"flex-end"} direction={"row"}>
          <Button
            variant="soft"
            color="neutral"
            size="md"
            sx={{ minWidth: "100px" }}
          >
            New Page
          </Button>
        </Stack>
      </Stack>
    </Sheet>
  );
}
