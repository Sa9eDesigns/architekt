-- Projects Table
create table
  projects (
    id bigint primary key generated always as identity,
    name text not null,
    description text,
    organization text,
    start_date timestamp with time zone,
    end_date timestamp with time zone,
    status text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Applications Table
create table
  applications (
    id bigint primary key generated always as identity,
    project_id bigint references projects (id),
    name text not null,
    description text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Pages Table
create table
  pages (
    id bigint primary key generated always as identity,
    application_id bigint references applications (id),
    name text not null,
    route text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Components Table
create table
  components (
    id bigint primary key generated always as identity,
    application_id bigint references applications (id),
    name text not null,
    type text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Logic Flows Table
create table
  logic_flows (
    id bigint primary key generated always as identity,
    application_id bigint references applications (id),
    name text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Data Models Table
create table
  data_models (
    id bigint primary key generated always as identity,
    application_id bigint references applications (id),
    name text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Styling Themes Table
create table
  styling_themes (
    id bigint primary key generated always as identity,
    application_id bigint references applications (id),
    name text not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Project Team Table
create table
  project_team (
    id bigint primary key generated always as identity,
    project_id bigint references projects (id),
    project_manager text,
    developers text[],
    guests text[],
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Project Progress Table
create table
  project_progress (
    id bigint primary key generated always as identity,
    project_id bigint references projects (id),
    progress_percentage integer,
    milestones text[],
    tasks text[],
    issues text[],
    notes text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Roles Table
create table
  roles (
    id bigint primary key generated always as identity,
    name text not null unique,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Insert default roles
insert into
  roles (name)
values
  ('Owner'),
  ('Admin'),
  ('Member'),
  ('Guest');

-- Users Table with Supabase Authentication Integration
create table
  users (
    id bigint primary key generated always as identity,
    auth_uid uuid unique default gen_random_uuid (),
    email text unique,
    email_verified boolean default false,
    phone_number text,
    phone_number_verified boolean default false,
    username text,
    password_hash text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Session Table
create table
  sessions (
    id bigint primary key generated always as identity,
    user_id bigint references users (id),
    token text not null,
    expiration_date timestamp with time zone not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Password Reset Table
create table
  password_reset (
    id bigint primary key generated always as identity,
    user_id bigint references users (id),
    reset_token text not null,
    expiration_date timestamp with time zone not null,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Organization Table
create table
  organizations (
    id bigint primary key generated always as identity,
    name text not null unique,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Project Table
create table
  project (
    id bigint primary key generated always as identity,
    name text not null,
    organization_id bigint references organizations (id),
    creator_id bigint references users (id),
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Sub Role Table
create table
  sub_roles (
    id bigint primary key generated always as identity,
    name text not null,
    permissions text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );

-- Project Member Table (Many-to-Many relationship)
create table
  project_members (
    project_id bigint references project (id),
    user_id bigint references users (id),
    sub_role_id bigint references sub_roles (id),
    primary key (project_id, user_id),
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp
  );