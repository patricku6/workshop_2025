import { Button, Text } from "@mantine/core";
import AdminDashboard from "./AdminNavbar.jsx";

export default function AdminTemplate({ children }) {
    return (
        <div className="flex">
            <div className="w-1/4">
                <AdminDashboard />
            </div>
            <div className="w-3/4">
                {children}
            </div>
        </div>
    );
}
