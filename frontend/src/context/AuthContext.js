import { createContext, useReducer, useEffect } from "react";



export const AuthContext = createContext()

/**
 * @function authReducer
 * @description A reducer function to manage the state transitions for user authentication. It listens for 'LOGIN' and 'LOGOUT' actions to set or clear the user state.
 * 
 * @param {Object} state - The current state of authentication, containing the user object or null.
 * @param {Object} action - An object that contains the action type and payload.
 * 
 * @returns {Object} The updated state with the user object or null.
 */
export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))

        if (user) {
            dispatch({type: "LOGIN", payload: user})
        }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}