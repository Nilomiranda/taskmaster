import { Outlet } from "@remix-run/react";
import Dashboard from "~/components/layout/Dashboard";

export default function HomePage() {
    return (
        <Dashboard>
            <Outlet />
        </Dashboard>
    )
}