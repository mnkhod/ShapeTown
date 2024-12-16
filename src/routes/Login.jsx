import { useNavigate } from "react-router";
import {
    useAuthModal,
    useAccount
  } from "@account-kit/react";
  import { useUser } from "@account-kit/react";
  

function Login() {
    let navigate = useNavigate();
    const { openAuthModal } = useAuthModal();
    const user = useUser();

    if(user != null){
        navigate("/game")
    }
    

    function openLogin(){
        openAuthModal()
    }


    return (
        <div className="">
            <img src="/public/assets/ShapeTownBg.png" className='absolute top-0 left-0 z-0 object-cover h-full w-full' />

            <div className='z-10 relative h-screen flex items-center ml-32'>
                <div className='relative'>
                    <img src="public/assets/shapeTownSign.png" className='relative' height={"920"} width={"705"} />
                    <button className='absolute bottom-6 left-0 w-full flex justify-center' onClick={() => { openLogin() }}>
                        <img src="public/assets/loginConnect.png" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;