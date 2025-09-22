export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      applications: {
        Row: {
          approval_timestamp: string | null
          created_at: string
          email_contact: string | null
          email_google: string | null
          feminism_definition: string | null
          full_name: string | null
          known_members: string | null
          last_modified: string
          pronouns: string | null
          reasons: string | null
          social_facebook: string | null
          social_linkedin: string | null
          social_twitter: string | null
          social_website: string | null
          submission_timestamp: string | null
          user_id: string
        }
        Insert: {
          approval_timestamp?: string | null
          created_at?: string
          email_contact?: string | null
          email_google?: string | null
          feminism_definition?: string | null
          full_name?: string | null
          known_members?: string | null
          last_modified?: string
          pronouns?: string | null
          reasons?: string | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_website?: string | null
          submission_timestamp?: string | null
          user_id?: string
        }
        Update: {
          approval_timestamp?: string | null
          created_at?: string
          email_contact?: string | null
          email_google?: string | null
          feminism_definition?: string | null
          full_name?: string | null
          known_members?: string | null
          last_modified?: string
          pronouns?: string | null
          reasons?: string | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_website?: string | null
          submission_timestamp?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profile: {
        Row: {
          created_at: string
          display_name: string | null
          email_display: string | null
          email_google: string | null
          email_gravatar: string | null
          last_modified: string
          projects: string | null
          pronounceable_name: string | null
          pronouns: string | null
          public_member: boolean | null
          public_projects: boolean | null
          public_reasons: boolean | null
          public_skills: boolean | null
          reasons: string | null
          skills: string | null
          social_blog: string | null
          social_facebook: string | null
          social_linkedin: string | null
          social_twitter: string | null
          social_website: string | null
          summary: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          email_display?: string | null
          email_google?: string | null
          email_gravatar?: string | null
          last_modified?: string
          projects?: string | null
          pronounceable_name?: string | null
          pronouns?: string | null
          public_member?: boolean | null
          public_projects?: boolean | null
          public_reasons?: boolean | null
          public_skills?: boolean | null
          reasons?: string | null
          skills?: string | null
          social_blog?: string | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_website?: string | null
          summary?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          email_display?: string | null
          email_google?: string | null
          email_gravatar?: string | null
          last_modified?: string
          projects?: string | null
          pronounceable_name?: string | null
          pronouns?: string | null
          public_member?: boolean | null
          public_projects?: boolean | null
          public_reasons?: boolean | null
          public_skills?: boolean | null
          reasons?: string | null
          skills?: string | null
          social_blog?: string | null
          social_facebook?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          social_website?: string | null
          summary?: string | null
          user_id?: string
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          id?: number
          permission: Database["public"]["Enums"]["app_permission"]
          role: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          id?: number
          permission?: Database["public"]["Enums"]["app_permission"]
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      role_permissions_log: {
        Row: {
          changed_at: string
          log_id: number
          new_permission: Database["public"]["Enums"]["app_permission"] | null
          new_role: Database["public"]["Enums"]["app_role"] | null
          old_permission: Database["public"]["Enums"]["app_permission"] | null
          old_role: Database["public"]["Enums"]["app_role"] | null
          operation: string
          user_current: string
          user_session: string
        }
        Insert: {
          changed_at?: string
          log_id?: number
          new_permission?: Database["public"]["Enums"]["app_permission"] | null
          new_role?: Database["public"]["Enums"]["app_role"] | null
          old_permission?: Database["public"]["Enums"]["app_permission"] | null
          old_role?: Database["public"]["Enums"]["app_role"] | null
          operation: string
          user_current: string
          user_session: string
        }
        Update: {
          changed_at?: string
          log_id?: number
          new_permission?: Database["public"]["Enums"]["app_permission"] | null
          new_role?: Database["public"]["Enums"]["app_role"] | null
          old_permission?: Database["public"]["Enums"]["app_permission"] | null
          old_role?: Database["public"]["Enums"]["app_role"] | null
          operation?: string
          user_current?: string
          user_session?: string
        }
        Relationships: []
      }
      scholarships: {
        Row: {
          approved: boolean | null
          created_at: string
          expire_at: string | null
          id: string
          notes: string | null
          recipient_user_id: string
          reviewed_at: string | null
          reviewed_by_user_id: string | null
        }
        Insert: {
          approved?: boolean | null
          created_at?: string
          expire_at?: string | null
          id?: string
          notes?: string | null
          recipient_user_id: string
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
        }
        Update: {
          approved?: boolean | null
          created_at?: string
          expire_at?: string | null
          id?: string
          notes?: string | null
          recipient_user_id?: string
          reviewed_at?: string | null
          reviewed_by_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scholarships_recipient_user_id_fkey"
            columns: ["recipient_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scholarships_reviewed_by_user_id_fkey"
            columns: ["reviewed_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_login: string
          last_name: string
          middle_name: string | null
          role: Database["public"]["Enums"]["roles"]
          username: string
        }
        Insert: {
          created_at?: string
          email?: string
          first_name: string
          id?: string
          last_login?: string
          last_name: string
          middle_name?: string | null
          role: Database["public"]["Enums"]["roles"]
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_login?: string
          last_name?: string
          middle_name?: string | null
          role?: Database["public"]["Enums"]["roles"]
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      user_role_view: {
        Row: {
          id: number | null
          permission: Database["public"]["Enums"]["app_permission"] | null
          role: Database["public"]["Enums"]["app_role"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      modify_role_permissions: {
        Args: {
          permission_name: Database["public"]["Enums"]["app_permission"]
          role_name: Database["public"]["Enums"]["app_role"]
        }
        Returns: undefined
      }
    }
    Enums: {
      app_permission:
        | "new.can_apply"
        | "member.can_vote"
        | "member.can_comment"
        | "admin.can_view_dues"
        | "admin.can_add_membership_note"
        | "admin.can_approve_sponsorship"
        | "voting.can_view_all_comments"
      app_role:
        | "board_member"
        | "code_of_conduct_coordinator"
        | "key_member"
        | "member"
        | "membership_coordinator"
        | "prospective_member"
        | "voting_coordinator"
        | "voting_member"
        | "admin"
      roles:
        | "board_member"
        | "code_of_conduct_coordinator"
        | "membership_coordinator"
        | "voting_coordinator"
        | "voting_member"
        | "key_member"
        | "member"
        | "prospective_member"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      app_permission: [
        "new.can_apply",
        "member.can_vote",
        "member.can_comment",
        "admin.can_view_dues",
        "admin.can_add_membership_note",
        "admin.can_approve_sponsorship",
        "voting.can_view_all_comments",
      ],
      app_role: [
        "board_member",
        "code_of_conduct_coordinator",
        "key_member",
        "member",
        "membership_coordinator",
        "prospective_member",
        "voting_coordinator",
        "voting_member",
        "admin",
      ],
      roles: [
        "board_member",
        "code_of_conduct_coordinator",
        "membership_coordinator",
        "voting_coordinator",
        "voting_member",
        "key_member",
        "member",
        "prospective_member",
      ],
    },
  },
} as const

