import React from "react";
import LogInForm from "../../components/login-form";

const SignIn = () => {
  return (
    <main>
      <section>
        <div className="container">
          <h1>Log in, Please</h1>
          <LogInForm />
        </div>
      </section>
    </main>
  );
};

export default SignIn;
