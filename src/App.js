import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ChatPage } from "./component/chatpage/ChatPage";
import { Contact } from "./component/contact/Contact";
import { userContacts } from "./component/Data";
import { ErrorPage } from "./component/error/ErrorPage";
import { Login } from "./component/form/Login";
import { Signup } from "./component/form/Signup";
import { ProtectedRoute } from "./component/protected/ProtectedRoute";
export const ContactContext = createContext();
function App() {
  const [contacts, setContacts] = useState(userContacts);
  const [loggedInUser, setLoggedInUser] = useState({
    userName: "",
    userId: "",
  });
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/contact",
      element: (
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/contact/chatpage",
          element: (
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, loggedInUser, setLoggedInUser }}
    >
      <RouterProvider router={router} />
    </ContactContext.Provider>
  );
}

export default App;
