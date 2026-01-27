
export interface ThemeSummary {
  name: string;
  software: string;
  thumbnail: string;
}

export interface ThemeDetails extends ThemeSummary {
  description: string;
  repository_url: string;
  installation_instructions: string;
  screenshots: string[];
}

export type ThemeList = ThemeSummary[];
