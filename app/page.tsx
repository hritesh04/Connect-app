import Image from "next/image";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <div
      className="
        flex 
        min-h-full 
        flex-cols
        md:flex-row 
        items-center
        justify-center  
        bg-[#1f2028]
        bg-[url('https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/whatsapp_1_0-sixteen_nine.jpg?VersionId=w8CKD.KnLMOlG.IpFVRvCVjevbHs21zr&size=690:388')]
        bg-no-repeat bg-cover
      "
    >
      <div className=" flex items-center rounded-md p-4 justify-center bg-gray-100">
        <div className="sm:w-full sm:max-w-md mr-4">
          <img
            className="h-32 mx-auto w-auto"
            src="https://img.freepik.com/premium-vector/social-connect-connecting-people-logo-template_416562-1071.jpg"
            alt="Logo"
          />
          <h2
            className="
          mt-6 
          text-center 
          text-3xl 
          font-bold 
          tracking-tight 
          text-black
          "
          >
            Sign in to your account
          </h2>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
