export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          heading: string | null
          id: number
          image_url: string | null
          intro: string | null
          mission: string | null
          updated_at: string
          vision: string | null
        }
        Insert: {
          heading?: string | null
          id?: number
          image_url?: string | null
          intro?: string | null
          mission?: string | null
          updated_at?: string
          vision?: string | null
        }
        Update: {
          heading?: string | null
          id?: number
          image_url?: string | null
          intro?: string | null
          mission?: string | null
          updated_at?: string
          vision?: string | null
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string | null
          body: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          media_urls: Json
          published: boolean
          published_at: string
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          body?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          media_urls?: Json
          published?: boolean
          published_at?: string
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          body?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          media_urls?: Json
          published?: boolean
          published_at?: string
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          service: string | null
          source: string | null
          status: string
          user_agent: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string
          user_agent?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      founders: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          name: string
          photo_url: string | null
          published: boolean
          sort_order: number
          title: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          name: string
          photo_url?: string | null
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
          photo_url?: string | null
          published?: boolean
          sort_order?: number
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          client: string | null
          cover_url: string | null
          created_at: string
          description: string | null
          facts: Json
          id: string
          location: string | null
          media_urls: Json
          published: boolean
          short_description: string | null
          slug: string
          sort_order: number
          title: string
          updated_at: string
          year: string | null
        }
        Insert: {
          category?: string
          client?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          facts?: Json
          id?: string
          location?: string | null
          media_urls?: Json
          published?: boolean
          short_description?: string | null
          slug: string
          sort_order?: number
          title: string
          updated_at?: string
          year?: string | null
        }
        Update: {
          category?: string
          client?: string | null
          cover_url?: string | null
          created_at?: string
          description?: string | null
          facts?: Json
          id?: string
          location?: string | null
          media_urls?: Json
          published?: boolean
          short_description?: string | null
          slug?: string
          sort_order?: number
          title?: string
          updated_at?: string
          year?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          hero_tiles: Json
          id: number
          stats: Json
          updated_at: string
        }
        Insert: {
          hero_tiles?: Json
          id?: number
          stats?: Json
          updated_at?: string
        }
        Update: {
          hero_tiles?: Json
          id?: number
          stats?: Json
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          kind: string
          name: string
          published: boolean
          quote: string | null
          rating: number | null
          role: string | null
          sort_order: number
          updated_at: string
          video_embed_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          kind?: string
          name: string
          published?: boolean
          quote?: string | null
          rating?: number | null
          role?: string | null
          sort_order?: number
          updated_at?: string
          video_embed_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
          kind?: string
          name?: string
          published?: boolean
          quote?: string | null
          rating?: number | null
          role?: string | null
          sort_order?: number
          updated_at?: string
          video_embed_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
