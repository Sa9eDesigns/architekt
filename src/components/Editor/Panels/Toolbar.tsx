// src/components/Toolbar/Toolbar.tsx
import React, { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  ToggleButtonGroup,
  Typography,
  accordionDetailsClasses,
  accordionSummaryClasses,
} from "@mui/joy";
import { useEditor } from "@craftjs/core";

const Toolbar: React.FC = () => {
  const { connectors } = useEditor();

  const [currentSidebarView, setCurrentSidebarView] = useState("components");
  const [expanded, setExpanded] = useState<string | false>("panel-0");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleCurrentSidebarView = (val: string) => {
    setCurrentSidebarView(val);
  };

  return (
    <Box
      sx={{
        width: "auto",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToggleButtonGroup
          buttonFlex={1}
          variant="soft"
          size="lg"
          spacing={0}
          sx={{
            "--ButtonGroup-radius": "0px",
            "--ButtonGroup-separatorSize": "0px",
            "--ButtonGroup-connected": "1",
            maxWidth: "100%",
            overflow: "auto",
            resize: "horizontal",
          }}
          orientation="horizontal"
          value={currentSidebarView}
          exclusive
          onChange={(ev, val) => {
            handleCurrentSidebarView(val);
          }}
          aria-label="current sidebar view"
        >
          <Button value="components" aria-label="components" fullWidth>
            <Icon icon="carbon:3d-software" width="100%" height="24" />
          </Button>

          <Button value="templates" aria-label="templates" fullWidth>
            <Icon icon="carbon:template" width="24" height="24" />
          </Button>

          <Button value="layoutTree" aria-label="layoutTree" fullWidth>
            <Icon icon="carbon:layers" width="24" height="24" />
          </Button>
        </ToggleButtonGroup>

        <Divider />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 3,
          }}
        >
          {currentSidebarView === "components" ? (
            <>
              <Accordion
                variant="outlined"
                size="lg"
                expanded={expanded === `panel-2`}
                onChange={handleChange(`panel-2`)}
                transition="0.2s"
                sx={{
                  maxWidth: 400,
                  [`& .${accordionSummaryClasses.button}:hover`]: {
                    bgcolor: "transparent",
                  },
                  [`& .${accordionDetailsClasses.content}`]: {
                    boxShadow: (theme) =>
                      `inset 0 1px ${theme.vars.palette.divider}`,
                    [`&.${accordionDetailsClasses.expanded}`]: {
                      paddingBlock: "0.75rem",
                    },
                  },
                }}
              >
                <AccordionSummary
                  aria-controls={`panel2-content`}
                  id={`panel2-header`}
                >
                  <Typography>Basic Elements</Typography>
                </AccordionSummary>
                <AccordionDetails variant="soft">
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  >
                    <ListItem
                      ref={(ref) =>
                        connectors.create(
                          ref,
                          <Text content="Enter Text Here" />
                        )
                      }
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          cursor: "pointer",
                          bgcolor: "primary.light",
                          color: "primary.contrastText",
                        },
                      }}
                    >
                      <ListItemDecorator>
                        <Icon icon="carbon:letter-aa" width="25" height="25" />
                      </ListItemDecorator>
                      <ListItemContent
                        primary="Text"
                        sx={{
                          textAlign: "flex-start",
                          "& MuiListItemText-primary": {
                            fontSize: "13px",
                            fontWeight: "bold",
                            color: "primary.light",
                          },
                        }}
                      />
                    </ListItem>
                    {/* Add more components here */}
                  </List>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded === `panel-1`}
                onChange={handleChange(`panel-1`)}
              >
                <AccordionSummary
                  aria-controls={`panel1-content`}
                  id={`panel1-header`}
                >
                  <Typography>Tables / Charts </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      display: "flex",
                      flexDirection: "column",
                      padding: 0,
                    }}
                  >
                    {/* Add more components here */}
                  </List>
                </AccordionDetails>
              </Accordion>
            </>
          ) : currentSidebarView === "layoutTree" ? (
            <></>
          ) : currentSidebarView === "templates" ? (
            <Sections />
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Toolbar;
