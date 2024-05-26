"use client";
import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Box, Button, Modal, Typography, IconButton, Stack } from "@mui/joy";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { AllElementsByCategory } from "./Constants/defaultComponent";

export default class LayoutCanvas extends React.Component {
  static defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {},
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: generateLayout() },
    //
    confirmExit: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l, i) {
      return (
        <Box
          key={i}
          className={l.static ? "static" : ""}
          sx={{
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <>
              <span className="text">{i}</span>
              {l.component} {/* Render the elementToRender component */}
            </>
          )}
        </Box>
      );
    });
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onCompactTypeChange = () => {
    const { compactType: oldCompactType } = this.state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    this.setState({ compactType });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  onNewLayout = () => {
    this.setState({
      layouts: { lg: generateLayout() },
    });
  };

  //CREATE:
  //--create a new layout element on drop in the same highlighted area that is visible on Drop
  createNewElementOnDrop = (layout, layoutItem, _event) => {
    const { x, y, w, h, componentElement } = layoutItem;
    const elementToRender = componentElement;

    console.log("Creating a new element on drop", layoutItem);

    const newLayoutItem = {
      x: x,
      y: y,
      w: 6,
      h: 3,
      i: "n" + new Date().getTime(),
      component: elementToRender, // Pass the elementToRender as the component prop
    };

    this.setState({
      layouts: {
        lg: layout.concat(newLayoutItem),
      },
    });
  };

  onDrop = (layout, layoutItem, _event) => {
    this.createNewElementOnDrop(layout, layoutItem, _event);
  };

  //NAVIGATION
  handleNavigation = (event, path) => {
    event.preventDefault();
    const router = useRouter();
    router.push(path);
  };

  //--Go back to Components using history
  handleGoBack = (event) => {
    event.preventDefault();
    const router = useRouter();
    router.back();
  };

  //SUB COMPONENTS
  EditorHeader = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: "0.7rem",
          px: "0.5rem",
          backgroundColor: "var(--joy-palette-neutral-800)",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="solid"
            color="danger"
            size="sm"
            startDecorator={
              <Icon
                icon="fluent:arrow-exit-20-regular"
                height={25}
                width={25}
              />
            }
            onClick={() => {
              this.setState({ confirmExit: true });
            }}
          >
            Exit
          </Button>

          <Typography level="title-md">Layout Editor</Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="solid"
            color="primary"
            size="sm"
            startDecorator={<Icon icon="fluent:save-20-regular" />}
            onClick={(event) => this.handleNavigation(event, "/editor")}
          >
            Save
          </Button>

          <IconButton
            size="md"
            onClick={(event) => {
              console.log("Clicked on the settings button");
            }}
          >
            <Icon icon="fluent:settings-20-regular" height={23} width={23} />
          </IconButton>
        </Stack>
      </Box>
    );
  };

  //--Render the Component Element

  render() {
    return (
      <>
        <this.EditorHeader />
        <div
          style={{
            height: "100%",
            overflow: "hidden",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f0f0f0",
          }}
        >
          <ResponsiveReactGridLayout
            {...this.props}
            layouts={this.state.layouts}
            onBreakpointChange={this.onBreakpointChange}
            onLayoutChange={this.onLayoutChange}
            onDrop={this.onDrop}
            // WidthProvider option
            measureBeforeMount={false}
            // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
            // and set `measureBeforeMount={true}`.
            useCSSTransforms={this.state.mounted}
            compactType={this.state.compactType}
            preventCollision={!this.state.compactType}
            isDroppable={true}
          >
            {this.generateDOM()}
          </ResponsiveReactGridLayout>
        </div>

        <Modal
          open={this.state.confirmExit}
          onClose={() => {
            this.setState({ confirmExit: false });
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "200px",
              backgroundColor: "white",
              padding: "1rem",
            }}
          >
            <Typography level="title-md">
              Are you sure you want to exit?
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="solid"
                color="primary"
                size="sm"
                onClick={() => {
                  this.setState({ confirmExit: false });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="solid"
                color="primary"
                size="sm"
                onClick={(event) => {
                  this.handleGoBack(event);
                }}
              >
                Exit
              </Button>
            </Stack>
          </Box>
        </Modal>
      </>
    );
  }
}

function generateLayout() {
  return _.map(_.range(0, 25), function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;

    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
      //component element
      component: item.componentElement,
    };
  });
}
