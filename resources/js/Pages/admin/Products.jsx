import {
    Title,
    Card,
    Button,
    Modal,
    TextInput,
    NumberInput,
    Divider,
    FileInput,
    Textarea,
    SimpleGrid,
    Select,
    Image,
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus, IconUpload } from "@tabler/icons-react";
import AdminTemplate from "../components/AdminTemplate.jsx";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { router } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import noImage from "../../../../public/images/noImage.png";

export default function Products({ products, categories }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
    const [product, setProduct] = useState({
        name: "",
        image: "",
        description: "",
        price: 0,
        stock: 0,
        category_id: 0,
    });
    const [productToDelete, setProductToDelete] = useState(null);
    const [editing, setEditing] = useState(false);

    const editProduct = (id) => {
        const selectedProduct = products.find(product => product.id === id);
        if (selectedProduct) {
            setEditing(true);
            setProduct({
                ...selectedProduct,
                price: Number(selectedProduct.price),        // FIXED
                stock: Number(selectedProduct.stock),        // FIXED
                category_id: Number(selectedProduct.category_id), // FIXED
            });
            open();
        }
    };

    const saveProduct = async () => {
        const formData = new FormData();
        formData.append("id", product.id || "");
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", Number(product.price));          // FIXED
        formData.append("stock", Number(product.stock));          // FIXED
        formData.append("category_id", Number(product.category_id)); // FIXED

        if (product.image instanceof File) {
            formData.append("image", product.image);
        }

        try {
            if (editing) {
                await router.post("/admin/products/update", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onError: (error) => toast.error(error.message),
                });
                setEditing(false);
            } else {
                await router.post("/admin/products/create", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onError: (error) => toast.error(error.message),
                });
            }
            close();
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    };

    const handleDeleteClick = (id) => {
        const selectedProduct = products.find(product => product.id === id);
        if (selectedProduct) {
            setProductToDelete(selectedProduct);
            openDeleteModal();
        }
    };

    const deleteProduct = () => {
        if (productToDelete) {
            router.post(`/admin/products/delete`, { id: productToDelete.id });
            closeDeleteModal();
        }
    };

    return (
        <AdminTemplate>
            <div className="p-6">
                <Title order={1} className="text-indigo-600 mb-6">Producten</Title>
                <Button leftSection={<IconPlus />} color="green" onClick={() => {
                    setProduct({ id: null, name: "", price: 0, stock: 0, image: "", description: "", category_id: 0 });
                    open();
                }}>
                    Voeg product toe
                </Button>
                <SimpleGrid cols={3} spacing="lg" className="mt-4">
                    {products.map((product) => (
                        <Card shadow="sm" padding="lg" radius="md" withBorder key={product.id}>
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
                            <Title order={4} className="mt-4">{product.name}</Title>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-indigo-600 font-bold mt-2">
                                ${Number(product.price).toFixed(2)} {/* FIXED */}
                            </p>
                            <p className="text-gray-500">Voorraad: {product.stock}</p>
                            <p className="text-gray-500">
                                Categorie: {categories.find(category => category.id === product.category_id)?.name ?? 'Geen'}
                            </p>
                            <div className="flex justify-between mt-4">
                                <Button size="xs" color="blue" leftSection={<IconEdit size={14} />} onClick={() => editProduct(product.id)}>Bewerk</Button>
                                <Button size="xs" color="red" leftSection={<IconTrash size={14} />} onClick={() => handleDeleteClick(product.id)}>Verwijder</Button>
                            </div>
                        </Card>
                    ))}
                </SimpleGrid>
            </div>

            {/* Modal voor toevoegen/bewerken */}
            <Modal opened={opened} onClose={close} title={<Title order={2} className="text-indigo-600">{product.id ? "Bewerk product" : "Voeg product toe"}</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <TextInput label="Naam" placeholder="Product naam" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                    <FileInput
                        label="Afbeelding"
                        accept="image/*"
                        onChange={(file) => setProduct({ ...product, image: file })}
                        leftSection={<IconUpload size={20} />}
                    />
                    <Textarea label="Beschrijving" placeholder="Product beschrijving" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                    <Select
                        label="Categorie"
                        placeholder="Selecteer een categorie"
                        data={categories.map(category => ({ value: String(category.id), label: category.name }))}
                        value={String(product.category_id)}
                        onChange={(value) => setProduct({ ...product, category_id: Number(value) })}
                    />
                    <NumberInput label="Prijs" value={product.price} onChange={(value) => setProduct({ ...product, price: value })} prefix="$" min={0} />
                    <NumberInput label="Voorraad" value={product.stock} onChange={(value) => setProduct({ ...product, stock: value })} min={0} />
                    <Divider my="sm" />
                    <div className="flex justify-between mt-4">
                        <Button onClick={close} color="gray" variant="outline">Terug</Button>
                        <Button color="blue" onClick={saveProduct}>{product.id ? "Sla wijzigingen op" : "Voeg product toe"}</Button>
                    </div>
                </div>
            </Modal>

            {/* Delete modal */}
            <Modal opened={deleteModalOpened} onClose={closeDeleteModal} title={<Title order={2} className="text-red-600">Verwijder Product</Title>} centered size="sm" padding="lg" radius="lg">
                <div className="p-4">
                    <Divider my="sm" />
                    <p>Weet je zeker dat je {productToDelete ? productToDelete.name : "dit product"} wilt verwijderen?</p>
                    <Divider my="sm" />
                    <div className="flex justify-between mt-4">
                        <Button onClick={closeDeleteModal} color="gray" variant="outline">Annuleren</Button>
                        <Button color="red" onClick={deleteProduct}>Verwijder Product</Button>
                    </div>
                </div>
            </Modal>

            <ToastContainer />
        </AdminTemplate>
    );
}
