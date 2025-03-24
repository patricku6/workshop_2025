import { Container, Title, Text, Button, Grid, Card, Image, TextInput, Select, Group } from '@mantine/core';
import Template from './Template.jsx';
import { IconSearch, IconArrowBack } from '@tabler/icons-react';
import {router} from "@inertiajs/react";

export default function ProductDetailPage({ product }) {

    const addToCart = () => {
        router.post(`/cart/add`, { product_id: product.id });
    }

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                {/* Product Detail Header */}
                <Group position="apart" mb="lg">
                    <Button
                        variant="outline"
                        color="blue"
                        leftIcon={<IconArrowBack size={16} />}
                        onClick={() => window.history.back()}
                    >
                        Terug naar producten
                    </Button>
                    <Title align="center" color="#1c64f2">
                        {product.name}
                    </Title>
                </Group>

                <Grid gutter="xl" align="center">
                    <Grid.Col span={12} md={6}>
                        {/* Product Image */}
                        <Card shadow="sm" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    style={{
                                        objectFit: 'cover',
                                        width: '100%',
                                        height: '350px',
                                        display: 'block',
                                        margin: 'auto',
                                    }}
                                />
                            </Card.Section>
                        </Card>
                    </Grid.Col>

                    <Grid.Col span={12} md={6}>
                        {/* Product Info */}
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text weight={500} size="xl" color="#1c64f2">{product.name}</Text>
                            <Text size="sm" color="dimmed" mt="sm">{product.description}</Text>
                            <Text weight={500} mt="md" size="lg" color="green">{product.price}</Text>
                            <Text size="sm" color="dimmed" mt="sm">Categorie: {product.category}</Text>
                            <Text size="sm" color="dimmed" mt="sm">Beschikbare voorraad: {product.stock}</Text>

                            {/* Add to Cart / Quantity selector */}
                            <TextInput
                                label="Aantal"
                                placeholder="Aantal"
                                type="number"
                                min={1}
                                max={product.stock}
                                defaultValue={1}
                                mt="md"
                            />
                            <Button variant="filled" color="#1c64f2" fullWidth mt="md" onClick={addToCart}>
                                Voeg toe aan winkelwagen
                            </Button>
                        </Card>
                    </Grid.Col>
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
