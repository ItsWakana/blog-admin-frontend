export const getUserInfo = async (token) => {

    const userResponse = await fetch("http://localhost:3000/api/me", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (userResponse.status !== 200) {
      console.log(`Error code:${userResponse.status}. Issue logging in`);
    }
    const { user } = await userResponse.json();


    return user; 
}