import {
    IconDatabaseImport,
    IconUser,
    IconLogout,
} from '@tabler/icons-react';
import { Group, Image } from '@mantine/core';
import classes from './AdminNavbar.module.css';
import Logo from "../../../../public/images/logo.png";
import { router } from "@inertiajs/react";

const data = [
    { label: 'Gebruikers', link: '/admin/users', icon: IconUser },
    { label: 'Producten', link: '/admin/products', icon: IconDatabaseImport },
    { label: 'Categorieën', link: '/admin/categories', icon: IconDatabaseImport },
];

export default function AdminDashboard() {
    const currentPath = window.location.pathname;

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={currentPath === item.link || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                document.location.href = item.link;
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group justify="center">
                    <Image src={Logo} alt="OJFP Logo" className="w-10 h-10 cursor-pointer" onClick={() => {
                        document.location.href = '/';
                    }} />
                </Group>
                <Group className={classes.header} justify="center">
                    <span className="mt-2 font-bold">Admin Dashboard</span>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => { router.post('/logout'); event.preventDefault(); }}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}
