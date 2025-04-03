import { Container, Title, Text, Card, Image, Grid, Button, TextInput, Textarea } from '@mantine/core';
import Template from './Template.jsx';
import fietsenwinkel from '../../../public/images/fietsenwinkel.jpg';
import {useState} from "react";
import {toast} from "react-toastify";
import {router} from "@inertiajs/react";

export default function Contact() {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleSubmit(event) {
        event.preventDefault();

        if (!data.name || !data.email || !data.message) {
            toast.error("Alle velden zijn verplicht");
            return;
        }

        setLoading(true);
        router.post("/contact/send", data, {
            onError: (errors) => {
                Object.values(errors).forEach((error) => {
                    toast.error(error);
                });
                setLoading(false);
            },
            onSuccess: () => {
                toast.success("Gefeliciteerd! Je account is aangemaakt!");
                setLoading(false);
                router.get("/");
            },
        });
    }

    return (
        <>
            <Template />
            <Container size="lg" py="xl">
                <form onSubmit={handleSubmit}>
                    <Title align="center" my="lg" color="#1c64f2">
                        Neem Contact Op
                    </Title>
                    <Text align="center" size="lg" color="dimmed">
                        Heb je vragen? Neem gerust contact met ons op via het formulier of bezoek onze winkel!
                    </Text>

                    <Grid mt="xl" gutter="lg">
                        {/* Contact Formulier */}
                        <Grid.Col span={12} md={6}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Title order={3} color="#1c64f2">Stuur ons een bericht</Title>
                                <TextInput label="Naam" placeholder="Jouw naam" required mt="md" onChange={(e) => setData({ ...data, name: e.target.value })}/>
                                <TextInput label="E-mail" placeholder="jouw@email.com" required mt="md" onChange={(e) => setData({ ...data, email: e.target.value })}/>
                                <Textarea label="Bericht" placeholder="Schrijf hier je bericht..." required mt="md" minRows={4} onChange={(e) => setData({ ...data, message: e.target.value })}/>
                                <Button fullWidth mt="md" color="#1c64f2">Verstuur</Button>
                            </Card>
                        </Grid.Col>

                        {/* Winkelinformatie */}
                        <Grid.Col span={12} md={6}>
                            <Image
                                src={fietsenwinkel}
                                alt="Onze winkel"
                                radius="md"
                            />
                            <Card shadow="sm" padding="lg" radius="md" withBorder mt="md">
                                <Title order={3} color="#1c64f2">Onze Winkel</Title>
                                <Text mt="md">
                                    📍 J.F. Kennedylaan 49, 7001 DV Doetinchem
                                </Text>
                                <Text mt="md">
                                    📞 012-3456789
                                </Text>
                                <Text mt="md">
                                    ✉️ info@ofjp.nl
                                </Text>
                                <Button loading={loading} color="#1c64f2" fullWidth mt="md" component="a" href="https://www.google.com/maps/place/Graafschap+College,+locatie+J.F.+Kennedylaan/@51.9675272,6.2958006,16z/data=!3m1!4b1!4m6!3m5!1s0x47c784c716ae2ee7:0xe3665d8a07166e2a!8m2!3d51.9675272!4d6.2983755!16s%2Fg%2F1tf6lfkh?entry=ttu&g_ep=EgoyMDI1MDMzMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">
                                    Bekijk op Google Maps
                                </Button>
                            </Card>
                        </Grid.Col>
                    </Grid>
                </form>
            </Container>
        </>
    );
}
