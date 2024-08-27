import { Header } from "./Header";
import { Nav } from "./Nav";


export interface IProps {
    children: React.ReactNode
}

export const Layout = (props: IProps) => {

  const clsLayoutArticle = "font-HankenG font-bold h-full bg-bg-light dark:bg-bg-dark";

  return (
    <>
     <article className={clsLayoutArticle}>
      <Header />      
      <Nav />
      <section className="z-02">
        {props.children}
      </section>
      {/* <Footer /> */}
    </article>
    </>
  );
}

export default Layout;