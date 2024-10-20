import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import { Toaster } from "sonner";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appslice";
import AllRoutes from "./AllRoutes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";

function App() {

  const {data, error} = useGetUserDetailsQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
    
    if(data){
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }
    else if(error){
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }
  }, [data, error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          username: user.displayName! || "Default Username",
          email: user.email!,
          picture: user.photoURL!,
        };
        dispatch(updateCurrentUser(userData));
        dispatch(updateIsLoggedIn(true));
      } else {
        dispatch(updateCurrentUser({}));
        dispatch(updateIsLoggedIn(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Toaster position="bottom-right" theme="dark" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header></Header>
        <AllRoutes/>
      </ThemeProvider>
    </>
  );
}

export default App;
