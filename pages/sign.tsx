import { signIn, signOut } from "next-auth/react";

export default function Sign() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <img
          src="/images/kakao_login_large_wide.png"
          alt="카카오 로그인"
          onClick={() => signIn("kakao", { callbackUrl: "/" })}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</button>
      </div>
    </div>
  );
}
