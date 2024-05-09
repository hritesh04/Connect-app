import Image from "next/image";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-screen 
        flex-col 
        items-center 
        justify-center  
        bg-[#1f2028]
        bg-[url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/whatsapp_1_0-sixteen_nine.jpg?VersionId=w8CKD.KnLMOlG.IpFVRvCVjevbHs21zr&size=690:388')]
        bg-no-repeat bg-cover
      "
    >
      <div className="bg-gray-100 rounded-md md:p-4 flex flex-col md:flex-row items-center justify-center">
        <div className="sm:w-full sm:max-w-md mb-2 p-10">
          <img
            className="h-32 md:h-full w-auto mx-auto mb-4"
            src="https://img.freepik.com/premium-vector/social-connect-connecting-people-logo-template_416562-1071.jpg"
            alt="Logo"
          />
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
