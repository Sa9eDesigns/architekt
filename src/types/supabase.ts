export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string
          project_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          name: string
          project_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          name?: string
          project_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      components: {
        Row: {
          application_id: number | null
          created_at: string | null
          id: number
          name: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "components_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      data_models: {
        Row: {
          application_id: number | null
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "data_models_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      logic_flows: {
        Row: {
          application_id: number | null
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logic_flows_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          application_id: number | null
          created_at: string | null
          id: number
          name: string
          route: string | null
          updated_at: string | null
        }
        Insert: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          route?: string | null
          updated_at?: string | null
        }
        Update: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          route?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset: {
        Row: {
          created_at: string | null
          expiration_date: string
          id: number
          reset_token: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          expiration_date: string
          id?: never
          reset_token: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          expiration_date?: string
          id?: never
          reset_token?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "password_reset_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string | null
          creator_id: number | null
          id: number
          name: string
          organization_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: number | null
          id?: never
          name: string
          organization_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: number | null
          id?: never
          name?: string
          organization_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string | null
          project_id: number
          sub_role_id: number | null
          updated_at: string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          project_id: number
          sub_role_id?: number | null
          updated_at?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          project_id?: number
          sub_role_id?: number | null
          updated_at?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_sub_role_id_fkey"
            columns: ["sub_role_id"]
            isOneToOne: false
            referencedRelation: "sub_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_progress: {
        Row: {
          created_at: string | null
          id: number
          issues: string[] | null
          milestones: string[] | null
          notes: string | null
          progress_percentage: number | null
          project_id: number | null
          tasks: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          issues?: string[] | null
          milestones?: string[] | null
          notes?: string | null
          progress_percentage?: number | null
          project_id?: number | null
          tasks?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          issues?: string[] | null
          milestones?: string[] | null
          notes?: string | null
          progress_percentage?: number | null
          project_id?: number | null
          tasks?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_progress_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_team: {
        Row: {
          created_at: string | null
          developers: string[] | null
          guests: string[] | null
          id: number
          project_id: number | null
          project_manager: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          developers?: string[] | null
          guests?: string[] | null
          id?: never
          project_id?: number | null
          project_manager?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          developers?: string[] | null
          guests?: string[] | null
          id?: never
          project_id?: number | null
          project_manager?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_team_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: number
          name: string
          organization: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: never
          name: string
          organization?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: never
          name?: string
          organization?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string | null
          expiration_date: string
          id: number
          token: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          expiration_date: string
          id?: never
          token: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          expiration_date?: string
          id?: never
          token?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      styling_themes: {
        Row: {
          application_id: number | null
          created_at: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name: string
          updated_at?: string | null
        }
        Update: {
          application_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "styling_themes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_roles: {
        Row: {
          created_at: string | null
          id: number
          name: string
          permissions: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
          permissions?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
          permissions?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_uid: string | null
          created_at: string | null
          email: string | null
          email_verified: boolean | null
          id: number
          password_hash: string | null
          phone_number: string | null
          phone_number_verified: boolean | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          auth_uid?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: never
          password_hash?: string | null
          phone_number?: string | null
          phone_number_verified?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          auth_uid?: string | null
          created_at?: string | null
          email?: string | null
          email_verified?: boolean | null
          id?: never
          password_hash?: string | null
          phone_number?: string | null
          phone_number_verified?: boolean | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
