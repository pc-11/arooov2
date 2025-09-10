interface GoogleOauthButtonProps {}

export function GoogleOauthButton({}: GoogleOauthButtonProps) {
  // console.log(import.meta.env);
  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async></script>
      <div
        id="g_id_onload"
        data-client_id={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
        data-context="use"
        data-ux_mode="popup"
        data-login_uri={import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URI}
        data-nonce="asdfasdfadf"
        data-auto_select="true"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="icon"
        data-shape="square"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
      ></div>
    </div>
  );
}
