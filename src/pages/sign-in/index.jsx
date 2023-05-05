import { SignIn, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function SignInUser() {
  return (
    <>
      <div className="grid place-items-center h-screen">
        <SignIn redirectUrl="/profile" />
      </div>
    </>
  );
}
