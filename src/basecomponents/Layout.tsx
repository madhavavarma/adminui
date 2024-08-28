import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Nav } from "./Nav";
import { IState } from "../store/interfaces/IState";


export interface IProps {
    children: React.ReactNode
}

export const Layout = (props: IProps) => {

  const clsLayoutArticle = "font-HankenG font-bold h-full bg-bg-light dark:bg-bg-dark";

  const state = useSelector((state: IState) => state);

  return (
    <>
     <article className={clsLayoutArticle + (state.Flags.darkMode ? " dark" : "")}>
      <Header />      
      <Nav />
      {state.Flags.darkMode}
      <section className="z-02">
        {props.children}
      </section>
      {/* <Footer /> */}
    </article>
    </>
  );
}

export default Layout;