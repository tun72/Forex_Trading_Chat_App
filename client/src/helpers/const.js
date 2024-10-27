export const AUTH_ROUTE = "api/auth";
export const USER_ROUTE = "api/user";
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_ROUTE = `${AUTH_ROUTE}/me`;
export const UPDATE_USER_ROUTE = `${USER_ROUTE}/updateMe`;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
