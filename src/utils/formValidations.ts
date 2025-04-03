export const validateEmail = (email: string) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return [];

    const errors = [];

    const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    const isValidEmail = emailRegex.test(trimmedEmail);

    if (!isValidEmail) {
        errors.push('Invalid email format');
    }

    return errors;
};

export const validatePassword = (password: string) => {
    const trimmedPassword = password.trim();
    if (!trimmedPassword) return [];

    const errors = [];

    if (trimmedPassword.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword)) {
        errors.push('Password must contain at least one special character');
    }

    return errors;
};
