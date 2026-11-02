export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          phone: string | null;
          free_credits: number;
          paid_credits: number;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          phone?: string | null;
          free_credits?: number;
          paid_credits?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          phone?: string | null;
          free_credits?: number;
          paid_credits?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          user_id: string;
          domain: string;
          category_id: string | null;
          style_id: string | null;
          background_id: string | null;
          lighting_id: string | null;
          ratio_id: string | null;
          preset_id: string | null;
          fine_tune: Json | null;
          product_name: string | null;
          original_path: string | null;
          result_path: string | null;
          quality: "preview" | "final";
          credit_kind: "free" | "paid" | null;
          status: "queued" | "running" | "done" | "failed";
          model: string | null;
          qc_result: Json | null;
          error: string | null;
          created_at: string;
          finished_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          domain: string;
          category_id?: string | null;
          style_id?: string | null;
          background_id?: string | null;
          lighting_id?: string | null;
          ratio_id?: string | null;
          preset_id?: string | null;
          fine_tune?: Json | null;
          product_name?: string | null;
          original_path?: string | null;
          result_path?: string | null;
          quality?: "preview" | "final";
          credit_kind?: "free" | "paid" | null;
          status?: "queued" | "running" | "done" | "failed";
          model?: string | null;
          qc_result?: Json | null;
          error?: string | null;
          created_at?: string;
          finished_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["jobs"]["Insert"]>;
        Relationships: [];
      };
      credit_log: {
        Row: {
          id: string;
          user_id: string;
          kind: "free" | "paid";
          change: number;
          reason: "signup" | "job" | "refund" | "purchase" | "admin";
          job_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          kind: "free" | "paid";
          change: number;
          reason: "signup" | "job" | "refund" | "purchase" | "admin";
          job_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["credit_log"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          razorpay_order_id: string;
          pack_id: string | null;
          amount_paise: number;
          credits: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          razorpay_order_id: string;
          pack_id?: string | null;
          amount_paise: number;
          credits: number;
          status?: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      processed_payments: {
        Row: {
          razorpay_payment_id: string;
          created_at: string;
        };
        Insert: {
          razorpay_payment_id: string;
          created_at?: string;
        };
        Update: {
          razorpay_payment_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {
      take_credit: {
        Args: { p_user_id: string };
        Returns: string;
      };
      refund_credit: {
        Args: { p_job_id: string };
        Returns: string;
      };
    };
    Enums: {};
    CompositeTypes: {};
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Job = Database["public"]["Tables"]["jobs"]["Row"];
export type CreditLog = Database["public"]["Tables"]["credit_log"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
