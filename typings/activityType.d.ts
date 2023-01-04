
export interface not_joinItemType {
   id: number;
   color: string;
   background: Array<string>;
   name: string;
   description: string;
   is_admin: boolean;
   type: string

}


interface dayItemType {
   day_name: string;
}

export interface join_communityItemType {
   id: number;
   color: string;
   background: Array<string>;
   name: string;
   description: string;
   is_admin: boolean;
   type: string;
   day: Array<dayItemType>;
   is_completed?: boolean;
   wellness_id?: number;
   day_id?: number
}

export interface activityType {
   not_join: Array<join_communityItemType>;
   join_community: Array<join_communityItemType>;
}
