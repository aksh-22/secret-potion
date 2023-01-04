export enum RootStackName {
    AUTH = 'auth',
    QUESTIONSSTACK = 'questionstack',
    BOTTOMTAB = 'bottomtab',
    SPLASH = 'splash',
    WELCOME = 'welcome',
    INTRO = 'intro',
    PASSWORD = 'password',
    WELLNESS_QUESTION_UPDATE = 'wellnessQuestionUpdate',
    INVITE = 'invite',
    LIBRARY = 'library',
    LIBRARY_DETAILS = 'libraryDetails',
    ABOUT = 'about',
    FAQ = 'faq',
    HELP_AND_SUPPORT = 'helpAndSupport',
    PROFILE = 'profile',
    OTHER_PROFILE = 'otherProfile',
    EDIT_PROFILE = 'editProfile',
    CHAT_MENU = 'chatMenu',
    CHAT_SCREEN = 'chatScreen',
    NOTIFICATION = 'notification',
    CHECK_TOKEN = 'checkToken',
    REPORT_USER = 'reportUser',
}

export enum AuthRouteNames {
    LOGIN = 'login',
    PROFILE = 'profile',
    OTP = 'otp',
    FORGOTPASSWORD = 'forgotPassword',
    FORGOTPASSWORDOTP = 'forgotPasswordOtp',
    RESETPASSWORD = 'resetPasswordOtp',
}

export enum QuestionsRouteNames {
    QUESTIONS = 'questions',
}

export enum BottomRouteNames {
    HOMESTACK = 'homestack',
    DIARYSTACK = 'diaryStack',
    WELNESSSTACK = 'wellnessStack',
    MORESTACK = 'moreStack',
    COMMUNITY_STACK = 'communityStack',
}

export enum HomeRouteNames {
    HOME = 'home',
    CHECKIN = 'checkIn',
    REFLECTION = 'reflection',
    REFLECTION_LIST = 'reflectionList',
    REFLECTION_REPORT = 'reflectionReport',
}

export enum DiaryRouteNames {
    FIRSTDIARY = 'firstDiary',
    DIARYTAB = 'diaryTab',
    DIARYDETAILS = 'diaryDetails',
    DIARYDETAILSEDIT = 'diaryDetailsEdit',
}

export enum WellnessRouteNames {
    WELLNESSFIRSTMESSAGE = 'wellnessFirstMessage',
    WELLNESS = 'wellness',
    WELLNESS_QUESTION = 'wellnessQuestion',
    WELLNESS_LANDING_PAGE = 'wellnessLandingPage',
    CREATE_PLAN = 'createPlan',
    MY_PLAN = 'myPlan',
    PROGRESS = 'progress',
    BADGES = 'badges',
    ADD_PLAN = 'addPlan',
    BADGE_DETAILS = 'badgeDetails',
}

export enum CommunityRouteNames {
    COMMUNITY = 'community',
    COMMUNITY_Message = 'communityMessage',
    COMMUNITY_PAGE = 'communityPage',
    WRITE_POST = 'writePost',
    REPORT_ABUSIVE = 'reportAbusive',
    POST_PAGE = 'postPage',
    NOTIFICATION_POST_PAGE = 'notificationPostPage',
}

export enum MoreRouteNames {
    MORE = 'more',

    CONNECTION = 'connection',

    SETTINGS = 'settings',
    NOTIFICATION_SETTINGS = 'notificationSettings',
}
