import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect('/login')
}

export default function Index() {
  return null
}
