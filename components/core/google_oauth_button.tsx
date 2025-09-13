import { useFetcher } from "react-router";

interface GoogleOauthButtonProps {}

export function GoogleOauthButton({}: GoogleOauthButtonProps) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/signin">
      <button
        className="w-10 h-10 bg-white border-1 border-black rounded-lg"
        type="submit"
      ></button>
    </fetcher.Form>
  );
}
