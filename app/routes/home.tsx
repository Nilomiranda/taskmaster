import { Outlet } from "@remix-run/react";
import Dashboard from "~/components/layout/Dashboard";
import {LoaderArgs} from "@remix-run/node";
import {checkSessionAndRedirect} from "~/api/session/sesssion.server";

export async function loader({ request }: LoaderArgs) {
    return checkSessionAndRedirect(request);
}
export default function HomePage() {
    return (
        <Dashboard>
            <Outlet />
        </Dashboard>
    )
}