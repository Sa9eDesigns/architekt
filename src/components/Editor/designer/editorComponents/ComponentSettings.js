import React, { useState, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useNode } from "@craftjs/core";
import {
  ToggleButtonGroup,
  Button,
  Box,
  Typography,
  Modal,
} from "@mui/joy";
import LayoutSettings from "./fieldSettings/LayoutSettings";
import TypographySettings from "./fieldSettings/TypographySettings";
import BackgroundSettings from "./fieldSettings/BackgroundSettings";

/* EDITOR SETTINGS */
export const ComponentSettings: React.FC = () => {
  // CRAFTS - NODE
  const {
    actions: { setProp },
    settings,
    id,
    classes,
    layout,
    size,
    spacing,
    position,
    borders,
    background,
    effects,
    typography,
  } = useNode((node) => ({
    settings: node.data.custom.settings,
    id: node.id,
    classes: node.data.props.classes,
    layout: node.data.props.layout,
    size: node.data.props.size,
    spacing: node.data.props.spacing,
    position: node.data.props.position,
    borders: node.data.props.borders,
    background: node.data.props.background,
    effects: node.data.props.effects,
    typography: node.data.props.typography,
  }));

  // COMPONENT STATES
  const [expanded, setExpanded] = useState<string | false>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  // COMPONENT HANDLERS
  const handleChange = useCallback(
    (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  //--handle Props Change
  const handleLayoutProps = useCallback(
    (prop: Partial<typeof layout>) => {
      setProp((props) => {
        props.layout = { ...props.layout, ...prop };
      });
    },
    [setProp]
  );

  const handleTypographyProps = useCallback(
    (prop: Partial<typeof typography>) => {
      setProp((props) => {
        props.typography = { ...props.typography, ...prop };
      });
    },
    [setProp]
  );

  const handleBackgroundProps = useCallback(
    (prop: string, value: any) => {
      setProp((props) => {
        props.background[prop] = value;
      });
    },
    [setProp]
  );

  const tabButtons = useMemo(
    () => [
      { value: 0, icon: "bi:card-text", ariaLabel: "content" },
      { value: 1, icon: "bi:aspect-ratio", ariaLabel: "layout" },
      { value: 2, icon: "bi:type", ariaLabel: "style" },
      { value: 3, icon: "bi:brush", ariaLabel: "background" },
      { value: 4, icon: "bi:border-all", ariaLabel: "borders" },
    ],
    []
  );

  return (
    <>
      {/*--Tab Buttons*/}
      <ToggleButtonGroup
        variant="outlined"
        size="sm"
        value={currentTab}
        exclusive
        buttonFlex={1}
        onChange={(e, value) => setCurrentTab(value)}
      >
        {tabButtons.map(({ value, icon, ariaLabel }) => (
          <Button
            key={value}
            fullWidth
            value={value}
            aria-label={ariaLabel}
            sx={{ borderRadius: "0px" }}
          >
            <Icon icon={icon} />
          </Button>
        ))}
      </ToggleButtonGroup>

      {currentTab === 0 ? (
        <>{settings}</>
      ) : currentTab === 1 ? (
        <LayoutSettings settings={layout} onSettingsChange={handleLayoutProps} />
      ) : currentTab === 2 ? (
        <TypographySettings
          settings={typography}
          onSettingsChange={handleTypographyProps}
        />
      ) : currentTab === 3 ? (
        <BackgroundSettings
          settings={background}
          onSettingsChange={handleBackgroundProps}
        />
      ) : null}
    </>
  );
};