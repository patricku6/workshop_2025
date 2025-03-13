import { Container, Title, Text, Button, Grid, Card, Image, TextInput } from '@mantine/core';
import Template from './Template.jsx';
import { IconSearch } from '@tabler/icons-react';

export default function ProductPage() {
    // Example data - Replace this with your database data
    const products = [
        {
            id: 1,
            name: "Gazelle",
            description: "Want dat is echt gezellig",
            image: "https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            price: "€899",
        },
        {
            id: 2,
            name: "Giant",
            description: "Voor de echte timos",
            image: "https://plus.unsplash.com/premium_photo-1671148894611-3c91b6d3c92a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW4lMjBiaWtlfGVufDB8fDB8fHww",
            price: "€1,199",
        },
        {
            id: 3,
            name: "Stadsfiets",
            description: "Comfortabel en stijlvol door de stad",
            image: "https://images.unsplash.com/photo-1632082565410-a692ab2537c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9tYSUyMGZpZXRzfGVufDB8fDB8fHww",
            price: "€649",
        }
    ];

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                {/* Product Page Header */}
                <Title align="center" my="lg" color="#1c64f2">
                    Onze Producten
                </Title>
                <Text align="center" size="lg" color="dimmed">
                    Bekijk ons assortiment van hoogwaardige fietsen
                </Text>

                {/* Optional: Search Bar */}
                <Grid justify="center" mt="lg">
                    <Grid.Col span={6}>
                        <TextInput
                            placeholder="Zoek op fiets"
                            leftSection={<IconSearch size={16} stroke={1.5} color="#1c64f2" />}
                            fullWidth
                        />
                    </Grid.Col>
                </Grid>

                {/* Product List */}
                <Grid mt="md" gutter="lg">
                    {products.map((product) => (
                        <Grid.Col span={4} sm={6} md={4} lg={3} key={product.id}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:scale-105 transition-all">
                                <Card.Section>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            objectFit: 'cover',
                                            width: '100%',
                                            height: '200px',
                                            display: 'block',
                                            margin: 'auto',
                                        }}
                                    />
                                </Card.Section>
                                <Text weight={500} mt="md" size="lg">{product.name}</Text>
                                <Text size="sm" color="dimmed">{product.description}</Text>
                                <Text weight={500} mt="md" color="green">{product.price}</Text>
                                <Button variant="filled" mt="md" fullWidth color="#1c64f2">
                                    Bekijk
                                </Button>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>

                {/* Optional: Additional Information / Contact Section */}
                <Card shadow="md" mt="xl" padding="xl" radius="md" withBorder>
                    <Title order={3} color="#1c64f2">
                        Neem contact met ons op
                    </Title>
                    <Text mt="md">
                        Bezoek onze winkel of neem contact op voor meer informatie over onze fietsen en services.
                    </Text>
                    <Button variant="outline" color="#1c64f2" mt="md">
                        Contacteer ons
                    </Button>
                </Card>
            </Container>
        </>
    );
}
