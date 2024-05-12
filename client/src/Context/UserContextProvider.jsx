import React, {Children, useEffect, useState} from "react";

import UserContext from "./UserContext";

const UserContextProvider = ({children}) => {
    
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const toggleIsLoggedIn = () => {
    //     setIsLoggedIn(!isLoggedIn);
    // }

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Error parsing stored user:", error);
                // Handle the error, such as setting a default value
            }
        }
        return {};
    });
    

    // Update local storage whenever isLoggedIn changes
    useEffect(() => {
        localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    // const toggleUser = (newUser) => {
    //     if(user !== null) {
    //         setUser(newUser)
    //     } else {
    //         setUser({});
    //     }
    // };


    // Function to toggle isLoggedIn state
    const toggleIsLoggedIn = () => {
        setIsLoggedIn(prevIsLoggedIn => !prevIsLoggedIn);
    };

    return (
        <UserContext.Provider value={{isLoggedIn,setIsLoggedIn,currentUser, setCurrentUser}} >
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;