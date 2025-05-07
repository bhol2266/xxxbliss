import Head from "next/head";
import { LoginForm } from "../../components/LoginStuffs/LoginForm";

const Login = () => {
    return (
        <div>


            <Head>
                <title>Join Chutlunds for free !</title>
                <meta name="description"
                    content="Most popular and trending porn searches - HD porn videos and adult movies- Chutlunds" />

            </Head>
            <LoginForm />

            <p className='text-[#323232] font-semibold font-inter text-sm my-20 mb-[500px] text-center lg:text-lg'>Note: Your data is 100% safe with us. Feel safe to login. </p>

        </div>

    )
};
export default Login;