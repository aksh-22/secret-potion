export interface optionsItemType {
  option_id: number;
  option: string;
  remaining_steps: number;
  last_step: boolean;
  reduce_steps: boolean;
  question_id: number;
  type: string;
}

export interface questionType {
  question_id: number;
  question: string;
  type: string;
  options: Array<optionsItemType>;
  selectedQuestion: optionsItemType;
  diagnoses: boolean;
}
