import {Anchor, Button, Checkbox, PasswordInput, TextInput} from "@mantine/core";
import Template from "./Template.jsx";
import {toast, ToastContainer} from "react-toastify";
import {router} from "@inertiajs/react";
import {useState} from "react";
import {IconMail, IconLock, IconUser} from "@tabler/icons-react";

export default function Login() {
    const emailIcon = <IconMail size={18} stroke={1.5} />;
    const userIcon = <IconUser size={18} stroke={1.5} />;
    const lockIcon = <IconLock size={18} stroke={1.5} />;
    const [error, setError] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });


    function handleSubmit(event) {
        event.preventDefault();

        if (error) {
            return;
        }

        if (!data.username || !data.email || !data.password) {
            toast.error("Alle velden zijn verplicht");
            return;
        } else if (!termsAccepted) {
            setError(true);
            return;
        }

        setLoading(true);
        router.post("/create", data, {
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
                setError(true);
                setLoading(false);
            },
            onSuccess: () => {
                toast.success("Gefeliciteerd! Je account is aangemaakt!");
                setError(false);
                setLoading(false);
            },
        });
    }

    return (
        <>
            <div className="select-none">
                <Template />
                <div className="flex justify-center items-center h-screen">
                    <form className="w-80 p-5 border border-gray-300 rounded-lg" onSubmit={handleSubmit}>
                        <h2 className="text-2xl mb-5">Registreer</h2>
                        <TextInput
                            label="Gebruikersnaam"
                            placeholder="Jan Jansen"
                            leftSection={userIcon}
                            className="text-black"
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                        />

                        <TextInput
                            label="Email"
                            placeholder="janjansen@gmail.com"
                            leftSection={emailIcon}
                            className="text-black"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />

                        <PasswordInput
                            label="Wachtwoord"
                            placeholder="123"
                            leftSection={lockIcon}
                            className="text-black"
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />

                        <Checkbox
                            className={`mt-4 ${error ? "text-red-500" : ""}`}
                            color="indigo"
                            label="Ik accepteer de algemene voorwaarden"
                            onChange={(e) => {
                                setTermsAccepted(e.target.checked);
                                setError(false);
                            }}
                            selected={error}
                        />
                        <Button
                            className="mt-4"
                            type="submit"
                            fullWidth
                            loading={loading}
                        >
                            Registreer
                        </Button>
                        <Anchor href="/login" className="block mt-4 text-center">Heb je al een account? Login</Anchor>
                    </form>
                </div>
                <ToastContainer position="bottom-right" />
            </div>
        </>
    );
}
