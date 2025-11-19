// import React, { createContext, useContext, useState } from "react";

// type AuthContextType = {
//   selectedAuth: Auth | null;
//   setSelectedAuth: (event: Auth | null) => void;
//   openQuickView: boolean;
//   setOpenQuickView: (open: boolean) => void;
//   showQuickView: (event: Auth) => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [selectedAuth, setSelectedAuth] = useState<Auth | null>(null);
//   const [openQuickView, setOpenQuickView] = useState(false);

//   const showQuickView = (event: Auth) => {
//     setSelectedAuth(event);
//     setOpenQuickView(true);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         selectedAuth,
//         setSelectedAuth,
//         openQuickView,
//         setOpenQuickView,
//         showQuickView,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context)
//     throw new Error("useAuthContext must be used inside AuthProvider");
//   return context;
// };