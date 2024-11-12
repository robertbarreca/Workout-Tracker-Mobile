/**
 * @fileoverview Authentication Context Hook
 * 
 * @description This custom hook allows all child components to access the authentication context, providing methods for logging in and logging out.
 * 
 * @dependencies ../context/AuthContext
 */

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"

/**
 * @function useAuthContext
 * @description A custom hook that provides access to the authentication context. It ensures that the context is available and throws an error if used outside of the AuthContextProvider.
 * 
 * @returns {Object} The current authentication context, including the user state and dispatch methods for authentication actions.
 * 
 * @throws {Error} If the hook is used outside of an AuthContextProvider, an error is thrown to prevent accessing undefined context.
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error("useAuthContext must be wrapped in a AuthContextProvider")
    }
    return context
}