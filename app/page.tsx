import Image from "next/image";
import AuthForm from "./components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-col 
        justify-center 
        sm:px-6 
        lg:px-8 
        bg-[#131313]
      "
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="h-32 mx-auto w-auto"
          src="https://i.ibb.co/1vC8gb7/output-onlinepngtools.png"
          alt="Logo"
        />
        <h2
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-white
          "
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default Auth;
