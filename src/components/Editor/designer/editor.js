import React, { useState, useContext, useEffect } from "react";
//craft-js
import { Frame, Element } from "@craftjs/core";
//editor components
import Text from "./editorComponents/Text";
import Toolbar from "./components/Toolbar";
import ToolOptions from "./components/ToolOptions";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Dropdown,
  Grid,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  ToggleButtonGroup,
  Typography,
} from "@mui/joy";
import FlexContainer from "./editorComponents/Resizer";
import EditorViewport from "./editorComponents/EditorViewport";
import { Icon } from "@iconify/react";
import { EditorContext } from "./context/EditorContext";
import { useEditor } from "@craftjs/core";
import { AppBar, Dialog } from "@mui/material";
import lz from "lzutf8";
import { useLocation, useNavigate } from "react-router-dom";
import PagesApi from "../PagesApi";
import _ from "lodash";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

export default function PageEditor() {
  //NAVIGATION
  const navigate = useNavigate();
  const location = useLocation();

  //CRAFT-JS
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  //STATES
  const [deviceType, setDeviceType] = useState("desktop");
  const [isSaving, setSaving] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //Page Settings
  const [openPageSettings, setOpenPageSettings] = useState(false);
  //Components and Toolbars
  const [toolDrawerOpen, setToolDrawerOpen] = useState(false);
  //Content
  const [pageContent, setPageContent] = useState("");
  //dialog
  const [openExitDialog, setOpenExitDialog] = useState(false);
  const [startOverDialog, setStartOverDialog] = useState(false);

  //CONTEXT
  const { sidebarOpen, currentTab, handleSidebarVisibility, handleCurrentTab } =
    useContext(EditorContext);

  //FUNCTIONS
  function handleResize(e, value) {}

  function handleEditorPreview() {
    console.log("Preview Editor Content");
  }

  async function handleEditorSave() {
    console.log("Saving Editor");

    const rawPage = query.serialize();
    const compressedPage = lz.encodeBase64(lz.compress(rawPage));
    const pageId = location.pathname.split("/").pop();

    //Save the page content to the State
    setPageContent(compressedPage);

    //create a page object
    const pageData = {
      id: pageId,
      content: compressedPage,
    };

    setSaving(true);

    PagesApi.update(pageData)
      .then((res) => {
        console.log(res.data);
        setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        setSaving(false);
        setIsError(true);
      });
  }

  async function handleExit() {
    navigate("/dashboard/pages");
  }

  async function handleEditorLoad() {
    setLoading(true);
    setIsError(false);

    const pageId = location.pathname.split("/").pop();

    PagesApi.getSingle(pageId)
      .then((res) => {
        const pageData = res.data;
        const decompressedPage = lz.decompress(
          lz.decodeBase64(pageData.page_content)
        );
        //actions.deserialize(decompressedPage);
        setPageContent(decompressedPage);
        setLoading(false);

        console.log("Page Content Loaded");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setIsError(true);
      });
  }

  function handleStartOver() {
    console.log("Starting Over");
    //Clear the Page Content
    setPageContent("");
    //Set the Loading State
    setLoading(false);
    //Set the Error State
    setIsError(false);
    //Close the Dialog
    setStartOverDialog(false);
  }

  //EFFECTS
  //--on Load - Fetch the Page Content
  useEffect(() => {
    handleEditorLoad();
  }, []);

  //RENDER
  return (
    <>
      {/* CONTENT */}
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <motion.div
            //3D Rotate on the X axis with a 360deg rotation, Looping
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 360 }}
            transition={{ duration: 0.8, loop: Infinity }}
          >
            <img
              src="/soimagine/logo.svg"
              alt="SoImagine Logo"
              width="100"
              height="auto"
            />
          </motion.div>

          <Typography level={"h4"} color={"text"} sx={{ mt: 5 }}>
            {
              //Show Error Message if we encounter an error while fetching the page content
              isError
                ? "An Error Occurred While Fetching Page Content"
                : "Loading Page Content..."
            }
          </Typography>

          {
            /*Show a Retry Button if we encounter an error*/
            isError && (
              <>
                <Button
                  variant="soft"
                  color="primary"
                  size="sm"
                  sx={{ mt: 2 }}
                  onClick={handleEditorLoad}
                >
                  Retry
                </Button>
              </>
            )
          }
        </Box>
      ) : isError ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <motion.div
            //3D Rotate on the X axis with a 360deg rotation, Looping
            initial={{ rotateX: 0 }}
            animate={{ rotateX: 360 }}
            transition={{ duration: 0.8, loop: Infinity }}
          >
            <img
              src="/soimagine/logo.svg"
              alt="SoImagine Logo"
              width="100"
              height="auto"
            />
          </motion.div>

          <Typography level={"h4"} color={"text"} sx={{ mt: 5 }}>
            {
              //Show Error Message if we encounter an error while fetching the page content
              isError
                ? "An Error Occurred While Fetching Page Content"
                : "Loading Page Content..."
            }
          </Typography>

          {
            /*Show a Retry Button if we encounter an error*/
            isError && (
              <>
                <Button
                  variant="solid"
                  color="error"
                  size="sm"
                  sx={{ mt: 2 }}
                  onClick={handleEditorLoad}
                >
                  Retry
                </Button>

                <Button
                  variant="solid"
                  color="error"
                  size="sm"
                  sx={{ mt: 2 }}
                  onClick={handleStartOver}
                >
                  ReDesign
                </Button>
              </>
            )
          }
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Grid
            container
            sx={{
              flex: 1,
              height: "100%",
            }}
          >
            {/*Sidebar*/}
            <Grid item xs={12} md={2}>
              <Toolbar />
            </Grid>

            {/*Main Content*/}
            <Grid
              item
              xs={12}
              md={7.5}
              sx={{
                borderLeft: "1px solid var(--joy-palette-divider)",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                height: "100vh",
              }}
            >
              <AppBar
                elevation={0}
                position="static"
                style={{
                  width: "100%",
                  height: "auto",
                  padding: "5px",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={2}>
                    <Button
                      size="sm"
                      variant="plain"
                      color="primary"
                      onClick={() => setOpenExitDialog(true)}
                    >
                      <Icon
                        icon="akar-icons:arrow-left"
                        width="24"
                        height="24"
                      />
                    </Button>
                  </Stack>

                  <ToggleButtonGroup
                    variant={"soft"}
                    value={deviceType}
                    exclusive
                    onChange={handleResize}
                    aria-label="device type"
                  >
                    <Button size="sm" value="desktop">
                      <Icon
                        icon="material-symbols:desktop-mac-outline"
                        width="24"
                        height="24"
                      />
                    </Button>

                    <Button size="sm" value="tablet">
                      <Icon
                        icon="material-symbols:tablet-mac"
                        width="24"
                        height="24"
                      />
                    </Button>

                    <Button size="sm" value="mobile">
                      <Icon
                        icon="material-symbols:phone-android-rounded"
                        width="24"
                        height="24"
                      />
                    </Button>
                  </ToggleButtonGroup>

                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="sm"
                      onClick={handleEditorPreview}
                    >
                      Preview
                    </Button>
                    <Button
                      variant="solid"
                      color="success"
                      size="sm"
                      onClick={handleEditorSave}
                    >
                      {isSaving && (
                        <Icon
                          icon="svg-spinners:eclipse"
                          width="24"
                          height="24"
                        />
                      )}

                      {isSaving ? "Saving..." : "Save"}
                    </Button>

                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: { variant: "outlined", color: "neutral" },
                        }}
                      >
                        <Icon
                          icon="akar-icons:more-vertical"
                          width="24"
                          height="24"
                        />
                      </MenuButton>
                      <Menu placement="bottom-end">
                        <MenuItem>
                          <ListItemDecorator>
                            <Icon
                              icon="material-symbols:code"
                              width="24"
                              height="24"
                            />
                          </ListItemDecorator>{" "}
                          View Code
                        </MenuItem>
                        <MenuItem disabled>
                          <ListItemDecorator />
                          Draft post
                        </MenuItem>
                        <ListDivider />
                        <MenuItem
                          variant="soft"
                          onClick={() => setStartOverDialog(true)}
                        >
                          <ListItemDecorator sx={{ color: "inherit" }}>
                            <Icon
                              icon="material-symbols:refresh"
                              width="24"
                              height="24"
                            />
                          </ListItemDecorator>{" "}
                          Start Over
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </Stack>
                </Stack>
                {/*page settings*/}
              </AppBar>

              <Frame>
                <Element is={EditorViewport} canvas id="page">
                  <Text content="Enter Text Here" />
                </Element>
              </Frame>

              {/*App bar for the message input area and Special Functions (e.g. Model, Upload, etc.) */}
            </Grid>

            {/*Right Sidebar*/}
            <Grid
              item
              xs={12}
              md={2.5}
              sx={{
                borderLeft: "1px solid var(--joy-palette-divider)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  width: "100%",
                  height: "100vh",
                  overflow: "hidden",
                }}
              >
                <ToolOptions />
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {
        /* Page Settings Dialog */
        <Dialog
          variant="persistent"
          open={openPageSettings}
          onClose={() => setOpenPageSettings(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
          sx={{
            padding: 10,
            maxWidth: "sm",
            width: "100%",
            margin: "auto",
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Page Settings"}</DialogTitle>

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          ></DialogContent>
        </Dialog>
      }

      {/* Start Over Dialog */}
      <Modal
        open={startOverDialog}
        onClose={() => setStartOverDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        sx={{
          padding: 10,
          maxWidth: "sm",
          width: "100%",
          margin: "auto",
        }}
      >
        <ModalDialog>
          <DialogTitle id="alert-dialog-title">
            {"Discard Changes?"}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="text">
              Are you sure you want to start over and discard all changes?
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setStartOverDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleStartOver()} color="primary" autoFocus>
              Start Over
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      {/* Exit Dialog */}
      <Dialog
        open={openExitDialog}
        onClose={() => setOpenExitDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
        sx={{
          padding: 10,
          maxWidth: "sm",
          width: "100%",
          margin: "auto",
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Discard Changes?"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="text">
            Are you sure you want to exit without saving your changes?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenExitDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExit} color="primary" autoFocus>
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
