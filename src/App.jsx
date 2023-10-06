import BlogList from "./components/BlogList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import BlogPostPage from "./components/BlogPostPage";
import useAuth from "./hooks/useAuth";
import Cookies from "universal-cookie";

function App() {

  const cookies = new Cookies();

  const {
    currentUser,
    isLoggedIn,
    validateLogin,
    validatePostEdit,
    handleLogOut
  } = useAuth(cookies);


  //INSTEAD OF RENDERING THE BLOG POSTS ON DEFAULT ROUTE, IF THE USER IS NOT LOGGED IN WE SHOULD DIRECT THEM TO THE SIGN IN PAGE. IF THEY ARE SIGNED IN. ROUTING TO THE BLOGLIST COMPONENT IS FINE.

  const router = createBrowserRouter([
    {
      element: <Layout isLoggedIn={isLoggedIn} handleLogOut={handleLogOut}/>,
      children: [
        {
          path: "/",
          element: isLoggedIn ? <BlogList currentUser={currentUser} isLoggedIn={isLoggedIn} cookies={cookies}/> : <Login validateLogin={validateLogin} isLoggedIn={isLoggedIn}/>
        },
        {
          path: "/login",
          element: <Login validateLogin={validateLogin} isLoggedIn={isLoggedIn}/>
        },
        {
          path: "/posts/:postId",
          element: <BlogPostPage isLoggedIn={isLoggedIn} currentUser={currentUser} validatePostEdit={validatePostEdit} />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>

  )
}

export default App;