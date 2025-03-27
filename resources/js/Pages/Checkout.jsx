import {
    Container,
    Title,
    Text,
    Button,
    Card,
    Group,
    Divider,
    Stack,
    Box,
    ActionIcon,
    Paper,
    TextInput,
    Select,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Template from './Template.jsx';
import noImage from '../../../public/images/noImage.png';
import { router } from '@inertiajs/react';
import { IconArrowBack, IconX } from '@tabler/icons-react';

export default function CheckoutPage({ cart }) {
    const cartItems = Object.values(cart);
    const totalPrice = cartItems
        .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
        .toFixed(2);

    const removeItem = (id) => {
        router.post(`/cart/remove`, { product_id: id }, {
            onSuccess: () => {
                router.reload();
            },
        });
    };

    const form = useForm({
        initialValues: {
            name: '',
            address: '',
            city: '',
            zip: '',
            paymentMethod: '',
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Naam is te kort' : null),
            address: (value) => (value.length < 5 ? 'Vul een adres in' : null),
            city: (value) => (value.length < 2 ? 'Vul een stad in' : null),
            zip: (value) => (/^\d{4}[A-Z]{2}$/.test(value) ? null : 'Postcode moet 4 cijfers + 2 hoofdletters zijn'),
            paymentMethod: (value) => (!value ? 'Selecteer een betaalmethode' : null),
        },
    });

    const handleCheckout = (values) => {
        const payload = {
            ...values,
            cart: cartItems,
        };

        router.post('/checkout', payload, {
            onSuccess: () => {
                alert('Bestelling succesvol geplaatst!');
                router.visit('/');
            },
        });
    };

    return (
        <>
            <Template />
            <Container size="lg" py="xl" className="select-none">
                <Group position="apart" mb="lg">
                    <Button
                        variant="outline"
                        color="blue"
                        leftIcon={<IconArrowBack size={16} />}
                        onClick={() => window.history.back()}
                    >
                        Terug naar producten
                    </Button>
                    <Title color="#1c64f2">Winkelwagen</Title>
                </Group>

                {cartItems.length === 0 ? (
                    <Stack align="center" justify="center" spacing="sm" mt="xl">
                        <Text size="xl" className="flex items-center gap-4" fw={600} align="center">Je winkelwagen is leeg <span className="text-4xl">😢</span></Text>
                        <Text size="sm" color="dimmed" align="center">
                            Voeg producten toe om verder te gaan met afrekenen.
                        </Text>
                        <Text style={{ fontSize: '8rem' }}>🛒</Text>
                        <Button
                            mt="md"
                            color="#1c64f2"
                            onClick={() => router.visit('/products')}
                        >
                            Maak ons blij!
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Stack spacing="md">
                            {cartItems.map((item) => (
                                <Card key={item.id} shadow="sm" radius="md" withBorder p="md">
                                    <Group align="center" justify="space-between" noWrap>
                                        <Group align="center" spacing="md" noWrap>
                                            <Box
                                                component="img"
                                                src={item.image ? `/${item.image}` : noImage}
                                                alt={item.name}
                                                width={80}
                                                height={80}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    flexShrink: 0,
                                                }}
                                            />
                                            <Box>
                                                <Text fw={600} size="md">{item.name}</Text>
                                                <Text size="sm" c="dimmed">Aantal: {item.quantity}</Text>
                                                <Text size="sm" c="green">
                                                    € {(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </Text>
                                            </Box>
                                        </Group>
                                        <ActionIcon
                                            variant="light"
                                            color="red"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <IconX size={18} />
                                        </ActionIcon>
                                    </Group>
                                </Card>
                            ))}
                        </Stack>

                        <Divider my="xl" />

                        <Paper withBorder shadow="md" p="xl" radius="md" mt="xl">
                            <Title order={4} mb="md" color="#1c64f2">Factuurgegevens</Title>

                            <form onSubmit={form.onSubmit(handleCheckout)}>
                                <Stack spacing="sm">
                                    <TextInput
                                        label="Volledige naam"
                                        placeholder="Jan Jansen"
                                        {...form.getInputProps('name')}
                                        required
                                    />
                                    <TextInput
                                        label="Adres"
                                        placeholder="Straatnaam 123"
                                        {...form.getInputProps('address')}
                                        required
                                    />
                                    <TextInput
                                        label="Stad"
                                        placeholder="Amsterdam"
                                        {...form.getInputProps('city')}
                                        required
                                    />
                                    <TextInput
                                        label="Postcode"
                                        placeholder="1234AB"
                                        {...form.getInputProps('zip')}
                                        required
                                    />
                                    <Select
                                        label="Betaalmethode"
                                        placeholder="Kies betaalmethode"
                                        data={[
                                            { value: 'ideal', label: 'iDEAL' },
                                            { value: 'paypal', label: 'PayPal' },
                                            { value: 'creditcard', label: 'Creditcard' },
                                        ]}
                                        {...form.getInputProps('paymentMethod')}
                                        required
                                    />

                                    <Divider my="sm" />

                                    <Group position="apart">
                                        <Text size="lg" fw={700}>Totaal</Text>
                                        <Text size="lg" fw={700} color="green">€ {totalPrice}</Text>
                                    </Group>

                                    <Button type="submit" color="#1c64f2" fullWidth mt="md">
                                        Bestelling plaatsen
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </>
                )}
            </Container>
        </>
    );
}
