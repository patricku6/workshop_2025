import { Container, Title, Text, Button, Grid, Card, Image, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import Template from "./Template.jsx";
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from "react";
import {router} from "@inertiajs/react";

export default function Home() {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                {/* Hero Section */}
                <Title align="center" my="lg" color="#1c64f2">Welkom bij <span className="text-[#1c64f2]">OFJP</span>!</Title>
                <Text align="center" size="lg" color="dimmed">De beste fietsen voor elk avontuur</Text>

                {/* Carousel Slider */}
                <Carousel withIndicators height={400} mt="lg"
                          plugins={[autoplay.current]}
                          loop
                          onMouseEnter={autoplay.current.stop}
                          onMouseLeave={autoplay.current.reset}
                >

                    <Carousel.Slide>
                            <Image
                                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg"
                                alt="Fiets 1"
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                    display: 'block',
                                    margin: 'auto',
                                }}
                            />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image
                            src="https://images.pexels.com/photos/1595483/pexels-photo-1595483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Fiets 2"
                            style={{ objectFit: 'cover', display: 'block', margin: 'auto', height: '100%' }}
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <Image
                            src="https://images.pexels.com/photos/1208777/pexels-photo-1208777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="Fiets 3"
                            style={{ objectFit: 'cover', display: 'block', margin: 'auto', height: '100%' }}
                        />
                    </Carousel.Slide>
                </Carousel>

                {/* Producten Sectie */}
                <Title order={2} mt="xl" color="#1c64f2">Onze Populaire Merken</Title>
                <Grid mt="md">
                    <Grid.Col span={4}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:scale-105 transition-all h-full flex flex-col">
                            <Card.Section className="h-48 flex justify-center items-center">
                                <Image src="../../images/gazelle.jpg" alt="Gazelle" className="h-full w-full object-cover" />
                            </Card.Section>
                            <Text weight={500} mt="md">Gazelle</Text>
                            <Text size="sm" color="dimmed" className="flex-grow">Want dat is echt gezellig</Text>
                            <Button variant="filled" mt="md" fullWidth color="#1c64f2" onClick={() => router.visit('/products/gazelle')}>Bekijk</Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:scale-105 transition-all h-full flex flex-col">
                            <Card.Section className="h-48 flex justify-center items-center">
                                <Image src="../../images/giant.jpg" alt="Giant" className="h-full w-full object-cover" />
                            </Card.Section>
                            <Text weight={500} mt="md">Giant</Text>
                            <Text size="sm" color="dimmed" className="flex-grow">Voor de echte timos</Text>
                            <Button variant="filled" mt="md" fullWidth color="#1c64f2" onClick={() => router.visit('/products/giant')}>Bekijk</Button>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:scale-105 transition-all h-full flex flex-col">
                            <Card.Section className="h-48 flex justify-center items-center">
                                <Image src="../../images/batavus.jpg" alt="Stadsfiets" className="h-full w-full object-cover" />
                            </Card.Section>
                            <Text weight={500} mt="md">Batavus</Text>
                            <Text size="sm" color="dimmed" className="flex-grow">De perfecte stadsfiets</Text>
                            <Button variant="filled" mt="md" fullWidth color="#1c64f2" onClick={() => router.visit('/products/batavus')}>Bekijk</Button>
                        </Card>
                    </Grid.Col>
                </Grid>

                {/* Contact Sectie */}
                <Card shadow="md" mt="xl" padding="xl" radius="md" withBorder>
                    <Title order={3} color="#1c64f2">Neem contact met ons op</Title>
                    <Text mt="md">Bezoek onze winkel of neem contact op voor meer informatie over onze fietsen en services.</Text>
                    <Group mt="md">
                        <Button variant="outline" color="#1c64f2">Bel ons</Button>
                        <Button variant="filled" color="#1c64f2">E-mail ons</Button>
                    </Group>
                </Card>
            </Container>
        </>
    );
}

