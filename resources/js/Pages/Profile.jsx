import { Button, PasswordInput, TextInput } from "@mantine/core";
import Template from "./Template.jsx";
import { toast, ToastContainer } from "react-toastify";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { IconMail, IconLock, IconUser } from "@tabler/icons-react";

export default function Profile({ user }) {
    const emailIcon = <IconMail size={18} stroke={1.5} />;
    const lockIcon = <IconLock size={18} stroke={1.5} />;
    const userIcon = <IconUser size={18} stroke={1.5} />;
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: user.name || "",
        email: user.email || "",
        password: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (data.password && !data.newPassword && !data.confirmNewPassword) {
            toast.error("Nieuw wachtwoord is verplicht");
            return;
        }
        if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
            toast.error("Nieuwe wachtwoorden komen niet overeen");
            return;
        }

        router.post("/profile-update", data, {
            setLoading: setLoading(true),
            onError: (errors) => {
                setLoading(false);
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            },
            onSuccess: () => {
                setLoading(false);
                toast.success("Profiel succesvol bijgewerkt.");
            }
        });
    }

    return (
        <>
            <div className="select-none">
                <Template />
                <div className="flex justify-center items-center h-screen">
                    <form className="w-80 p-5 border border-gray-300 rounded-lg" onSubmit={handleSubmit}>
                        <h2 className="text-2xl mb-5">Profiel</h2>

                        {/* Name Field */}
                        <TextInput
                            label="Naam"
                            placeholder="Jan Jansen"
                            leftSection={userIcon}
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />

                        {/* Email Field */}
                        <TextInput
                            label="Email"
                            placeholder="johndoe@gmail.com"
                            leftSection={emailIcon}
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />

                        {/* Password Field */}
                        <PasswordInput
                            label="Huidig Wachtwoord"
                            placeholder="********"
                            leftSection={lockIcon}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />

                        {/* New Password Field */}
                        <PasswordInput
                            label="Nieuw Wachtwoord"
                            placeholder="********"
                            leftSection={lockIcon}
                            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                        />

                        {/* Confirm New Password Field */}
                        <PasswordInput
                            label="Bevestig Nieuw Wachtwoord"
                            placeholder="********"
                            leftSection={lockIcon}
                            value={data.confirmNewPassword}
                            onChange={(e) => setData({ ...data, confirmNewPassword: e.target.value })}
                        />

                        <Button loading={loading} className="mt-4" type="submit" fullWidth>
                            Save Changes
                        </Button>
                    </form>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </>
    );
}
