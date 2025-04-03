import {Container, Title, Text, Button, Grid, Card, Image, TextInput, Group, NumberInput, Badge} from '@mantine/core';
import Template from './Template.jsx';
import { IconArrowBack } from '@tabler/icons-react';
import {router} from "@inertiajs/react";
import {toast} from "react-toastify";
import noImage from "../../../public/images/noImage.png";
import {useEffect, useState} from "react";

export default function ProductDetailPage({ product, category }) {

    const [loggedIn, setLoggedIn] = useState(false);

    const addToCart = () => {
        router.post(`/cart/add`, { product_id: product.id }, {
            onSuccess: () => {
            toast.success('Product toegevoegd aan winkelwagen');
            }
        });
    }

    const fetchLoggedInUser = async () => {
        const response = await fetch('/isLoggedIn', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return response.json();
        }

        return null;
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchLoggedInUser();
            setLoggedIn(userData === 1);

        };

        fetchData();
    }, []);

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                <Group position="apart" mb="lg">
                    <Button
                        variant="outline"
                        color="#1c64f2"
                        leftIcon={<IconArrowBack size={16} />}
                        onClick={() => window.history.back()}
                    >
                        Terug naar producten
                    </Button>
                </Group>

                <Grid gutter="xl" align="center">
                    <Grid.Col span={6} md={6}>
                        <Card shadow="sm" radius="md" withBorder>
                            <Card.Section>
                                <Image
                                    src={product.image ? `/${product.image}` : noImage}
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

                    <Grid.Col span={6} md={6}>
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text weight={500} size="xl">{product.name}</Text>
                            <Text size="sm" color="dimmed" mt="sm">{product.description}</Text>
                            <Text mt="md" size="lg" className="text-indigo-600 font-bold mt-2">
                                {product.sale > 0 ? (
                                    <span>
                                        <Badge mb="sm" variant="outline" color="lightgreen">{product.sale}% korting</Badge>
                                        <br />
                                        <span
                                            className="line-through text-red-500">€{Number(product.price).toFixed(2)}</span> €{Number(product.price - (product.price * product.sale / 100)).toFixed(2)}
                                    </span>
                                ) : (
                                    <span>€{Number(product.price).toFixed(2)}</span>
                                )}
                            </Text>
                            <Text size="sm" color="dimmed" mt="sm">Categorie: {category.name}</Text>
                            <Text size="sm" color="dimmed" mt="sm">Beschikbare voorraad: {product.stock}</Text>

                            <NumberInput
                                label="Aantal"
                                placeholder="Aantal"
                                type="number"
                                min={1}
                                max={product.stock}
                                defaultValue={1}
                                mt="md"
                            />
                            <Button variant="filled" color="#1c64f2" fullWidth mt="md" onClick={addToCart} disabled={!loggedIn}>
                                {loggedIn ? 'Voeg toe aan winkelwagen' : 'Log in om te bestellen'}
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
