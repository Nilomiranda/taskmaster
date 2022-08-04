import { Outlet } from "@remix-run/react";
import Dashboard from "~/components/layout/Dashboard";

export default function AccountPage() {
    return (
        <Dashboard>
            <Outlet />
        </Dashboard>
    )
}