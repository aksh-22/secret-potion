interface userType {
  id: number;
  name: string;
  email: string;
}

export interface diaryDetailType {
  id: number;
  title: string;
  description: string;
  color: string;
  date: string;
  user: userType;
}
