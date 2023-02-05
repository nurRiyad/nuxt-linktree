export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      topten_collections: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: number
          name: string
          user: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: number
          name: string
          user: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: number
          name?: string
          user?: string
        }
      }
      topten_links: {
        Row: {
          collection: string | null
          created_at: string | null
          id: number
          link: string
          name: string
          user: string
        }
        Insert: {
          collection?: string | null
          created_at?: string | null
          id?: number
          link: string
          name: string
          user: string
        }
        Update: {
          collection?: string | null
          created_at?: string | null
          id?: number
          link?: string
          name?: string
          user?: string
        }
      }
      topten_users: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: number
          uid: string
          username: string
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id?: number
          uid: string
          username: string
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: number
          uid?: string
          username?: string
        }
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
  }
}
