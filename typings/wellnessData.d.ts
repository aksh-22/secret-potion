export interface wellnessDataItemType {
  id?: number;
  name?: string;
  color?: string;
  avg?: number;
  percentage?: string;
  current?: string;
  activity_point?: number
}

export interface wellnessDataType {
  wellness?: Array<wellnessItemType>;
  overall_avg?: number;
  overall_avg_percentag?: string;
  overall_content?: string;
  new_overall_avg_percentag?: string
}
