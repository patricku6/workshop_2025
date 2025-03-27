import { Container, Title, Text, Card, Image, Grid } from '@mantine/core';
import Template from './Template.jsx';
import fietsenwinkel from '../../../public/images/fietsenwinkel.jpg';
import fietsenwinkelGeschiedenis from '../../../public/images/fietsenwinkelGeschiedenis.jpg';

export default function AboutUs() {
    return (
        <>
            <Template />
            <Container size="lg" py="xl">
                <Title align="center" my="lg" color="#1c64f2">
                    Over Ons
                </Title>
                <Text align="center" size="lg" color="dimmed">
                    Leer meer over onze passie voor fietsen en duurzaamheid.
                </Text>

                <Grid mt="xl" gutter="lg">
                    <Grid.Col span={12} md={6}>
                        <Image
                            src={fietsenwinkel}
                            alt="Onze winkel"
                            radius="md"
                        />
                    </Grid.Col>
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Title order={3} color="#1c64f2">Onze Missie</Title>
                            <Text mt="md">
                                Wij geloven in hoogwaardige, duurzame fietsen die bijdragen aan een groenere wereld.
                                Onze fietsen zijn zorgvuldig geselecteerd om kwaliteit en comfort te garanderen.
                            </Text>
                        </Card>
                    </Grid.Col>
                </Grid>

                <Grid mt="xl" gutter="lg">
                    <Grid.Col span={12} md={6}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Title order={3} color="#1c64f2">Onze Geschiedenis</Title>
                            <Text mt="md">
                                Al meer dan 100 jaar helpen wij fietsliefhebbers met het vinden van de perfecte fiets.
                                Van stadsfietsen tot e-bikes, wij bieden een breed assortiment en uitstekende service.
                            </Text>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={12} md={6}>
                        <Image
                            src={fietsenwinkelGeschiedenis}
                            alt="Onze geschiedenis"
                            radius="md"
                        />
                    </Grid.Col>
                </Grid>

                <Card shadow="md" mt="xl" padding="xl" radius="md" withBorder>
                    <Title order={3} color="#1c64f2">
                        Kom langs of neem contact op!
                    </Title>
                    <Text mt="md">
                        Bezoek onze winkel of neem contact met ons op voor meer informatie over onze producten en diensten.
                    </Text>
                </Card>
            </Container>
        </>
    );
}
