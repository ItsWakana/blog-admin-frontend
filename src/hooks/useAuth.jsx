import { useState, useEffect } from "react"
import { getUserInfo } from "../helper functions/authHelpers";

const useAuth = (cookies) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
  
      const checkAndFetchUser = async () => {
  
        const jwtValue = cookies.get("token");
        if (jwtValue) {
          const fetchedUserInfo = await getUserInfo(jwtValue);
          setCurrentUser(fetchedUserInfo);
          setIsLoggedIn(true);
        }
      }
  
      checkAndFetchUser();
    },[]);

    const validateLogin = async (username, password) => {
    
        const response = await fetch("http://localhost:3000/api/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password})
          });
    
        if (response.status !== 200) {
          console.log("invalid login");
          return;
        }
        const { token } = await response.json();
    
        cookies.set("token", token, {
          expires: new Date(Date.now() + 10 * 60 * 1000)
        });
    
        const fetchedUserInfo = await getUserInfo(token);
        setCurrentUser(fetchedUserInfo);
        setIsLoggedIn(true);
    }

    const validatePostEdit = async (title, content, isPublished, id) => {

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${cookies.get("token")}`
        },
        body: JSON.stringify({ title, content, isPublished })
      });

      if (response.status !== 200) {
        console.log("post update failed");
        return;
      }

      const data = await response.json();
      console.log(data);

    }

    const handleLogOut = async () => {
        cookies.remove("token");

        setCurrentUser(null);
        setIsLoggedIn(false);
    }

    return {
        currentUser,
        isLoggedIn,
        validateLogin,
        validatePostEdit,
        handleLogOut
    }
}

export default useAuth;