import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
    AuthRouteNames,
    BottomRouteNames,
    CommunityRouteNames,
    DiaryRouteNames,
    HomeRouteNames,
    MoreRouteNames,
    QuestionsRouteNames,
    RootStackName,
    WellnessRouteNames,
} from 'src/constants/routeName';

export type RootStackParamList = {
    [RootStackName.AUTH]: NavigatorScreenParams<AuthStackParamList>;
    [RootStackName.QUESTIONSSTACK]: NavigatorScreenParams<QuestionStackParamList>;
    [RootStackName.BOTTOMTAB]: NavigatorScreenParams<BottomStackParamList>;
    [RootStackName.SPLASH]: undefined;
    [RootStackName.WELCOME]: undefined;
    [RootStackName.INTRO]: undefined;
    [RootStackName.WELLNESS_QUESTION_UPDATE]: undefined;
    [RootStackName.PASSWORD]: undefined;
    [RootStackName.INVITE]: undefined;
    [RootStackName.LIBRARY]: undefined;
    [RootStackName.LIBRARY_DETAILS]: undefined;
    [RootStackName.ABOUT]: undefined;
    [RootStackName.FAQ]: undefined;
    [RootStackName.HELP_AND_SUPPORT]: undefined;
    [RootStackName.PROFILE]: undefined;
    [RootStackName.OTHER_PROFILE]: undefined;
    [RootStackName.EDIT_PROFILE]: undefined;
    [RootStackName.CHAT_MENU]: undefined;
    [RootStackName.CHAT_SCREEN]: undefined;
    [RootStackName.NOTIFICATION]: undefined;
    [RootStackName.CHECK_TOKEN]: undefined;
    [RootStackName.REPORT_USER]: undefined;
    [WellnessRouteNames.WELLNESS_QUESTION]: undefined;
    [CommunityRouteNames.WRITE_POST]: undefined;
    [CommunityRouteNames.NOTIFICATION_POST_PAGE]: undefined;
};

export type AuthStackParamList = {
    [AuthRouteNames.LOGIN]: undefined;
    [AuthRouteNames.PROFILE]: undefined;
    [AuthRouteNames.OTP]: undefined;
    [AuthRouteNames.FORGOTPASSWORD]: undefined;
    [AuthRouteNames.FORGOTPASSWORDOTP]: undefined;
    [AuthRouteNames.RESETPASSWORD]: undefined;
};

export type QuestionStackParamList = {
    [QuestionsRouteNames.QUESTIONS]: undefined;
};

export type BottomStackParamList = {
    [BottomRouteNames.HOMESTACK]: undefined;
    [BottomRouteNames.DIARYSTACK]: undefined;
};

export type HomeStackParamList = {
    [HomeRouteNames.HOME]: undefined;
    [HomeRouteNames.CHECKIN]: undefined;
    [HomeRouteNames.REFLECTION]: undefined;
    [HomeRouteNames.REFLECTION_LIST]: undefined;
    [HomeRouteNames.REFLECTION_REPORT]: undefined;
};

export type WellnessStackParamList = {
    [WellnessRouteNames.WELLNESS]: undefined;
    [WellnessRouteNames.CREATE_PLAN]: undefined;
    [WellnessRouteNames.MY_PLAN]: undefined;
    [WellnessRouteNames.PROGRESS]: undefined;
    [WellnessRouteNames.BADGES]: undefined;
    [WellnessRouteNames.ADD_PLAN]: undefined;
    [WellnessRouteNames.WELLNESSFIRSTMESSAGE]: undefined;
    [WellnessRouteNames.WELLNESS_LANDING_PAGE]: undefined;
    [WellnessRouteNames.BADGE_DETAILS]: undefined;
};

export type CommunityStackParamList = {
    [CommunityRouteNames.COMMUNITY]: undefined;
    [CommunityRouteNames.COMMUNITY_Message]: undefined;
    [CommunityRouteNames.COMMUNITY_PAGE]: undefined;
    [CommunityRouteNames.REPORT_ABUSIVE]: undefined;
    [CommunityRouteNames.POST_PAGE]: undefined;
    // [CommunityRouteNames.NOTIFICATION_POST_PAGE]: undefined;
};

export type MoreStackParamList = {
    [MoreRouteNames.MORE]: undefined;
    [MoreRouteNames.CONNECTION]: undefined;

    [MoreRouteNames.SETTINGS]: undefined;
    [MoreRouteNames.NOTIFICATION_SETTINGS]: undefined;
};

export type DiaryStackParamList = {
    [DiaryRouteNames.FIRSTDIARY]: undefined;
    [DiaryRouteNames.DIARYTAB]: undefined;
    [DiaryRouteNames.DIARYDETAILS]: undefined;
    [DiaryRouteNames.DIARYDETAILSEDIT]: undefined;
};

export type ScreenProps = NativeStackScreenProps<any>;
