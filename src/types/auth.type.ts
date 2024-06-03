export interface LoginFormValues {
    userInfo: object;
    accessToken: string;
    email: string;
    password: string;
}

export interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface OtpSendFormValue {
    otp: string;
}
export interface OTPSendForgotPassFormValues {
    email: string;
}

export interface OTPSendFormValues {
    otp: string;
}

export interface ForgotPasswordFormValues {
    password: string
    otp: string;
}

export interface IUpdatePasswordFormValue {
    oldPassword: string;
    newPassword: string;
}
export interface IProfileFormValue {
    username: string;
    name: string;
    email: string;
    about: string;
}

export interface IAddressFormValue {
    firstName: string;
    lastName: string;
    address1: string;
    address2: string;
    city: string;
    postCode: string;
    country: string;
    state: string;
    phoneNumber: string;
}
