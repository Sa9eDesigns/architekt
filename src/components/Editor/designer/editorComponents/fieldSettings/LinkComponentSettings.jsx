import { Icon } from "@iconify/react";
import React from "react";
import { Box, Divider, Input, Option, Select, Switch, ToggleButtonGroup, Typography, Button as JButton, Stack } from "@mui/joy";
import PagesApi from "src/dashboard/modules/pages/PagesApi";

//LINK / NAVIGATION SETTINGS
const LinkComponentSettings = ({ onSettingsChange, settings }) => {

  //CONSTANTS
  const linkTypes = [
    {
      id: "url",
      name: "URL",
      icon: "carbon:link",
      value: "url",
    },
    {
      id: "page",
      name: "Page",
      icon: "carbon:page-scroll",
      value: "page",
    },
  ];

  //STATES
  const [linkType, setLinkType] = React.useState("url");
  const [selectedPage, setSelectedPage] = React.useState(null);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [selectedDynamic, setSelectedDynamic] = React.useState(null);
  //choices
  const [pages, setPages] = React.useState([]);
  const [sections, setSections] = React.useState([]);
  //selected values
  const [linkSettings, setLinkSettings] = React.useState({});

  //HANDLERS
  //get all available pages to choose from
  const getAllPages = () => {
    PagesApi.getAll()
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  //EFFECTS
  //--set initial settings
  React.useEffect(() => {
    setLinkSettings(settings);
  }, [settings]);

  //--get all pages when link type is page
  React.useEffect(() => {
    if (linkType === "page") {
      getAllPages();
    }
  }, [linkType]);

  //--update link settings when settings change
  React.useEffect(() => {
    onSettingsChange(linkSettings);
  }, [linkSettings]);
  

  //COMPONENTS
  const UrlLinkSettings = ({ url, openInNewTab, noFollow }) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        <Typography level="title-sm">URL</Typography>
        <Input
          size="sm"
          placeholder="URL"
          value={url}
          onChange={(e) => {
            setLinkSettings((settings) => (settings.url = e.target.value));
          }} />

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">

        <Typography level="title-sm">Open in New Tab</Typography>
        <Switch
          checked={openInNewTab}
          onChange={(e) => {
            setLinkSettings((settings) => (settings.openInNewTab = e.target.checked));
          }} />
          </Stack>

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">

        <Typography level="title-sm">No Follow</Typography>
        <Switch
          checked={noFollow}
          onChange={(e) => {
            setLinkSettings((settings) => (settings.noFollow = e.target.checked));
          }} />
          </Stack>

      </Box>
    );
  };

  const PageLinkSettings = ({ selectedPage, openInNewTab, noFollow }) => {

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 1,
        }}
      >
        <Typography level="title-sm">Page</Typography>
        <Select
          size="sm"
          value={selectedPage}
          onChange={(e, value) => {
            setLinkSettings((settings) => (settings.page = value));
          }}
        >
          {pages.map((page, index) => (
            <Option key={index} value={page.id}>{page.title}</Option>
          ))}
        </Select>

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">

        <Typography level="title-sm">Open in New Tab</Typography>
        <Switch
          checked={openInNewTab}
          onChange={(e) => {
            setLinkSettings((settings) => (settings.openInNewTab = e.target.checked));
          }} />
          </Stack>

        <Divider />

        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">

        <Typography level="title-sm">No Follow</Typography>
        <Switch
          checked={noFollow}
          onChange={(e) => {
            setLinkSettings((settings) => (settings.noFollow = e.target.checked));
          }} />
          </Stack>

      </Box>
    );
  };

  //RETURN
  return (
    <>
      <ToggleButtonGroup
      buttonFlex={1}
        value={linkType}
        exclusive
        onChange={(e, value) => {
          setLinkType(value);
        }}
      >
        {linkTypes.map((type, index) => (
          <JButton
            key={index}
            value={type.value}
            sx={{
              padding: "10px",
              borderRadius: 0,
            }}
          >
            <Icon icon={type.icon} />
            {type.name}
          </JButton>
        ))}
      </ToggleButtonGroup>

      {linkType === "url" && (
        <UrlLinkSettings
          url={settings?.url}
          openInNewTab={settings?.openInNewTab}
          noFollow={settings?.noFollow} />
      )}

      {linkType === "page" && (
        <PageLinkSettings
          selectedPage={settings?.page}
          openInNewTab={settings?.openInNewTab}
          noFollow={settings?.noFollow} />
      )}

    </>
  );
};

export default LinkComponentSettings;
