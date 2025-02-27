import {Anchor, Button, PasswordInput, TextInput} from "@mantine/core";
import Template from "./Template.jsx";
import {toast, ToastContainer} from "react-toastify";
import {router} from "@inertiajs/react";
import {useState} from "react";
import {IconMail, IconLock} from "@tabler/icons-react";

export default function Login() {
    const emailIcon = <IconMail size={18} stroke={1.5} />;
    const lockIcon = <IconLock size={18} stroke={1.5} />;

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });


    function handleSubmit(event) {
        event.preventDefault();

        if (!data.email || !data.password) {
            toast.error("Alle velden zijn verplicht");
            return;
        }

        router.post("/authenticate", data, {
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
            }
        });
    }

    return (
        <>
            <div className="select-none">
                <Template/>
                <div className="flex justify-center items-center h-screen">
                    <form className="w-80 p-5 border border-gray-300 rounded-lg" onSubmit={handleSubmit}>
                        <h2 className="text-2xl mb-5">Login</h2>
                        <TextInput
                            label="Email"
                            placeholder="janjansen@gmail.com"
                            leftSection={emailIcon}
                            className="text-white"
                            onChange={(e) => setData({...data, email: e.target.value})}
                        />
                        <PasswordInput
                            label="Password"
                            placeholder="123"
                            leftSection={lockIcon}
                            className="text-white"
                            onChange={(e) => setData({...data, password: e.target.value})}
                        />
                        <Button
                            className="mt-4"
                            type="submit"
                            fullWidth
                        >
                            Log in
                        </Button>
                        <Anchor href="/register" className="block mt-4 text-center">Heb je nog geen account?
                            Registreer</Anchor>
                    </form>
                </div>
                <ToastContainer/>
            </div>
        </>
    );
}
