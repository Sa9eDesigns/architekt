import React from "react";
import {
  Box,
  Card,
  CardOverflow,
  Dropdown,
  IconButton,
  Menu,
  MenuItem,
  MenuButton,
  AspectRatio,
  Typography,
} from "@mui/joy";
import { ProjectItem } from "@/types/projects";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const ProjectGridItem: React.FC<{ project: ProjectItem }> = ({ project }) => {

  //CONSTANTS
  const router = useRouter();

  //FUNCTIONS
  const handleOpenProject = () => {
    console.log("Opening project", project.id);
    router.push(`/dashboard/project/${project.id}`);
  }
  
  return (
    <Card variant="outlined" size="sm">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">{project.name}</Typography>
            <Typography level="body-sm">{project.description}</Typography>
          </Box>
          <Dropdown>
            <MenuButton
              variant="plain"
              size="sm"
              sx={{
                maxWidth: "32px",
                maxHeight: "32px",
                borderRadius: "9999999px",
              }}
            >
              <IconButton
                component="span"
                variant="plain"
                color="neutral"
                size="sm"
              >
                <Icon icon="heroicons:ellipsis-vertical-solid" />
              </IconButton>
            </MenuButton>
            <Menu
              placement="bottom-end"
              size="sm"
              sx={{
                zIndex: "99999",
                p: 1,
                gap: 1,
                "--ListItem-radius": "var(--joy-radius-sm)",
              }}
            >
              <MenuItem
                onClick={handleOpenProject}
              >
                <Icon icon="heroicons:document-text" />
                Open Project
              </MenuItem>
              <MenuItem>
                <Icon icon="heroicons:share" />
                Share
              </MenuItem>
              <MenuItem sx={{ textColor: "danger.500" }}>
                <Icon icon="heroicons:trash" color="--var(danger-500)"/>
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        </Box>
        <CardOverflow
          sx={{
            borderBottom: "1px solid",
            borderTop: "1px solid",
            borderColor: "neutral.outlinedBorder",
          }}
        >
          <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
            <img
              alt=""
              src="/images/project_placeholder.png"
              srcSet="/images/project_placeholder.png 2x"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="body-xs">{project.template.name}</Typography>
      </Card>
  );
};

export default ProjectGridItem;