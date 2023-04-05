import { SignOutButton } from "@clerk/nextjs";

export default function SignOut() {
  return (
    <>
      <div className="grid place-items-center">
        <SignOutButton />
      </div>
    </>
  );
}
