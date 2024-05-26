'use client';

import React, {useCallback, useMemo, useState} from "react";
import { BaseComponent } from "../BaseComponent";
import { Element, useNode } from "@craftjs/core";
//import { SectionSettings } from "./SectionSettings";
import LayoutSettings from "@/components/Editor/EditorProperties/LayoutSettings"
import TypographySettings from "@/components/Editor/EditorProperties/TypographySettings";
import BackgroundSettings from "@/components/Editor/EditorProperties/BackgroundSettings";
import { Action } from "@/types/types";
import { Button, ToggleButtonGroup } from "@mui/joy";
import { Icon } from "@iconify/react";


export type T_SectionProps = {
  background?: Record<"r" | "g" | "b" | "a", number>;
  color?: Record<"r" | "g" | "b" | "a", number>;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  fillSpace?: string;
  width?: string;
  height?: string;
  padding?: string[];
  margin?: string[];
  shadow?: number;
  radius?: number;
  children?: React.ReactNode;
};

export type T_SectionSettings = {
  actions: Action;
  settings : React.ReactNode;
  id : string;
  classes : string;
  layout : any;
  size: any;
  spacing: any;
  position: any;
  borders: any;
  background: any;
  effects: any;
  typography: any;
  onSettingsChange: any;
};


const defaultProps = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fillSpace: "no",
  padding: ["20", "20", "20", "20"],
  margin: ["10", "10", "10", "10"],
  background: { r: 249, g: 249, b: 249, a: 1 },
  color: { r: 0, g: 0, b: 0, a: 1 },
  shadow: 1,
  radius: 5,
  width: "100%",
  height: "auto",
};

export const Section = (props: T_SectionProps) => {
  props = {
    ...defaultProps,
    ...props,
  };
  const {
    flexDirection,
    alignItems,
    justifyContent,
    fillSpace,
    background,
    color,
    padding,
    margin,
    shadow,
    radius,
    children,
  } = props;
  return (
    <BaseComponent custom={{ displayName: "Section" }}>
      <div
        style={{
          display: "flex",
          justifyContent,
          flexDirection: flexDirection as any,
          alignItems,
          background: `rgba(${Object.values(background)})`,
          color: `rgba(${Object.values(color)})`,
          padding: `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`,
          margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
          boxShadow:
            shadow === 0
              ? "none"
              : `0px 3px 100px ${shadow}px rgba(0, 0, 0, 0.13)`,
          borderRadius: `${radius}px`,
          flex: fillSpace === "yes" ? 1 : "unset",
        }}
      >
        {children}
      </div>
    </BaseComponent>
  );
};


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


Section.craft = {
  displayName: "Section",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: ComponentSettings
  },
};

export default Section;
