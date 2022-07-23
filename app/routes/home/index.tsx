import { LoaderFunction, redirect } from "@remix-run/node"

export const loader: LoaderFunction = () => {
    return redirect('/home/tasks')
}

export default function Home() {
    return null;
}