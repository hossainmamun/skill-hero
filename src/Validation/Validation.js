import * as yup from 'yup';

// login validation
export const loginValidation = yup.object().shape({
   email: yup.string().email().required(),
   password: yup.string().min(6).max(16).required(),
});

// signup validation
export const signUpValidation = yup.object().shape({
   userName: yup.string().max(25).required(),
   mobileNumber: yup.string().min(11).max(11).required(),
   email: yup.string().email().required(),
   password: yup.string().min(6).max(16).required(),
});
