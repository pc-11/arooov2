// Generated via `nxp supabase gen types typescript --project-id $PROJECT_ID --schema public > database.types.ts`
// See: https://supabase.com/docs/guides/api/rest/generating-types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4";
  };
  public: {
    Tables: {
      profile: {
        Row: {
          created_at: string;
          display_name: string | null;
          email_display: string | null;
          email_google: string | null;
          email_gravatar: string | null;
          last_modified: string;
          projects: string | null;
          pronounceable_name: string | null;
          pronouns: string | null;
          public_member: boolean | null;
          public_projects: boolean | null;
          public_reasons: boolean | null;
          public_skills: boolean | null;
          reasons: string | null;
          skills: string | null;
          social_blog: string | null;
          social_facebook: string | null;
          social_linkedin: string | null;
          social_twitter: string | null;
          social_website: string | null;
          summary: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          display_name?: string | null;
          email_display?: string | null;
          email_google?: string | null;
          email_gravatar?: string | null;
          last_modified?: string;
          projects?: string | null;
          pronounceable_name?: string | null;
          pronouns?: string | null;
          public_member?: boolean | null;
          public_projects?: boolean | null;
          public_reasons?: boolean | null;
          public_skills?: boolean | null;
          reasons?: string | null;
          skills?: string | null;
          social_blog?: string | null;
          social_facebook?: string | null;
          social_linkedin?: string | null;
          social_twitter?: string | null;
          social_website?: string | null;
          summary?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          display_name?: string | null;
          email_display?: string | null;
          email_google?: string | null;
          email_gravatar?: string | null;
          last_modified?: string;
          projects?: string | null;
          pronounceable_name?: string | null;
          pronouns?: string | null;
          public_member?: boolean | null;
          public_projects?: boolean | null;
          public_reasons?: boolean | null;
          public_skills?: boolean | null;
          reasons?: string | null;
          skills?: string | null;
          social_blog?: string | null;
          social_facebook?: string | null;
          social_linkedin?: string | null;
          social_twitter?: string | null;
          social_website?: string | null;
          summary?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      scholarships: {
        Row: {
          approved: boolean | null;
          created_at: string;
          expire_at: string | null;
          id: string;
          notes: string | null;
          recipient_user_id: string;
          reviewed_at: string | null;
          reviewed_by_user_id: string | null;
        };
        Insert: {
          approved?: boolean | null;
          created_at?: string;
          expire_at?: string | null;
          id?: string;
          notes?: string | null;
          recipient_user_id: string;
          reviewed_at?: string | null;
          reviewed_by_user_id?: string | null;
        };
        Update: {
          approved?: boolean | null;
          created_at?: string;
          expire_at?: string | null;
          id?: string;
          notes?: string | null;
          recipient_user_id?: string;
          reviewed_at?: string | null;
          reviewed_by_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "scholarships_recipient_user_id_fkey";
            columns: ["recipient_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "scholarships_reviewed_by_user_id_fkey";
            columns: ["reviewed_by_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          first_name: string;
          id: string;
          last_login: string;
          last_name: string;
          middle_name: string | null;
          role: Database["public"]["Enums"]["roles"];
          username: string;
        };
        Insert: {
          created_at?: string;
          email?: string;
          first_name: string;
          id?: string;
          last_login?: string;
          last_name: string;
          middle_name?: string | null;
          role: Database["public"]["Enums"]["roles"];
          username: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          first_name?: string;
          id?: string;
          last_login?: string;
          last_name?: string;
          middle_name?: string | null;
          role?: Database["public"]["Enums"]["roles"];
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      roles:
        | "board_member"
        | "code_of_conduct_coordinator"
        | "membership_coordinator"
        | "voting_coordinator"
        | "voting_member"
        | "key_member"
        | "member"
        | "prospective_member";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
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
} as const;
