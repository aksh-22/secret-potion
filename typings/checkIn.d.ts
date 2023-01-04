export interface moodType {
  id?: number;
  date?: string;
  value?: string | any;
  mood_name?: string;
  mood_content?: string;
}

export interface month_moodItemType {
  id: number;
  date: string;
  value: number;
  mood_name: string;
  mood_content: string;
}

interface last_month_moodType {
  id: number;
  date: string;
  value: number;
  mood_name: string;
  mood_content: string;
}

interface checkInType {
  mood?: moodType;
  month_mood?: Array<month_moodItemType>;
  last_month_mood?: Array<last_month_moodType>;
}
