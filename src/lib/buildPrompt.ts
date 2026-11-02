import jewelleryConfig from "@/config/jewellery.json";
import footwearConfig from "@/config/footwear.json";
import opticalConfig from "@/config/optical.json";
import sizesConfig from "@/config/sizes.json";
import baseConfig from "@/config/base.json";

export interface BuildPromptInput {
  domain: string;
  categoryId: string;
  styleId: string;
  backgroundId: string;
  lightingId: string;
  ratioId: string;
  presetId?: string | null;
  fineTune?: Record<string, number | string> | null;
  productName?: string | null;
}

export interface BuildPromptOutput {
  text: string;
  ratioAspect: string;
  previewPixels: { width: number; height: number };
  finalPixels: { width: number; height: number };
}

const DOMAIN_CONFIG_MAP: Record<string, any> = {
  jewellery: jewelleryConfig,
  footwear: footwearConfig,
  optical: opticalConfig,
};

/**
 * Server-only function to validate studio parameters and construct the exact prompt.
 * Strictly verifies all IDs, domain ownership, and category compatibility.
 */
export function buildPrompt(input: BuildPromptInput): BuildPromptOutput {
  if (!input) {
    throw new Error("Missing prompt input object.");
  }

  // 1. Domain verification
  const domain = (input.domain || "").toLowerCase().trim();
  if (!domain) {
    throw new Error("Missing required field: domain.");
  }

  const domainConfig = DOMAIN_CONFIG_MAP[domain];
  if (!domainConfig) {
    throw new Error(
      `Unknown domain "${input.domain}". Must be one of: jewellery, footwear, optical.`
    );
  }

  // 2. Category lookup and verification
  if (!input.categoryId) {
    throw new Error("Missing required field: categoryId.");
  }
  const category = domainConfig.categories.find(
    (c: any) => c.id === input.categoryId
  );
  if (!category) {
    throw new Error(
      `Category "${input.categoryId}" does not belong to domain "${domain}".`
    );
  }
  if (category.enabled === false) {
    throw new Error(
      `Category "${category.label}" (${input.categoryId}) is disabled.`
    );
  }

  // 3. Style lookup and verification
  if (!input.styleId) {
    throw new Error("Missing required field: styleId.");
  }

  const style = domainConfig.styles.find((s: any) => s.id === input.styleId);
  if (!style) {
    // Check if style belongs to another domain for a precise, helpful error
    const otherDomainEntry = Object.entries(DOMAIN_CONFIG_MAP).find(
      ([otherDomain, cfg]) =>
        otherDomain !== domain &&
        cfg.styles.some((s: any) => s.id === input.styleId)
    );

    if (otherDomainEntry) {
      throw new Error(
        `Style "${input.styleId}" belongs to domain "${otherDomainEntry[0]}", not "${domain}".`
      );
    }

    throw new Error(
      `Style "${input.styleId}" does not exist in domain "${domain}".`
    );
  }

  if (style.enabled === false) {
    throw new Error(`Style "${style.label}" (${input.styleId}) is disabled.`);
  }

  // 4. Check that the style applies to the category (appliesTo)
  if (
    style.appliesTo &&
    !style.appliesTo.includes("all") &&
    !style.appliesTo.includes(category.id)
  ) {
    throw new Error(
      `Style "${style.label}" (${style.id}) does not apply to category "${category.label}" (${category.id}).`
    );
  }

  // 5. Background lookup and verification
  if (!input.backgroundId) {
    throw new Error("Missing required field: backgroundId.");
  }
  const background = domainConfig.backgrounds.find(
    (b: any) => b.id === input.backgroundId
  );
  if (!background) {
    throw new Error(
      `Background "${input.backgroundId}" does not belong to domain "${domain}".`
    );
  }
  if ((background as any).enabled === false) {
    throw new Error(
      `Background "${background.label}" (${input.backgroundId}) is disabled.`
    );
  }

  // 6. Lighting lookup and verification
  if (!input.lightingId) {
    throw new Error("Missing required field: lightingId.");
  }
  const lighting = domainConfig.lighting.find(
    (l: any) => l.id === input.lightingId
  );
  if (!lighting) {
    throw new Error(
      `Lighting "${input.lightingId}" does not belong to domain "${domain}".`
    );
  }
  if ((lighting as any).enabled === false) {
    throw new Error(
      `Lighting "${lighting.label}" (${input.lightingId}) is disabled.`
    );
  }

  // 7. Ratio lookup and verification from sizes.json
  if (!input.ratioId) {
    throw new Error("Missing required field: ratioId.");
  }
  const size = sizesConfig.find((s: any) => s.id === input.ratioId);
  if (!size) {
    throw new Error(
      `Ratio "${input.ratioId}" is invalid or does not exist in sizes config.`
    );
  }

  // 8. Preset lookup (optional)
  let presetRule: string | null = null;
  if (input.presetId) {
    const preset = domainConfig.presets?.find(
      (p: any) => p.id === input.presetId
    );
    if (!preset) {
      throw new Error(
        `Preset "${input.presetId}" does not belong to domain "${domain}".`
      );
    }
    if ((preset as any).enabled === false) {
      throw new Error(
        `Preset "${preset.label}" (${input.presetId}) is disabled.`
      );
    }
    presetRule = preset.rule;
  }

  // 9. Fine-tune rules lookup (optional)
  const fineTuneRules: string[] = [];
  if (input.fineTune && typeof input.fineTune === "object") {
    for (const [key, rawVal] of Object.entries(input.fineTune)) {
      if (rawVal === undefined || rawVal === null || rawVal === "") continue;

      const ftOption = domainConfig.fineTune?.find((f: any) => f.id === key);
      if (!ftOption) {
        throw new Error(
          `Fine-tune option "${key}" does not belong to domain "${domain}".`
        );
      }

      const numVal = Number(rawVal);
      const levelObj = ftOption.levels?.find((l: any) => l.value === numVal);
      if (!levelObj) {
        throw new Error(
          `Invalid level "${rawVal}" for fine-tune option "${key}".`
        );
      }
      fineTuneRules.push(levelObj.rule);
    }
  }

  // 10. Product Name sanitization & label line
  let productNameLine: string | null = null;
  if (input.productName && typeof input.productName === "string") {
    // Strip line breaks and special characters so it cannot give instructions to the AI
    const sanitizedName = input.productName
      .replace(/[\r\n\t]+/g, " ")
      .replace(/[^a-zA-Z0-9 -]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 60);

    if (sanitizedName) {
      productNameLine = `The product is described by its owner as: ${sanitizedName}. Use it only as a label. Never change the product to match the name.`;
    }
  }

  // 11. Output Rule
  const outputRule = `OUTPUT RULE: Deliver the final photograph in ${size.aspectRatio} aspect ratio (${size.finalPixels.width}x${size.finalPixels.height} pixels), ultra-sharp commercial quality, perfectly composed with authentic materials and textures, and zero text, borders, or watermarks.`;

  // 12. Build the text in this order:
  // base rules, category rule, style rule, background rule, lighting rule, preset rule, fine-tune rules, then product name line, then output rule
  const sections: string[] = [
    baseConfig.systemPrompt,
    category.rule,
    style.rule,
    background.rule,
    lighting.rule,
  ];

  if (presetRule) {
    sections.push(presetRule);
  }

  if (fineTuneRules.length > 0) {
    sections.push(fineTuneRules.join("\n"));
  }

  if (productNameLine) {
    sections.push(productNameLine);
  }

  sections.push(outputRule);

  const text = sections.join("\n\n");

  return {
    text,
    ratioAspect: size.aspectRatio,
    previewPixels: size.previewPixels,
    finalPixels: size.finalPixels,
  };
}

export default buildPrompt;
