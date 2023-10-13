import { Pages } from "../utils/Constants";

// Shorthand
export type Page = keyof typeof Pages;
// Alternative
// type Page = (typeof Pages)[keyof typeof Pages];
