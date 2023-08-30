export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          author_id: string
          author_name: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          author_id?: string
          author_name: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          author_id?: string
          author_name?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: 'cards_author_id_fkey'
            columns: ['author_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      messages: {
        Row: {
          author_id: string
          author_name: string
          cardID: string
          content: string
          created_at: string
          id: string
        }
        Insert: {
          author_id?: string
          author_name: string
          cardID: string
          content: string
          created_at?: string
          id?: string
        }
        Update: {
          author_id?: string
          author_name?: string
          cardID?: string
          content?: string
          created_at?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'messages_cardID_fkey'
            columns: ['cardID']
            referencedRelation: 'cards'
            referencedColumns: ['id']
          }
        ]
      }
      users: {
        Row: {
          id: string
          username: string | null
        }
        Insert: {
          id: string
          username?: string | null
        }
        Update: {
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey'
            columns: ['id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
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
