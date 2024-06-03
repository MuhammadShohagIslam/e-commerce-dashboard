// custom email validation logic using regex
export const isEmailValidOrPhone = (value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberRegex =
        /^[+]?[0-9]{1,4}[-\s]?\(?[0-9]{1,4}\)?[-\s]?\d{1,10}$/;

    return emailRegex.test(value) || phoneNumberRegex.test(value);
};

export const validEmailCheckRegex = (value: string): boolean => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
};
