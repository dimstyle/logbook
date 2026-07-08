export default function Login(){
    return(
        <>
        <div className="flex h-screen w-full justify-center items-center">
            <div>
                <span className="flex bg-[#FF5454] justify-center items-center font-freckle text-3xl p-5 w-100 rounded-tl-lg rounded-tr-lg">
                    <h1 className="text-white">Login</h1>
                    <h1 className="text-[#560000]">User</h1>
                </span>
                <span className="flex bg-[#C0BDBD] flex-col p-5 rounded-bl-lg rounded-br-lg gap-3">
                    <h2>Username</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Email</h2>
                    <input type="email" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Password</h2>
                    <input type="password" className="w-full p-1.5 bg-white rounded-lg" />
                    <div className="flex justify-center mt-5">
                        <a href="/" className="flex justify-center items-center bg-[#FF5454] w-20 rounded-lg p-1.5 cursor-pointer text-white ">Login</a>
                    </div>
                </span>
            </div>
        </div>
        </>
    )
}