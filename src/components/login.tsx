import { MainAlert } from "../basecomponents/MainAlert";
import { FluidContainer } from "../basecomponents/FluidContainer";



export default function Login() {


    // const signIn = () => {
    //     dispatch(FlagsActions.setHeader(true));
    //     dispatch(FlagsActions.setFooter(true));
    // }

    return <section className="bg-gray-50 dark:bg-gray-900  h-screen">
        <FluidContainer>
            <MainAlert message="Login Screen" />   
        </FluidContainer>
  </section>
}