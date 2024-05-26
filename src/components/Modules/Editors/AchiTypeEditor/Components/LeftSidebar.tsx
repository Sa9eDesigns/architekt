import React, { useState } from "react";
import {
  Box,
  Button,
  ToggleButtonGroup,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/joy";
import { Icon } from "@iconify/react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { AllElementsByCategory } from "../Constants/defaultComponent";
import DragabbleComponentItem from "./ToolbarItem";
import { createPortal } from "react-dom";

// INTERFACES
interface ComponentProps {
  id?: string;
  name?: string;
  icon?: string;
  component?: React.ReactNode;
}

const LeftSidebar = () => {
  // STATES
  const [activeTab, setActiveTab] = useState("elements");
  const [activeComponent, setActiveComponent] = useState<ComponentProps | null>(
    null
  );

  // FUNCTIONS
  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string
  ) => {
    setActiveTab(newTab);
  };

  const handleDragStart = (event: any) => {
    const activeComponent = AllElementsByCategory.flatMap(
      (category) => category.components
    ).find((item) => item.id === event.active.id);
    setActiveComponent(activeComponent || null);
  };

  const handleDragEnd = () => {
    setActiveComponent(null);
  };

  // RENDER
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Box p={2} sx={{ width: "100%", height: "100%", overflowY: "auto" }}>
        <ToggleButtonGroup buttonFlex={1} orientation="horizontal" size="sm"
        sx={{
          marginBottom: "1rem",
        }}
        >
          <Button
            variant="solid"
            color="primary"
            size="sm"
            startDecorator={<Icon icon="fluent:layer-diagonal-add-20-filled" />}
            onClick={(event) => handleTabChange(event, "elements")}
          >
            Elements
          </Button>

          <Button
            variant="solid"
            color="primary"
            size="sm"
            startDecorator={<Icon icon="fluent:slide-layout-20-filled" />}
            onClick={(event) => handleTabChange(event, "layouts")}
          >
            Blocks
          </Button>
        </ToggleButtonGroup>

        {activeTab === "elements" && (
          <Box sx={{ padding: "0", overflowY: "auto", width: "100%" }}>
            {AllElementsByCategory.map((category) => (
              <Accordion key={category.id}>
                <AccordionSummary
                  expandIcon={<Icon icon="fluent:chevron-down-24-filled" />}
                >
                  <Typography level="title-md">{category.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "2px",
                      py: 2,
                    }}
                  >
                    {category.components.map((element) => (
                      <DragabbleComponentItem
                        key={element.id}
                        name={element.name}
                        icon={element.icon}
                        elementToRender={element.component}
                      />
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Box>

    </DndContext>
  );
};

export default LeftSidebar;
