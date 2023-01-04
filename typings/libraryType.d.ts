interface subtitleType {}

export interface libraryType {
  id?: number;
  title?: string;
  subtitle?: subtitleType;
  reading_time?: string;
  content?: string;
  image?: string;
  created_at?: string;
}
