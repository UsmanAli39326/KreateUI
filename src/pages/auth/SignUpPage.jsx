// src/pages/Auth/SignUp/SignUpPage.jsx
import React from "react";
import SignUpHeader from "../../components/AuthPages/SignUpHeader";
import SignUpLeftPanel from "../../components/AuthPages/SignUpLeftPanel";
import SignUpFormCard from "../../components/AuthPages/SignUpFormCard";
import SignUpFooter from "../../components/AuthPages/SignUpFooter";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <SignUpHeader />

      <main className="grow flex items-center justify-center px-4 py-12">
        <div className="max-w-275 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SignUpLeftPanel />
          <SignUpFormCard
            onSubmit={(payload) => console.log("signup:", payload)}
            onContinueGoogle={() => console.log("google signup")}
            onContinueGithub={() => console.log("github signup")}
          />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
}
