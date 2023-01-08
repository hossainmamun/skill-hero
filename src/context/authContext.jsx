import { createContext, useEffect, useReducer } from 'react';

export const authContext = createContext();

// auth reducer function
export const authReducer = (state, action) => {
   switch (action.type) {
      case 'SIGNUP':
         return {
            user: action.payload,
         };
      case 'LOGIN':
         return {
            user: action.payload,
         };
      case 'LOGOUT':
         return {
            user: null,
         };
      default:
         return state;
   }
};

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, { user: null });

   // console.log(state);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
         dispatch({ type: 'SIGNUP', payload: user });
      }
   }, []);

   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
         dispatch({ type: 'LOGIN', payload: user });
      }
   }, []);

   return (
      <authContext.Provider value={{ ...state, dispatch }}>
         {children}
      </authContext.Provider>
   );
};
