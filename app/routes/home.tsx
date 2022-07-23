import { Outlet } from "@remix-run/react";
import VerticalNabBar from "~/components/layout/VerticalNavBar";

export default function HomePage() {
    return (
        <VerticalNabBar>
            <Outlet />
        </VerticalNabBar>
    )
}