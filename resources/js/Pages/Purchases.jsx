import { Container, Title, Card, Text, Badge, Group, Divider } from '@mantine/core';
import Template from './Template.jsx';


export default function Purchases({ purchases }) {
    return (
        <>
            <Template />
            <Container size="lg" py="xl">
                <Title align="center" mb="xl" color="#1c64f2">Aankopen</Title>

                {purchases.map((purchase) => (
                    <Card key={purchase.id} shadow="sm" radius="md" withBorder mb="lg">
                        <Group position="apart" mb="xs">
                            <Text weight={500}>Aankoop ID: #{purchase.id}</Text>
                            <Badge color={purchase.voldaan ? 'green' : 'red'} variant="light">
                                {purchase.voldaan ? 'Voldaan' : 'Openstaand'}
                            </Badge>
                        </Group>

                        <Text size="sm" color="dimmed">Datum: {new Date(purchase.created_at).toLocaleString()}</Text>

                        <Divider my="sm" />

                        <Text weight={500} mb="sm">Items:</Text>
                        {Object.values(purchase.items).map((item, index) => (
                            <Group key={index} position="apart">
                                <Text>{item.name} × {item.quantity}</Text>
                                <Text>€{(item.quantity * item.price).toFixed(2)}</Text>
                            </Group>
                        ))}

                        <Divider my="sm" />
                        <Group position="apart">
                            <Text weight={600}>Totaal</Text>
                            <Text weight={600}>€{(purchase.bedrag / 100).toFixed(2)}</Text>
                        </Group>
                    </Card>
                ))}
            </Container>
        </>
    );
}
