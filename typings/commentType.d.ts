export interface userType {
    id?: number;
    name?: string;
    email?: string;
    profile_image?: string;
    user_name?: string;
    dob?: string;
    gender?: string;
    country?: string;
    bio?: string;
    is_self?: boolean;
}

interface userType {
    id: number;
    name: string;
    user_name: string;
    profile_image: string;
    is_self: boolean;
}

interface tag_userType {
    id: number;
    name: string;
    user_name: string;
    profile_image: string;
    is_self: boolean;
}

interface repliesItemType {
    id: number;
    comment: string;
    is_like: boolean;
    total_like: number;
    total_reply: number;
    user: userType;
    created_at: string;
    tag_user: tag_userType;
    is_save: boolean;
    is_support: boolean;
    is_friend: boolean;
    send_req: boolean;
    receive_req: boolean;
    is_report: boolean;
    is_self: boolean;
}

export interface commentType {
    id?: number;
    comment?: string;
    total_like?: number;
    total_reply?: number;
    user?: userType;
    tag_user?: tag_userType;
    replies?: Array<repliesItemType>;
    created_at?: string;
    is_like?: boolean;
    is_friend?: boolean;
    send_req?: boolean;
    receive_req?: boolean;
    is_self?: boolean;
    is_show_more?: boolean;
    deleted?: boolean;
    parentComment?: boolean;
    index?: number;
    commentIndex?: number;
}
