import { ThemeProvider } from "@/components/theme-provider";
import Header from "./components/Header";
import { Toaster } from "sonner";
import { useGetUserDetailsQuery } from "./redux/slices/api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "./redux/slices/appslice";
import AllRoutes from "./AllRoutes";

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
