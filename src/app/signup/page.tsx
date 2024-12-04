import SignupForm from "@/components/SignupForm";
import Image from "next/image";

export default function SignupPage() {
    return (
        <div className="container mx-auto">  
        <div className="flex justify-center py-8 w-full">
        <div className="flex items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
        <Image
          src="https://premiersoft.net/imagens/logo_premiersoft.png"
          alt="Logo"
          width={250}
          height={250}
        />
      </div>
            </div>             
            <SignupForm />
        </div>
    );
}