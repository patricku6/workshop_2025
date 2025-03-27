import { Container, Title, Text, Button, Grid, Card, Image, TextInput, Select, Group, Badge } from '@mantine/core';
import Template from './Template.jsx';
import { IconSearch, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import noImage from '../../../public/images/noImage.png';
import {router} from "@inertiajs/react";
import {toast, ToastContainer} from "react-toastify";
import classes from '../../css/FeatureCard.module.css';

export default function ProductPage({ products, categories, search = null, category = null }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [opened, setOpened] = useState(false);

    const [title, setTitle] = useState(search !== null ? "Resultaten voor '" + search + "'" : (category !== null ? category || "Onze Fietsen" : "Onze Fietsen"));
    const [sortOption, setSortOption] = useState(null);

    const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const sortedProducts = (() => {
        if (!sortOption) return filteredProducts;

        switch (sortOption) {
            case 'price_low_high':
                return [...filteredProducts].sort((a, b) => a.price - b.price);
            case 'price_high_low':
                return [...filteredProducts].sort((a, b) => b.price - a.price);
            case 'name_az':
                return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
            case 'name_za':
                return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
            default:
                return filteredProducts;
        }
    })();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const handleProductClick = (id) => {
        router.visit(`/product/${id}`);
    }

    const handleCategoryChange = (value) => {
        router.visit(`/products/category/${value}`);
        setSortOption(value);
        setTitle(categories.find((category) => category.id === Number(value))?.name || "Onze Fietsen");
    }

    const addToCart = (id) => {
        router.post(`/cart/add`, { product_id: id }, {
            onSuccess: () => {
                toast.success('Product toegevoegd aan winkelwagen');
            }
        });
    }

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                {/* Product Page Header */}
                <Title align="center" my="lg" color="#1c64f2">
                    {title}
                </Title>
                <Text align="center" size="lg" color="dimmed">
                    Bekijk ons assortiment van hoogwaardige fietsen
                </Text>

                {/* Product filters */}
                <Grid mt="lg" gutter="md">
                    <Grid.Col span={6} sm={12}>
                        <TextInput
                            placeholder="Zoek op fiets"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            leftSection={<IconSearch size={16} stroke={1.5} color="#1c64f2" />}
                            fullWidth
                        />
                    </Grid.Col>
                    <Grid.Col span={6} sm={12}>
                        <Select
                            placeholder="Filter"
                            value={sortOption}
                            onChange={handleSortChange}
                            data={[
                                { value: 'price_low_high', label: 'Sorteer op prijs (laag naar hoog)' },
                                { value: 'price_high_low', label: 'Sorteer op prijs (hoog naar laag)' },
                                { value: 'name_az', label: 'Sorteer op naam (A-Z)' },
                                { value: 'name_za', label: 'Sorteer op naam (Z-A)' },
                            ]}
                            fullWidth
                            rightSection={
                                <IconChevronDown
                                    size={18}
                                    color="#1c64f2"
                                    style={{ transform: opened ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
                                />
                            }
                            onDropdownOpen={() => setOpened(true)}
                            onDropdownClose={() => setOpened(false)}
                        />
                    </Grid.Col>
                    <Grid.Col span={12} sm={12}>
                        <Select
                            placeholder="Categorie"
                            value={String(sortOption)}
                            onChange={(value) => handleCategoryChange(value)}
                            data={categories.map((category) => ({
                                value: String(category.id),
                                label: category.name,
                            }))}
                            fullWidth
                            rightSection={<IconChevronDown size={18} color="#1c64f2" />}
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Text align="center" color="dimmed">
                            {filteredProducts.length} producten gevonden
                        </Text>
                    </Grid.Col>
                </Grid>

                <Grid mt="md" gutter="lg">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <Grid.Col span={4} sm={6} md={4} lg={3} key={product.id}>
                                <Card
                                    withBorder
                                    radius="md"
                                    className={classes.card}
                                    style={{
                                        opacity: product.stock === 0 ? 0.5 : 1,
                                        pointerEvents: product.stock === 0 ? 'none' : 'auto',
                                    }}
                                >
                                    <Card.Section className={classes.imageSection}>
                                        <img
                                            src={product.image ? `/${product.image}` : noImage}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = noImage;
                                            }}
                                            style={{
                                                objectFit: 'cover',
                                                width: '100%',
                                                height: '200px',
                                                display: 'block',
                                                margin: 'auto',
                                            }}
                                        />
                                    </Card.Section>

                                    <Group justify="space-between" mt="md">
                                        <div>
                                            <Text fw={500}>{product.name}</Text>
                                            <Text fz="sm" c="dimmed">
                                                {categories.find((category) => category.id === product.category_id)?.name || 'Geen'}
                                            </Text>                                        </div>
                                        {product.sale > 0 &&(
                                            <Badge variant="outline" color="lightgreen">{product.sale}% off</Badge>
                                        )}
                                    </Group>

                                    <Card.Section className={classes.section} mt="md">
                                        <Text fz="sm" c="dimmed" className={classes.label}>Beschrijving</Text>
                                        <Text>{product.description}</Text>
                                        <Group gap={8} mb={-8}>

                                        </Group>
                                    </Card.Section>

                                    <Card.Section className={classes.section}>
                                        <Group gap={30}>
                                            <div>
                                                <Text fz="sm" c="dimmed" mt="sm">{product.stock} op voorraad</Text>
                                                <Text weight={500} mt="md">€{product.price},00</Text>
                                            </div>

                                            <Button
                                                onClick={() => handleProductClick(product.id)}
                                                variant="outline"
                                                mt="md"
                                                fullWidth
                                                color="#1c64f2"
                                                radius="xl"
                                                style={{ flex: 1 }}
                                                disabled={product.stock === 0}
                                            >
                                                Bekijk dit product
                                            </Button>
                                            <Button
                                                onClick={() => addToCart(product.id)}
                                                variant="filled"
                                                fullWidth
                                                color="#1c64f2"
                                                radius="xl"
                                                disabled={product.stock === 0}
                                            >
                                                In winkelwagen
                                            </Button>
                                        </Group>
                                    </Card.Section>
                                </Card>
                            </Grid.Col>
                        ))
                    ) : (
                        <Text align="center" size="lg" color="dimmed">
                            Geen producten gevonden.
                        </Text>
                    )}
                </Grid>

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
            <ToastContainer position="bottom-right" />
        </>
    );
}
