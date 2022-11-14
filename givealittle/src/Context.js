import { createContext } from 'react';

export const NameContext = createContext({});           //sets globalcontext for name

export const LoginContext = createContext({});          //sets global context for login

export const CartContext = createContext({});           //sets global context for cart

export const CarddetailsContext = createContext({});           //sets global context for card

export const AddressContext = createContext({});           //sets global context for address

export const isEligibleContext = createContext({});        // sets a global variable to check if user has all details

export const CurrentUserContext = createContext({});        // sets a global variable for user details (name , email etc)