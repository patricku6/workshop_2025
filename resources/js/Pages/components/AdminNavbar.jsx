import { useState } from 'react';
import {
    Icon2fa,
    IconBellRinging,
    IconDatabaseImport,
    IconFingerprint,
    IconKey,
    IconLogout,
} from '@tabler/icons-react';
import {Code, Group, Image} from '@mantine/core';
import classes from './AdminNavbar.module.css';
import Logo from "../../../../public/images/logo.png";
import {router} from "@inertiajs/react";

const data = [
    { label: 'Users', link: '/admin/users', icon: IconFingerprint },
    { label: 'Products', link: '/admin/products', icon: IconDatabaseImport },
];

export default function AdminDashboard() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
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
                <Group className={classes.header} justify="center">
                    <Image src={Logo} alt="OJFP Logo" className="w-10 h-10 cursor-pointer" onClick={() => { document.location.href = '/'; }} />
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
