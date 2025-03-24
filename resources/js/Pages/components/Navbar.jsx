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

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start" className="hover:bg-gray-100 p-2 rounded-md">
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
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Categorieën
                                        </Box>
                                        <IconChevronDown size={16} color="#1c64f2"/>
                                    </Center>
                                </a>
                            </HoverCard.Target>
                            <a href="#" className={classes.link}>
                                Over ons
                            </a>
                            <HoverCard.Dropdown style={{overflow: 'hidden'}}>
                                <Group justify="space-between" px="md">
                                    <Text fw={500}>Categorieën</Text>
                                    <Anchor href="#" fz="xs" color="#1c64f2">
                                        Bekijk alle categorieën
                                    </Anchor>
                                </Group>

                                <Divider my="sm"/>

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>

                                <div className={classes.dropdownFooter}>
                                    <Group justify="space-between">
                                        <div>
                                            <Text fw={500} fz="sm">
                                                Login of registreer om te bestellen
                                            </Text>
                                            <Text size="xs" c="dimmed">
                                                Registreer nu en ontvang 10% korting op je eerste bestelling
                                            </Text>
                                        </div>
                                        <Button variant="default" style={{ backgroundColor: '#1c64f2', color: 'white' }}>Login</Button>
                                        <Button style={{ backgroundColor: '#1c64f2', color: 'white' }}>Registreer</Button>
                                    </Group>
                                </div>
                            </HoverCard.Dropdown>
                        </HoverCard>
                    </Group>

                    <Group visibleFrom="sm">
                        <Autocomplete
                            placeholder="Waar zoekt u naar?"
                            leftSection={<IconSearch size={16} stroke={1.5} color="#1c64f2" />}
                            data={['Gazelle', 'Giant', 'Batavus', 'Sparta', 'Trek', 'Pegasus', 'Bulls']}
                            visibleFrom="xs"
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
                            <Group key={item.id} justify="space-between" align="center">
                                <Group align="center">
                                    <Image src={item.image} alt={item.name} width={50} height={50} />
                                    <Text>{item.name}</Text>
                                </Group>
                                <Text>{item.quantity}x</Text>
                                <Text>${item.price.toFixed(2)}</Text>
                            </Group>
                        ))}
                    </SimpleGrid>
                    <Divider my="md" />
                    <Group justify="space-between">
                        <Text>Totaal</Text>
                        <Text>${cartData.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</Text>
                    </Group>
                    <Button variant="filled" color="#1c64f2" fullWidth mt="md">Afrekenen</Button>
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
