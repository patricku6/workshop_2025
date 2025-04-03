import { Table, Title, Badge, Card, Menu, Button, Group, Modal, Divider, Text } from "@mantine/core";
import { IconDotsVertical, IconEye, IconTrash } from "@tabler/icons-react";
import AdminTemplate from "../components/AdminTemplate.jsx";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { router } from "@inertiajs/react";

export default function Purchases({ purchases }) {
    const [viewModalOpened, { open: openViewModal, close: closeViewModal }] = useDisclosure(false);
    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);

    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const handleViewClick = (purchase) => {
        setSelectedPurchase(purchase);
        openViewModal();
    };

    const handleDeleteClick = (purchase) => {
        setSelectedPurchase(purchase);
        openDeleteModal();
    };

    const deletePurchase = () => {
        if (selectedPurchase) {
            router.post(`/admin/purchases/delete`, { id: selectedPurchase.id });
            closeDeleteModal();
        }
    };

    return (
        <>
            {/* View Modal */}
            <Modal opened={viewModalOpened} onClose={closeViewModal} title="Details Aankoop" centered size="lg">
                {selectedPurchase && (
                    <div className="p-4">
                        <Text>ID: {selectedPurchase.id}</Text>
                        <Text>Gebruiker ID: {selectedPurchase.user_id}</Text>
                        <Text>Datum: {new Date(selectedPurchase.created_at).toLocaleString()}</Text>
                        <Divider my="sm" />
                        <Text weight={500} mb="sm">Items:</Text>
                        {Object.values(selectedPurchase.items).map((item, i) => (
                            <Group key={i} position="apart">
                                <Text>{item.name} × {item.quantity}</Text>
                                <Text>€{(item.quantity * (item.price || 0)).toFixed(2)}</Text>
                            </Group>
                        ))}
                        <Divider my="sm" />
                        <Group position="apart">
                            <Text weight={600}>Totaal</Text>
                            <Text weight={600}>€{(selectedPurchase.bedrag / 100).toFixed(2)}</Text>
                        </Group>
                    </div>
                )}
            </Modal>

            {/* Delete Modal */}
            <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title="Verwijder Aankoop" centered size="sm">
                <div className="p-4">
                    <p>Weet je zeker dat je aankoop <strong>#{selectedPurchase?.id}</strong> wilt verwijderen?</p>
                    <Divider my="sm" />
                    <div className="flex justify-between">
                        <Button variant="outline" onClick={closeDeleteModal}>Annuleer</Button>
                        <Button color="red" onClick={deletePurchase}>Verwijder</Button>
                    </div>
                </div>
            </Modal>

            <AdminTemplate>
                <div className="p-6">
                    <Title order={1} className="text-indigo-600 mb-6">Aankopen</Title>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Table striped highlightOnHover>
                            <thead className="bg-indigo-100 dark:bg-indigo-600">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Gebruiker</th>
                                <th className="p-3 text-left">Datum</th>
                                <th className="p-3 text-left">Totaal</th>
                                <th className="p-3 text-left">Voldaan</th>
                                <th className="p-3 text-left">Acties</th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchases.map((purchase) => (
                                <tr key={purchase.id}>
                                    <td className="p-3">{purchase.id}</td>
                                    <td className="p-3">{purchase.username}</td>
                                    <td className="p-3">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                    <td className="p-3">€{(purchase.bedrag / 100).toFixed(2)}</td>
                                    <td className="p-3">
                                        <Badge color={purchase.voldaan ? "green" : "red"}>
                                            {purchase.voldaan ? "Ja" : "Nee"}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <Menu withArrow position="bottom-end" shadow="md">
                                            <Menu.Target>
                                                <Button variant="subtle" size="xs" px="xs">
                                                    <IconDotsVertical size={16} />
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item icon={<IconEye size={14} />} onClick={() => handleViewClick(purchase)}>
                                                    Bekijk
                                                </Menu.Item>
                                                <Menu.Item icon={<IconTrash size={14} />} color="red" onClick={() => handleDeleteClick(purchase)}>
                                                    Verwijder
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            </AdminTemplate>
        </>
    );
}
