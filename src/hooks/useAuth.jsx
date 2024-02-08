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
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.get("token")}`
        },
        body: JSON.stringify({ title, content, isPublished })
      });

      // if (response.status !== 200) {
      //   console.log("post update failed");
      //   return 0;
      // } else {
      //   console.log("Post updated successfully");
      //   return 1;
      // }

      return response.status === 200;
    }

    const validatePostCreation = async (title, content, isPublished) => {
      
      const response = await fetch(`http://localhost:3000/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.get("token")}`
        },
        body: JSON.stringify({ title, content, isPublished })
      });

      if (response.status !== 200) {
        console.log("Post creation failed");
        return;
      } else {
        console.log("Post created successfully");
      }

    }

    const validatePageCreation = async (title, isPublished) => {
      
      const response = await fetch(`http://localhost:3000/api/page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${cookies.get("token")}`
        },
        body: JSON.stringify({title, isPublished})
      });

      if (response.status !== 200) {
        console.log("Page creation failed");
      } else {
        console.log("Page created successfully");
      }
    }

    const validatePostRemoval = async (id) => {

      const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${cookies.get('token')}`
        }
      });

      if (response.status !== 200) {
        console.log('Post removal failed');
      } else {
        console.log('Post removed successfully');
      }
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
        validatePostRemoval,
        validatePostCreation,
        validatePageCreation,
        handleLogOut
    }
}

export default useAuth;