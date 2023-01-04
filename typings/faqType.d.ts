interface typeItemType {
  id: number;
  heading: string;
  content: string;
}

export interface faqType {
  id?: number;
  name?: string;
  type?: Array<typeItemType>;
}
