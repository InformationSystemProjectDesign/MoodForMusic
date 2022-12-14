import Router, { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import RegisterForm from "../../../components/meetups/ChangePasswordForm";

function ChangePasswordPage() {
  const router = useRouter();

  async function ChangePasswordHandler(enteredChangePasswordData) {
    const response = await fetch("/api/ChangePassword", {
      method: "POST",
      body: JSON.stringify(enteredChangePasswordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>註冊</title>
        <meta
          name="description"
          content="Register for the React Meetups!"
        />
      </Head>
      <RegisterForm onChangePassword={ChangePasswordHandler} />
    </Fragment>
  );
}


export default ChangePasswordPage;