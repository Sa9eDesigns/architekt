*developer notes*
# Projects
### What is a project?
In the context of this application, a project is the main entity that holds all the information about a project. it contains the following information:
*Basic Information*
- Organization: The organization that the project belongs to.
- Name: The name of the Application being developed.
- Description: A brief description of the project.
- Start Date: The date the project started.
- End Date: The date the project ended.
- Status: The status of the project. (Active, Completed, On Hold, Cancelled)
*Application Details and Source Code*
- Appliction: The application being developed.
- Directory: The directory where the source code is stored.
- Repository: The repository where the source code is stored.
*Project Team*
- Project Manager: The person responsible for managing the project.
- Developers: The developers working on the project.
- Guests: The guests who have access and can view the project.
*Project Progress*
- Progress: The progress of the project in percentage.
- Milestones: The milestones set for the project.
- Tasks: The tasks assigned to the project team.
- Issues: The issues faced during the project development.
- Notes: Any additional notes or information about the project.

### Application
The application is the software being developed as part of the project. To understand this better, let's analyze the Blank default Next.js application that is initialized when a new project is created. The application contains the following files and directories:

```
📦joy-ui-nextjs-ts
 ┣ 📂public
 ┃ ┗ 📜.gitkeep
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂sign-up
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜layout.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┗ 📂components
 ┃ ┃ ┗ 📂ThemeRegistry
 ┃ ┃ ┃ ┣ 📜EmotionCache.tsx
 ┃ ┃ ┃ ┣ 📜ThemeRegistry.tsx
 ┃ ┃ ┃ ┗ 📜theme.ts
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜next.config.mjs
 ┣ 📜package.json
 ┗ 📜tsconfig.json
```
As you can see, the application has a public directory, src directory, and some configuration files.
- The public directory contains static files that are served by the application.
- The src directory contains the source code of the application.
- The components directory contains reusable components that can be used across the application.

### 'app' Directory
The Architekt plaform makes full use of next.js's file-based routing system and also utilizes this structure to define and manage the application's pages. The 'app' directory is where the pages of the application are stored. Each page is a React component that represents a route in the application. For example, the 'sign-up' directory contains the 'page.tsx' file, which represents the sign-up page of the application.

### 'components' Directory
The 'components' directory contains reusable components that can be used across the application. These components are designed to be modular and can be easily reused in different parts of the application. For example, the 'ThemeRegistry' directory contains the 'EmotionCache.tsx', 'ThemeRegistry.tsx', and 'theme.ts' files, which define the theme registry component.

### Configuration Files
The configuration files are used to configure the application and define its behavior. For example, the 'next.config.mjs' file is used to configure the Next.js application, and the 'tsconfig.json' file is used to configure the TypeScript compiler.

Now that you have an understanding of what a project and application are, let's move on to the next section **Project Dashboard**

### Project Dashboard
The project dashboard is the main interface where you can view and manage a specific project. Here are the menu items available on the project dashboard:
- Blocks: refering back to the next.js file-based routing system, the blocks are the components that make up the project. Each block is a React component that represents a specific part of the project. Blocks are created with a no-code interface called the Architype Editor.
- Pages: The pages of the project are the routes that the user can navigate to. Each page is a React component that represents a specific route in the application. Pages are created with the Layout Editor.
- Data: The data of the project is the information that the application uses to render the user interface. Data is stored in a database and can be accessed and manipulated using the Data Editor.
- Themes: The themes of the project are the styles and design elements that define the look and feel of the application. Themes are created with the Theme Editor.
- Settings: The settings of the project are the configuration options that define the behavior of the application. Settings are configured using the Settings Editor.
- Files: The files of the project are the static assets that are served by the application. Files are stored in the public directory of the project.
- Source Code: The source code of the project is the code that defines the behavior of the application. Source code is stored in the src directory of the project.
- Repository: The repository of the project is the version control system that stores the source code of the application. The repository is hosted in a local git repository.
- Team: The team of the project is the group of people who are working on the project. The team members have different roles and permissions that define their access to the project.
- Progress: The progress of the project is the percentage of completion of the project. The progress is calculated based on the completion of milestones and tasks.
- Milestones: The milestones of the project are the goals that need to be achieved to complete the project. Milestones are created with the Milestone Editor.
- Tasks: The tasks of the project are the work items that need to be completed to achieve the milestones. Tasks are assigned to team members and tracked using the Task Editor.
- Issues: The issues of the project are the problems that need to be resolved to complete the project. Issues are tracked using the Issue Editor.
- Notes: The notes of the project are the additional information and comments that are related to the project. Notes are stored in the project dashboard and can be viewed by team members.
- Logs: The logs of the project are the records of the activities that have been performed on the project. Logs are stored in the project dashboard and can be viewed by team members.
- Notifications: The notifications of the project are the alerts that are sent to team members to inform them about important events related to the project. Notifications are sent via email and can be viewed in the project dashboard.
- Export: The export of the project is the process of exporting the project data and source code to a file or another location. The export is performed using the Export Editor.
- Delete: The delete of the project is the process of permanently removing the project data and source code from the system. The delete is performed using the Delete Editor.
- Help: The help of the project is the documentation and support resources that are available to assist team members with using the project. Help is provided in the project dashboard and can be accessed by team members.
- Feedback: The feedback of the project is the comments and suggestions that team members provide to improve the project. Feedback is collected in the project dashboard and can be used to enhance the project.