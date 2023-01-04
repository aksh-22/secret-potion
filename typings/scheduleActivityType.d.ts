
interface dayItemType {
   day_name: string;
}

export interface scheduleActivityType {
   id: number;
   name: string;
   description: string;
   day_type: string;
   day: Array<dayItemType>;
}
