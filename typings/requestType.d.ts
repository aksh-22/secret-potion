interface user_infoType {
  id: number;
  name: string;
  user_name: string;
  email: string;
  dob: string;
  gender: string;
  country: string;
  bio: string;
  profile_image: string;
  firebase_id: string
}

export interface sendItemType {
  id: number;
  user_info: user_infoType;
}

export interface receiveItemType {
  id?: number;
  user_info?: user_infoType;
}

export interface requestType {
  send?: Array<sendItemType>;
  receive?: Array<receiveItemType>;
  count?: number;
}
