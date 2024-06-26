// import { IUser } from "@/types";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// type IContextType = {
//   user: IUser;
//   isLoading: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   isAuthenticated: boolean;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };

// export const INITIAL_USER = {
//   id: "",
//   name: "",
//   username: "",
//   email: "",
//   imageURL: "",
//   bio: "",
// };

// export const INITIAL_STATE = {
//   user: INITIAL_USER,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false as boolean,
// };

// const AuthContext = createContext<IContextType>(INITIAL_STATE);

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [user, setUser] = useState<IUser>(INITIAL_USER);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   const checkAuthUser = async () => {
//     try {
//       const currentAcc = await getCurrentUser();
//       if (currentAcc) {
//         setUser({
//           id: currentAcc.$id,
//           name: currentAcc.name,
//           username: currentAcc.username,
//           email: currentAcc.email,
//           imageURL: currentAcc.imageURL,
//           bio: currentAcc.bio,
//         });

//         setIsAuthenticated(true);

//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.log(error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (
//       localStorage.getItem("cookieFallback") === "[]" ||
//       localStorage.getItem("cookieFallback") === null
//     ) {
//       navigate("/sign-in");
//     }
//     checkAuthUser();
//   }, []);

//   const value = {
//     user,
//     setUser,
//     isLoading,
//     isAuthenticated,
//     setIsAuthenticated,
//     checkAuthUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useUserContext = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useUserContext must be used within a UserProvider");
//   }
//   return context;
// };
