import jewelleryConfig from "@/config/jewellery.json";
import footwearConfig from "@/config/footwear.json";
import opticalConfig from "@/config/optical.json";
import sizesConfig from "@/config/sizes.json";
import baseConfig from "@/config/base.json";

export type DomainType = "jewellery" | "footwear" | "optical";

export interface CategoryOption {
  id: string;
  label: string;
  enabled: boolean;
  rule: string;
}

export interface StyleOption {
  id: string;
  label: string;
  group: string;
  enabled: boolean;
  needsPerson: boolean;
  appliesTo: string[];
  rule: string;
}

export interface BackgroundOption {
  id: string;
  label: string;
  rule: string;
}

export interface LightingOption {
  id: string;
  label: string;
  rule: string;
}

export interface PresetOption {
  id: string;
  label: string;
  rule: string;
}

export interface FineTuneOption {
  id: string;
  label: string;
  levels: { value: number; rule: string }[];
}

export interface DomainConfig {
  domain: DomainType;
  categories: CategoryOption[];
  styles: StyleOption[];
  backgrounds: BackgroundOption[];
  lighting: LightingOption[];
  presets: PresetOption[];
  fineTune: FineTuneOption[];
}

export interface SizeOption {
  id: string;
  label: string;
  sublabel?: string;
  aspectRatio: string;
  previewPixels: { width: number; height: number };
  finalPixels: { width: number; height: number };
}

export const domainConfigs: Record<DomainType, DomainConfig> = {
  jewellery: jewelleryConfig as DomainConfig,
  footwear: footwearConfig as DomainConfig,
  optical: opticalConfig as DomainConfig,
};

export function getDomainConfig(domain: string): DomainConfig {
  const key = domain.toLowerCase() as DomainType;
  return domainConfigs[key] || domainConfigs.jewellery;
}

export function getSizesConfig(): SizeOption[] {
  return sizesConfig as SizeOption[];
}

export function getBaseConfig() {
  return baseConfig;
}

export { jewelleryConfig, footwearConfig, opticalConfig, sizesConfig, baseConfig };
