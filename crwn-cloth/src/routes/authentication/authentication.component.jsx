// import { async } from "@firebase/util";

import SignUpForm from "../../components/sign-up-form/sing-up-form.component";
import SignInForm from "../../components/sign-in-form /sing-in-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  //   useEffect(async () => {
  //     const response = await getRedirectResult(auth); // here after sign in page is remounted we will get the redirect details based on the auth.
  //     console.log(response);
  //   }, []);

  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
