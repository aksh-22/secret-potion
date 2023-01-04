interface user_infoType {
  id: number;
  name: string;
  email: string;
  profile_image: any;
  firebase_id?: any;
}

export interface connectionsItemType {
  id: number;
  user_info: user_infoType;
  playerId: any[]
}

export interface connectionType {
  connections: Array<connectionsItemType>;
}
