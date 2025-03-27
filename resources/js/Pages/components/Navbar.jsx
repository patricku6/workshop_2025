import { useEffect, useState } from "react";
import {
    IconChevronDown,
    IconGenderFemale, IconGenderMale, IconMoodKid,
    IconSearch,
    IconShoppingBag,
    IconMoon, IconSun,
} from '@tabler/icons-react';
import {
    Anchor, Autocomplete,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard, Image,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    Avatar,
    Menu,
} from '@mantine/core';
import Logo from '../../../../public/images/logo.png';
import classes from './NavBar.module.css';
import {useDisclosure} from "@mantine/hooks";
import noImage from "../../../../public/images/noImage.png";
import {router} from "@inertiajs/react";

const mockdata = [
    {
        icon: IconGenderMale,
        title: 'Heren fietsen',
        description: 'Fietsen voor heren',
    },
    {
        icon: IconGenderFemale,
        title: 'Dames fietsen',
        description: 'Fietsen voor dames',
    },
    {
        icon: IconMoodKid,
        title: 'Kinder fietsen',
        description: 'Fietsen voor kinderen',
    }
];

export function NavBar({}) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [initials, setInitials] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [admin, setAdmin] = useState(false);
    let [cartData, setCartData] = useState([]);
    const [categories, setCategories] = useState([]);

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const isDarkMode = theme === 'dark';

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-mantine-color-scheme', newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-mantine-color-scheme', savedTheme);
    }, []);

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
    }

    const fetchAdminStatus = async () => {
        const response = await fetch('/isAdmin', {
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
    }

    const fetchInitials = async () => {
        const response = await fetch('/getInitials', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return response.json();
        }

        return null
    }

    const fetchCart = async () => {
        const response = await fetch('/cart/get', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return Array.isArray(data) ? data : Object.values(data);
        }

        return [];
    }

    const fetchCategories = async () => {
        const response = await fetch('/categories', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return response.json();
        }

        return [];
    }

    useEffect(() => {
        const fetchData = async () => {
            const userData = await fetchLoggedInUser();
            setLoggedIn(userData === 1);

            const initialsData = await fetchInitials();
            setInitials(initialsData?.initials || '');

            const adminData = await fetchAdminStatus();
            setAdmin(adminData === 1);

            const cartData = await fetchCart();
            setCartData(cartData);

            const categories = await fetchCategories();
            setCategories(categories);
        };

        fetchData();
    }, []);

    const logout = async () => {
        const response = await fetch('/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.href = '/';
        }
    }

    const search = (term) => {
        router.get(`/products/${term}`);
    }

    const category = (category) => {
        router.get(`/products/category/${category}`);
    }

    const links = mockdata.map((item) => (
        <Text key={item.title} onClick={() => category(item.title)}>
        <UnstyledButton className={classes.subLink} key={item.title} href="#">
            <Group wrap="nowrap" align="flex-start" className="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-md">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color="#1c64f2" />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
        </Text>
    ));

    return (
        <Box className="shadow-sm select-none">
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Image src={Logo} alt="OJFP Logo" className="w-10 h-10 cursor-pointer" onClick={() => { document.location.href = '/'; }} />

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="/" className={classes.link}>
                            Home
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="/products" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Fietsen
                                        </Box>
                                        <IconChevronDown size={16} color="#1c64f2"/>
                                    </Center>
                                </a>
                            </HoverCard.Target>
                            <a href="/about-us" className={classes.link}>
                                Over ons
                            </a>
                            <HoverCard.Dropdown style={{overflow: 'hidden'}}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Fietsen per categorie</Text>
                                    <Anchor href="/products" fz="xs" color="#1c64f2">
                                        Bekijk alle fietsen
                                    </Anchor>
                                </Group>

                                <Divider my="sm"/>

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                {!loggedIn && (
                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Login of registreer om te bestellen
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Registreer nu en ontvang 10% korting op je eerste bestelling!
                                            </Text>
                                        </div>
                                            <Button variant="default" style={{ backgroundColor: '#1c64f2', color: 'white' }}>Login</Button>
                                            <Button style={{ backgroundColor: '#1c64f2', color: 'white' }}>Registreer</Button>
                                    </Group>
                                </div>
                                )}
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>

                    <Group visibleFrom="sm">
                        <Autocomplete
                            placeholder="Waar zoekt u naar?"
                            leftSection={<IconSearch size={16} stroke={1.5} color="#1c64f2" />}
                            data={['Gazelle', 'Giant', 'Batavus', 'Sparta', 'Trek', 'Pegasus', 'Bulls']}
                            visibleFrom="xs"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                    search(e.target.value);
                                }
                            }}
                        />
                        {!loggedIn && (
                            <>
                                <Button variant="filled" color="#1c64f2" onClick={() => { document.location.href = '/login'; }}>Log in</Button>
                                <Button variant="filled" color="#1c64f2" onClick={() => { document.location.href = '/register'; }}>Registreer</Button>
                            </>
                        )}
                        {isDarkMode ? <IconSun onClick={toggleTheme} size={24} className="hover:text-[#1c64f2] transition-all cursor-pointer" /> :
                        <IconMoon onClick={toggleTheme} size={24} className="hover:text-[#1c64f2] transition-all cursor-pointer" />
                        }
                        {loggedIn && (
                        <IconShoppingBag onClick={open} size={24} style={{ cursor: 'pointer' }} className="hover:text-[#1c64f2] transition-all" />
                        )}
                        {loggedIn && (
                            <Menu shadow="md" width={200}>
                                <Menu.Target>
                                    <Avatar color="cyan" radius="xl" style={{ cursor: 'pointer' }}>
                                        {initials}
                                    </Avatar>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item onClick={() => { document.location.href = '/profile' }}>Profiel</Menu.Item>
                                    {admin && <Menu.Item onClick={() => { document.location.href = '/admin/dashboard' }}>Admin Dashboard</Menu.Item>}
                                    <Menu.Divider />
                                    <Menu.Item onClick={logout}>Uitloggen</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        )}
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            {loggedIn && (
            <Drawer opened={opened} onClose={close} title="Winkelwagen" position="right">
                <ScrollArea h="calc(100vh - 80px)" mx="-md">
                    <SimpleGrid cols={1} spacing="md">
                        {cartData.map((item) => (
                            <Group key={item.id} justify="space-between" align="center" className="p-4 rounded-md">
                                <Group align="center">
                                    <Image
                                        src={item.image ? `/${item.image}` : noImage}
                                        alt={item.name}
                                        width={20}
                                        height={20}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = noImage;
                                        }}
                                    />
                                    <Text>{item.name}</Text>
                                </Group>
                                <Text>{item.quantity}x</Text>
                                <Text>${Number(item.price).toFixed(2)} {/* FIXED */}</Text>
                            </Group>
                        ))}
                    </SimpleGrid>
                    <Divider my="md" />
                    <Group justify="space-between" className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 rounded-t-md">
                        <Text>Totaal</Text>
                        <Text>€{cartData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</Text>
                        <Button variant="filled" color="#1c64f2" fullWidth mt="md">Afrekenen</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
            )}
            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navigation"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px" mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center>
                            <Box component="span" mr={5}>
                                Categorieën
                            </Box>
                            <IconChevronDown size={16} color="#1c64f2" />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button onClick={() => { document.location.href = '/login'; }} variant="filled" mt="md" fullWidth color="#1c64f2">Login</Button>
                        <Button onClick={() => { document.location.href = '/register'; }} style={{ backgroundColor: '#1c64f2', color: 'white' }}>Sign up</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}

export default NavBar;
