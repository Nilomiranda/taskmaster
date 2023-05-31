import {LoaderArgs} from "@remix-run/node";
import {deleteSession} from "~/api/session/sesssion.server";

export async function loader({ request }: LoaderArgs) {
    return deleteSession(request);
}
export default function Logout() {
    return null;
}