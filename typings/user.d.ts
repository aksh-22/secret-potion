export interface userProfileType {
    id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    dob?: string;
    gender?: string;
    country?: string;
    country_code?: string;
    total_connection?: number;
    total_post?: number;
    wellness_score?: any;
    profile_image?: string;
    invite_link?: string;
    diary?: boolean;
    onboarding_question?: boolean;
    cognitive_wellness_avg?: number;
    emotional_wellness_avg?: number;
    physical_wellness_avg?: number;
    social_wellness_avg?: number;
    bio?: string;
    create_date?: string;
    guide_line?: boolean;
    user_name?: string;
    time_zone?: string;
}
