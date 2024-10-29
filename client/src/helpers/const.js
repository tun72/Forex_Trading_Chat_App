export const AUTH_ROUTE = "api/auth";
export const USER_ROUTE = "api/user";
export const CONTACT_ROUTE = "api/contact";
export const MESSAGES_ROUTE = `api/message`;
export const CHANNEL_ROUTE = `api/channel`;

// Auth
export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/logout`;
export const GET_USER_ROUTE = `${AUTH_ROUTE}/me`;

//user
export const UPDATE_USER_ROUTE = `${USER_ROUTE}/updateMe`;

//contact
export const GET_DM_CONTACT = CONTACT_ROUTE;
export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTE}/search`;
export const GET_ALL_CONTACT = `${CONTACT_ROUTE}/all`;

//messages
export const GET_MESSAGES = MESSAGES_ROUTE;
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTE}/upload`;

//channel
export const CREATE_CHANNEL = CHANNEL_ROUTE;
export const GET_USER_CHANNEL_ROUTE = `${CHANNEL_ROUTE}/all`;




export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
