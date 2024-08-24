import { Header } from "./Header";
import { MainAlert } from "./MainAlert";


export interface IProps {
    children: React.ReactNode
}

export const Layout = (props: IProps) => {
  return (
    <>
     <main className="bg-blue font-HankenG font-bold h-full">
      <Header />
      <MainAlert />
      <section className="z-02">
        {props.children}
      </section>
      {/* <Footer /> */}
    </main>
    </>
  );
}

export default Layout;