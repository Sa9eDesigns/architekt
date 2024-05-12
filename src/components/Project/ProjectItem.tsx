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

const ProjectGridItem: React.FC<{ project: ProjectItem }> = ({ project }) => {
  return (
    <Card variant="outlined" size="sm">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ flex: 1 }}>
            <Typography level="title-md">{project.name}</Typography>
            <Typography level="body-sm">132.2MB</Typography>
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
              <MenuItem>
                <Icon icon="heroicons:document-text" />
                Rename file
              </MenuItem>
              <MenuItem>
                <Icon icon="heroicons:share" />
                Share file
              </MenuItem>
              <MenuItem sx={{ textColor: "danger.500" }}>
                <Icon icon="heroicons:trash" color="--var(danger-500)"/>
                Delete file
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
              src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format"
              srcSet="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=400&auto=format&dpr=2 2x"
            />
          </AspectRatio>
        </CardOverflow>
        <Typography level="body-xs">Added 27 Jun 2023</Typography>
      </Card>
  );
};
