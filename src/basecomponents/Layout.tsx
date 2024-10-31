import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Nav } from "./Nav";
import { IState } from "../store/interfaces/IState";
import { Outlet } from "react-router-dom";

export const Layout = () => {

  const clsLayoutArticle = "font-HankenG font-bold h-full bg-bg-light dark:bg-bg-dark";

  const flagsState = useSelector((state: IState) => state.Flags);

  return (
    <>
     <article className={clsLayoutArticle + (flagsState.darkMode ? " dark" : "")}>
      <Header />      
      <Nav />
      {flagsState.darkMode}
      <section className="z-02">
        <Outlet />
      </section>
      {/* <Footer /> */}
    </article>
    </>
  );
}

export default Layout;