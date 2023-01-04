interface userType {
  id?: number;
  name?: string;
  email?: string;
  profile_image?: string;
  user_name?: string;
  dob?: string;
  gender?: string;
  country?: string;
  bio?: string;
  is_friend?: boolean;
  send_req?: boolean;
  receive_req?: boolean;
  is_self?: boolean;
  firebase_id?: string;
}

interface postType {
  id?: number;
  content?: string;
  created_at?: string;
  total_likes?: number;
  total_comment?: number;
  total_support?: number;
  total_save?: number;
  is_save?: boolean;
  is_support?: boolean;
  is_like?: boolean;
  user?: userType;
  is_friend?: boolean;
  send_req?: boolean;
  receive_req?: boolean;
  community_id?: number;
  is_self?: boolean;
  is_report?: boolean;
}
