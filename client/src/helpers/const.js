export const AUTH_ROUTE = "api/auth";
export const USER_ROUTE = "api/user";
export const CONTACT_ROUTE = "api/contact";

// Auth
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;
export const GET_USER_ROUTE = `${AUTH_ROUTE}/me`;

//user
export const UPDATE_USER_ROUTE = `${USER_ROUTE}/updateMe`;

//contact
export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTE}/search`;

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
