import { Card, Grid, Title, Text } from "@mantine/core";
import { AreaChart } from "@mantine/charts";
import AdminTemplate from "./components/AdminTemplate.jsx";

export default function AdminDashboard({ stats, miniGraphs }) {
    const statCards = [
        {
            title: "Gebruikers",
            count: stats.users,
            data: miniGraphs.users,
            color: "teal",
        },
        {
            title: "Producten",
            count: stats.products,
            data: miniGraphs.products,
            color: "orange",
        },
        {
            title: "Aankopen",
            count: stats.purchases,
            data: miniGraphs.purchases,
            color: "indigo",
        },
    ];

    return (
        <AdminTemplate>
            <div className="p-6">
                <Title order={1} className="text-indigo-600 mb-6">Dashboard</Title>

                <Grid>
                    {statCards.map((stat, index) => (
                        <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={index}>
                            <Card
                                withBorder
                                shadow="sm"
                                radius="md"
                                padding="lg"
                                className="hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <Text size="sm" color="dimmed">
                                        {stat.title}
                                    </Text>
                                    <Title order={2} c={stat.color}>
                                        {stat.count}
                                    </Title>
                                </div>

                                {stat.data.length > 1 ? (
                                    <AreaChart
                                        mt="md"
                                        h={120}
                                        data={stat.data}
                                        dataKey="date"
                                        series={[{ name: "value", color: stat.color }]}
                                        withXAxis={false}
                                        withYAxis={false}
                                        curveType="monotone"
                                        withTooltip={false}
                                        withDots
                                    />
                                ) : (
                                    <Text mt="md" size="xs" color="dimmed">
                                        Niet genoeg data om grafiek weer te geven
                                    </Text>
                                )}
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
        </AdminTemplate>
    );
}
