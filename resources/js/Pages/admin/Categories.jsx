import { Table, Title, Badge, Card, Menu, Button, Group, Modal, TextInput, Divider } from "@mantine/core";
import { IconDotsVertical, IconTrash, IconPlus } from "@tabler/icons-react";
import AdminTemplate from "../components/AdminTemplate.jsx";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { router } from "@inertiajs/react";

export default function Categories({ categories, setCategories }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [newCategory, setNewCategory] = useState({ name: '' });

    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const addCategory = () => {
        if (newCategory.name.trim() === '') return;
        router.post("/admin/categories/create", newCategory);
        setNewCategory({ name: '' });
        close();
    };

    const deleteCategory = () => {
        if (categoryToDelete) {
            router.post(`/admin/categories/delete`, { id: categoryToDelete.id });
            closeDeleteModal();
        }
    };

    return (
        <>
            {/* Modal voor nieuwe categorie */}
            <Modal opened={opened} onClose={close} title={<Title order={2} className="text-indigo-600">Nieuwe Categorie</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <TextInput
                        label="Naam"
                        placeholder="Categorie naam"
                        value={newCategory.name}
                        size="sm"
                        radius="md"
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <Divider my="sm" />
                    <div className="flex justify-between mt-4">
                        <Button onClick={close} color="gray" size="sm" radius="md" variant="outline">Terug</Button>
                        <Button color="blue" size="sm" radius="md" onClick={addCategory}>Toevoegen</Button>
                    </div>
                </div>
            </Modal>

            {/* Modal voor verwijderen */}
            <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title={<Title order={2} className="text-red-600">Verwijder Categorie</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <p>Weet je zeker dat je <span className="font-bold">{categoryToDelete ? categoryToDelete.name : 'deze categorie'}</span> wilt verwijderen?</p>
                    <Divider my="sm" />
                    <div className="flex justify-between mt-4">
                        <Button onClick={closeDeleteModal} color="gray" size="sm" radius="md" variant="outline">Terug</Button>
                        <Button color="red" size="sm" radius="md" onClick={deleteCategory}>Verwijder</Button>
                    </div>
                </div>
            </Modal>

            <AdminTemplate>
                <div className="p-6">
                    <div className="flex justify-between mb-6">
                        <Title order={1} className="text-indigo-600">Categorieën</Title>
                        <Button leftSection={<IconPlus size={16} />} onClick={open}>Nieuwe Categorie</Button>
                    </div>
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-4">
                        <Table striped highlightOnHover>
                            <thead className="bg-indigo-100 dark:bg-indigo-600">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Naam</th>
                                <th className="p-3 text-left">Acties</th>
                            </tr>
                            </thead>
                            <tbody>
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-700">
                                    <td className="p-3">{category.id}</td>
                                    <td className="p-3">{category.name}</td>
                                    <td className="p-3">
                                        <Menu withArrow position="bottom-end" shadow="md">
                                            <Menu.Target>
                                                <Button variant="subtle" size="xs" px="xs">
                                                    <IconDotsVertical size={16} />
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item icon={<IconTrash size={14} />} color="red" onClick={() => { setCategoryToDelete(category); openDeleteModal(); }}>
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
