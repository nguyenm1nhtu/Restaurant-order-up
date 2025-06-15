'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import Header from '@/app/Layout/Header/Header';
import style from './Menu.module.css';

export default function Menu() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = ['Món nướng', 'Món lẩu', 'Đồ uống', 'Tráng miệng'];

    return (
        <>
            <Header />
            <div className={style.container}>
                <Image src="/img/menu/menu_bg.jpg" alt="Logo" fill />
                <div className={style.overlay}>
                    <div className="flex flex-col justify-center">
                        <div className={style.category}></div>
                    </div>
                </div>
            </div>
        </>
    );
}
