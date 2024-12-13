import { useState } from 'react';
import { useNavigate } from "react-router";


function Login() {
    let navigate = useNavigate();

    return (
        <div className="">
            <img src="/public/assets/ShapeTownBg.png" className='absolute top-0 left-0 z-0 object-cover h-full w-full' />

            <div className='z-10 relative h-screen flex items-center ml-32'>
                <div className='relative'>
                    <img src="public/assets/shapeTownSign.png" className='relative' height={"920"} width={"705"} />
                    <button className='absolute bottom-6 left-0 w-full flex justify-center' onClick={() => { navigate("/game") }}>
                        <img src="public/assets/loginConnect.png" className='' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;