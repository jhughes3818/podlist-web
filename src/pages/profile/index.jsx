import { SignIn, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useUser, UserProfile } from "@clerk/nextjs";
import { useState } from "react";

export default function ResetPassword() {
  const { user } = useUser();
  const [newPassword, setPassword] = useState("");

  const changePassword = async (password) => {
    await user.updatePassword(newPassword);
  };

  return (
    <>
      {/* <div className="grid place-items-center h-screen">
        <div>
          <h1>Reset Password</h1>
          <input
            type="password"
            placeholder="New Password"
            name="password"
            onChange={(e) => {
              setPassword(e);
            }}
          />
          <button type="submit" onClick={() => changePassword()}>
            Reset Password
          </button>
        </div>
      </div> */}
      <div className="grid place-items-center h-screen">
        <UserProfile />
      </div>
    </>
  );
}
