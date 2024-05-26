const EditorElements = [
  {
    id: "layout",
    name: "Layout",
    description: "Layout elements like Sections and Containers.",
    items: [
      {
        id: "section",
        name: "Section",
        Icon: "material-symbols:layers",
        styles: [
          {
            id: "style-layout",
            name: "Layout",
            values: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: "style-background",
            name: "Background",
            values: {
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            },
          },
          {
            id: "style-border",
            name: "Border",
            values: {
              border: "1px solid #e5e7eb",
            },
          },
          {
            id: "style-spacing",
            name: "Spacing",
            values: {
              margin: "10px",
              padding: "10px",
            },
          },
        ],
      },
      {
        id: "container",
        name: "Container",
        Icon: "material-symbols:box",
        styles: [
          {
            id: "style-layout",
            name: "Layout",
            values: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            },
          },
          {
            id: "style-background",
            name: "Background",
            values: {
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            },
          },
          {
            id: "style-border",
            name: "Border",
            values: {
              border: "1px solid #e5e7eb",
            },
          },
          {
            id: "style-spacing",
            name: "Spacing",
            values: {
              margin: "10px",
              padding: "10px",
            },
          },
        ],
      },
      {
        id: "grid",
        name: "Grid",
        Icon: "fluent:grid-28-filled",
        styles: [
          {
            id: "style-layout",
            name: "Layout",
            values: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            },
          },
          {
            id: "style-background",
            name: "Background",
            values: {
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            },
          },
          {
            id: "style-border",
            name: "Border",
            values: {
              border: "1px solid #e5e7eb",
            },
          },
          {
            id: "style-spacing",
            name: "Spacing",
            values: {
              margin: "10px",
              padding: "10px",
            },
          },
        ],
      },
    ],
  },
];