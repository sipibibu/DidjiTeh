import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Registration from "./components/Registration/Registration.tsx";
import Login from "./components/Login/Login.tsx";
import { useStores } from "./rootStoreContext.ts";
import "react-toastify/dist/ReactToastify.css";
import { observer } from "mobx-react-lite";
import Tasks from "./pages/Tasks/Tasks.tsx";

function App() {
  const { userStore } = useStores();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/registration"} element={<Registration />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<Tasks />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
