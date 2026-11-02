"use server";

import { buildPrompt, BuildPromptInput, BuildPromptOutput } from "@/lib/buildPrompt";

export async function generateDevPrompt(input: BuildPromptInput): Promise<{
  success: boolean;
  data?: BuildPromptOutput;
  error?: string;
}> {
  try {
    const output = buildPrompt(input);
    return {
      success: true,
      data: output,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Failed to generate prompt.",
    };
  }
}
