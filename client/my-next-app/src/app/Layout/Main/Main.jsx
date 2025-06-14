'use client';

import style from './Main.module.css';
import Carousel from './Carousel/Carousel';

export default function Main() {
    const alacarteMenu = [
        '/img/body/alacarteMenu/food1.jpg',
        '/img/body/alacarteMenu/food2.jpg',
        '/img/body/alacarteMenu/food3.jpg',
        '/img/body/alacarteMenu/food4.jpg',
        '/img/body/alacarteMenu/food5.jpg',
    ];

    const tabehoudaiMenu = [
        '/img/body/tabehoudaiMenu/food1.jpg',
        '/img/body/tabehoudaiMenu/food2.jpg',
        '/img/body/tabehoudaiMenu/food3.jpg',
        '/img/body/tabehoudaiMenu/food4.jpg',
        '/img/body/tabehoudaiMenu/food5.jpg',
    ];

    const drinkMenu = [
        '/img/body/drinkMenu/food1.jpg',
        '/img/body/drinkMenu/food2.jpg',
        '/img/body/drinkMenu/food3.jpg',
        '/img/body/drinkMenu/food4.jpg',
        '/img/body/drinkMenu/food5.jpg',
    ];

    return (
        <>
            <div className={style.container}>
                <Carousel images={alacarteMenu} />
                <Carousel images={tabehoudaiMenu} />
                <Carousel images={drinkMenu} />
            </div>
        </>
    );
}
