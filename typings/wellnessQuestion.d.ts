interface typeItemType {
  id?: number;
  option?: string;
  value?: number;
}

export interface wellnessQuestionType {
  id?: number;
  question?: string;
  color_code?: string;
  type?: Array<typeItemType>;
  content?: string;
  name?: string;
}
