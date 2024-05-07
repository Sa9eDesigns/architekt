*Development Notes*
## Accounts and Authentication
*Overview*
Architekt uses an Organization based account system. Here are the main components of the system:

- **Organization**: An organization is an entity that can have multiple users and projects. An organization is the top level entity in the system. It is mandatory to have an organization to use the system. The organization is created and managed by the organization owner, who is the first user of the organization.

- **User**: A user is a person who can access the system. A user can be a member of one or more organizations. A user can have different roles in different organizations. A user can be an owner, admin, or member of an organization. A user can also be a member of multiple organizations.

- **Role**: A role defines the permissions a user has in an organization. A user can have different roles in different organizations. The Default roles are
  - **Owner**: The owner is the user who created the organization. The owner has full control over the organization. The owner can add or remove users, change roles, and delete the organization.
  - **Admin**: An admin is a user who has full control over the organization except for deleting the organization. An admin can add or remove users, change roles, and manage projects.
  - **Member**: A member is a user who has limited access to the organization. A member can view projects and create projects. A member cannot add or remove users or change roles. Furthermore an **Owner** or **Admin** can can create Sub-roles for a **Member** to have more granular control over the permissions.
  - **Guest**: A guest is a user who has read-only access to the organization. A guest can only view projects and cannot create or modify projects.

- **Project**: A project is the main entity in the system. A project is created by a user with the **Owner** or **Admin** role. The **Owner** or **Admin** can add **Members** or **Guests** to the project. A project can have multiple users Whose capabilities are determined by their assigned sub-roles.

- **Sub-Role**: A sub-role is a set of permissions that can be assigned to a **Member**. A sub-role can be created by an **Owner** or **Admin** of an organization. A sub-role can be assigned to a **Member** of an organization to give them more granular control over the capabilities they have while working on a project. 
 ~ Example: The **Owner** or **Admin** creates a sub-role called **Developer** and assigns it to a **Member**. The **Developer** sub-role defines the capabilities a **Member** has while working on a project such as CRUD operations on the on the sub-entity of a project like a *Component* or *Page*.

*To Know more about Projects - refer to [Projects](./projects.md)*

## Database Schema
The database schema for the accounts and authentication system is as follows:
```sql
create table
  role (
    role_id bigint primary key generated always as identity,
    name text not null
  );

-- Insert default roles
insert into
  role (role_id, name)
values
  (default, 'Owner'),
  (default, 'Admin'),
  (default, 'Member'),
  (default, 'Guest');

-- Create User Table
create table
  "user" (
    user_id bigint primary key generated always as identity,
    username text unique not null,
    email text unique not null,
    password_hash varchar(255) not null,
    role_id bigint,
    foreign key (role_id) references role (role_id)
  );

-- Create Session Table
create table
  session (
    session_id bigint primary key generated always as identity,
    user_id bigint,
    token varchar(255) not null,
    expiration_date timestamp with time zone not null,
    foreign key (user_id) references "user" (user_id)
  );

-- Create Password_Reset Table
create table
  password_reset (
    reset_id bigint primary key generated always as identity,
    user_id bigint,
    reset_token varchar(255) not null,
    expiration_date timestamp with time zone not null,
    foreign key (user_id) references "user" (user_id)
  );

-- Create Organization Table
create table
  organization (
    organization_id bigint primary key generated always as identity,
    name text not null
  );

-- Create Project Table
create table
  project (
    project_id bigint primary key generated always as identity,
    name text not null,
    organization_id bigint,
    creator_id bigint,
    foreign key (organization_id) references organization (organization_id),
    foreign key (creator_id) references "user" (user_id)
  );

-- Create Sub_Role Table
create table
  sub_role (
    sub_role_id bigint primary key generated always as identity,
    name text not null,
    permissions varchar(255)
  );

-- Create Project_Member Table (Many-to-Many relationship)
create table
  project_member (
    project_id bigint,
    user_id bigint,
    sub_role_id bigint,
    primary key (project_id, user_id),
    foreign key (project_id) references project (project_id),
    foreign key (user_id) references "user" (user_id),
    foreign key (sub_role_id) references sub_role (sub_role_id)
  );

```
Heres a brief description of the tables:
The **users** table has a foreign key to the **organizations** table, which means each user belongs to an organization. The **user_roles** table is a junction table that associates **users** with roles.

The **sub_roles** table has a foreign key to the **organizations** table, which means each sub-role belongs to an organization. The user_sub_roles table is a junction table that associates **users** with sub-roles.

### The "God" Username and "Developer" Role
The system has a special user called the with the username "god" and the role "Developer". This user is known as **GOD**. ("Praise be to GOD"). 🙏🏾
** THE COMMANDMENTS OF THE GOD USER **
- The **GOD** user has full access to all Entities in the system. 
- The **GOD** user can create, update, delete, and view all entities in the system.
- The **GOD** user is the first user of the system and is created when the system is initialized. Furthermore, a system can have only one **GOD** user.
- The **GOD** user boasts a special role called "Developer" is not Granted to any other user in the system.
- **GOD's** Identity is known by the username "god" and the role "Developer". 
- **GOD's** is Defined and Protected by Database Constraints and cannot be changed or deleted.
- **GOD's** existance is persistent and eternal. if God is deleted, a database trigger will recreate the **GOD**
- To Summarize, All of "Architekt" is under the control of **GOD**. 
- **GOD's** account details are stored in the `.env` 

*God Query*
```sql
-- Add a column `is_god` to the User table:
   ALTER TABLE "user" ADD COLUMN is_god BOOLEAN DEFAULT FALSE;
   

-- Update the Role table to include the "Developer" role:
   INSERT INTO Role (role_id, name) VALUES (default, 'Developer');
   

-- Ensure constraints to enforce uniqueness of **GOD** user and immutability:
   ALTER TABLE "user" ADD CONSTRAINT check_single_god_user CHECK (is_god);
   

-- Implement a database trigger to recreate **GOD** user if deleted:
   CREATE OR REPLACE FUNCTION recreate_god_user()
   RETURNS TRIGGER AS
   $$
   BEGIN
       -- Code to recreate GOD user
       RETURN NEW;
   END;
   $$
   LANGUAGE plpgsql;

   CREATE TRIGGER recreate_god_trigger
   AFTER DELETE ON "user"
   FOR EACH ROW
   WHEN (OLD.is_god)
   EXECUTE FUNCTION recreate_god_user();

```