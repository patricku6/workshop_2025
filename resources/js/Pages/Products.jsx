import { Container, Title, Text, Button, Grid, Card, Image, TextInput, Select } from '@mantine/core';
import Template from './Template.jsx';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import noImage from '../../../public/images/noImage.png';
import {router} from "@inertiajs/react";

export default function ProductPage({ products, categories, search = null, category = null }) {
    const [searchTerm, setSearchTerm] = useState('');

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
        setSortOption(value);
        setTitle(categories.find((category) => category.id === Number(value))?.name || "Onze Fietsen");
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
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Text align="center" color="dimmed">
                            {filteredProducts.length} producten gevonden
                        </Text>
                    </Grid.Col>
                </Grid>

                {/* Product List */}
                <Grid mt="md" gutter="lg">
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <Grid.Col span={4} sm={6} md={4} lg={3} key={product.id}>
                                <Card shadow="sm" padding="lg" radius="md" withBorder className="hover:scale-105 transition-all">
                                    <Card.Section>
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
                                    <Text weight={500} mt="md" size="lg">{product.name}</Text>
                                    <Text size="sm" color="dimmed">{product.description}</Text>
                                    <Text size="sm" color="dimmed"
                                          mt="sm">Categorie: {categories.find((category) => category.id === product.category_id)?.name || 'Geen'}</Text>
                                    <Text weight={500} mt="md" color="green">{product.price}</Text>
                                    <Button variant="filled" mt="md" fullWidth color="#1c64f2"
                                            onClick={() => handleProductClick(product.id)}>
                                        Bekijk
                                    </Button>
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
        </>
    );
}
