import { Project, Organization, User } from "@/types/types";

const demoProjects: Project[] = [
  {
    id: "123",
    name: "Project 1",
    description: "This is a demo project",
    startdate: "2021-01-01",
    enddate: "2021-12-31",
    status: "active",
    organization: {
      id: "1234-1234-1234-1234-1234",
      name: "Organization 1",
      description: "This is a demo organization",
      owner: {
        id: 1,
        auth_uid: "yruo-rere-1234-5678-1234",
        email: "sa9esoftware@gmail.com",
        email_verified: true,
        phone_number: "01333223432",
        phone_number_verified: false,
        username: "sa9esoftware",
        password_hash: "password",
        created_at: "2021-06-01T14:00:00.000Z",
        updated_at: "2021-06-01T14:00:00.000Z",
        last_login: "2021-06-01T14:00:00.000Z",
      },
      members: [
        {
          id: 1,
          auth_uid: "yruo-rere-1234-5678-1234",
          email: "sa9esoftware@gmail.com",
          email_verified: true,
          phone_number: "01333223432",
          phone_number_verified: false,
          username: "sa9esoftware",
          password_hash: "password",
          created_at: "2021-06-01T14:00:00.000Z",
          updated_at: "2021-06-01T14:00:00.000Z",
          last_login: "2021-06-01T14:00:00.000Z",
        },
        {
          id: 1,
          auth_uid: "yruo-rere-1234-5678-1234",
          email: "sa9esoftware@gmail.com",
          email_verified: true,
          phone_number: "01333223432",
          phone_number_verified: false,
          username: "sa9esoftware",
          password_hash: "password",
          created_at: "2021-06-01T14:00:00.000Z",
          updated_at: "2021-06-01T14:00:00.000Z",
          last_login: "2021-06-01T14:00:00.000Z",
        },
      ],
      created_at: "2021-06-01T14:00:00.000Z",
    },
    template:{
      id: "1234-1234-1234-1234-1234",
      name: "Template 1",
      description: "This is a demo template",
      ui: "MUI",
      templateUrl: "/res/templates/joy-ui-nextjs-ts.zip",
    },
    application:{
        id: "1234-1234-1234-1234-1234",
        name: "Application 1",
        components:[

        ],
        pages:[
          
        ],
        database:{

        },
        dataModels:[

        ],
        theme:{
          
          colorPalette:{

          },

          typography:{

          },

          spacing:{

          },

          miscellaneous:{

          }
        }
        files
        settings
    }
  },
];
