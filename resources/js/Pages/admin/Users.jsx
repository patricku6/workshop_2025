import { Table, Title, Badge, Card, Menu, Button, Group, Modal, TextInput, Checkbox, Divider } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import AdminTemplate from "../components/AdminTemplate.jsx";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { router } from "@inertiajs/react";

export default function Users({ users, setUsers }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        is_admin: false
    });

    const [updatingUser, setUpdatingUser] = useState({
        id: null,
        name: '',
        email: '',
        is_admin: false
    });

    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const editUser = (id) => {
        const selectedUser = users.find(user => user.id === id);
        if (selectedUser) {
            setUser(selectedUser);
            open();
        }
    };

    const saveUser = () => {
        const updatedData = users.map(u => u.id === user.id ? user : u);
        const updatedUser = users.find(u => u.id === user.id);
        if (!updatedUser) {
            console.error('User not found');
        } else {
            router.post("/admin/users/update", user);
        }
        close();
    };

    const deleteUser = () => {
        if (userToDelete) {
            router.post(`/admin/users/delete`, { id: userToDelete.id });
            closeDeleteModal();
        }
    };

    const handleDeleteClick = (id) => {
        const selectedUser = users.find(user => user.id === id);
        if (selectedUser) {
            setUserToDelete(selectedUser);
            openDeleteModal();
        }
    };

    return (
        <>
            {/* Modal for Editing User */}
            <Modal opened={opened} onClose={close} title={<Title order={2} className="text-indigo-600">Bewerk gebruiker</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <div className="flex flex-col gap-4">
                        <TextInput
                            label="Naam"
                            placeholder="John Doe"
                            value={user.name}
                            size="sm"
                            radius="md"
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                        <TextInput
                            label="Email"
                            placeholder="email@example.com"
                            value={user.email}
                            size="sm"
                            radius="md"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <Checkbox
                            label="Admin"
                            checked={user.is_admin}
                            size="sm"
                            radius="md"
                            onChange={(event) => setUser({ ...user, is_admin: event.target.checked })}
                        />
                        <Divider my="sm" />
                        <div className="flex justify-between mt-4">
                            <Button onClick={close} color="gray" size="sm" radius="md" variant="outline">Terug</Button>
                            <Button color="#1c64f2" size="sm" radius="md" onClick={saveUser}>Opslaan</Button>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Modal for Delete Confirmation */}
            <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title={<Title order={2} className="text-red-600">Verwijder Gebruiker</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <p>Weet je zeker dat je <span className="font-bold">{userToDelete ? userToDelete.name : 'this user'}</span>  wilt verwijderen?</p>
                    <Divider my="sm" />
                    <div className="flex justify-between mt-4">
                        <Button onClick={closeDeleteModal} color="gray" size="sm" radius="md" variant="outline">Terug</Button>
                        <Button color="red" size="sm" radius="md" onClick={deleteUser}>Verwijder</Button>
                    </div>
                </div>
            </Modal>

            <AdminTemplate>
                <div className="p-6">
                    <Title order={1} className="text-indigo-600 mb-6">
                        Gebruikers
                    </Title>
                    <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-4">
                        <Table striped highlightOnHover>
                            <thead className="bg-indigo-100 dark:bg-indigo-600">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Naam</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Admin</th>
                                <th className="p-3 text-left">Acties</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-indigo-50 dark:hover:bg-indigo-700">
                                    <td className="p-3">{user.id}</td>
                                    <td className="p-3">{user.name}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        {user.is_admin ? (
                                            <Badge color="green">Ja</Badge>
                                        ) : (
                                            <Badge color="red">Nee</Badge>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <Menu withArrow position="bottom-end" shadow="md">
                                            <Menu.Target>
                                                <Button variant="subtle" size="xs" px="xs">
                                                    <IconDotsVertical size={16} />
                                                </Button>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item icon={<IconEdit size={14} />} onClick={() => editUser(user.id)} color="#1c64f2">
                                                    Bewerk
                                                </Menu.Item>
                                                <Menu.Item icon={<IconTrash size={14} />} color="red" onClick={() => handleDeleteClick(user.id)}>
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
