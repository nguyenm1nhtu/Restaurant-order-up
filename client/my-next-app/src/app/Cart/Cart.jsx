'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/Layout/Header/Header';
import Footer from '@/app/Layout/Footer/Footer';

export default function Cart() {
    const [activeTab, setActiveTab] = useState('cart');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await fetch('http://localhost:3001/receipt/cart/monan', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Needed if you're using cookies/session
                });

                if (!res.ok) throw new Error('Failed to fetch cart data');

                const data = await res.json();

                if (Array.isArray(data)) {
                    const formatted = data.map((item) => ({
                        id: item.Ma_mon_an,
                        name: item.Ten_mon_an,
                        price: item.Don_gia, // Fixed: use Don_gia from backend
                        checked: true,
                        quantity: item.So_luong || 1,
                        image: item.Hinh_anh || '/images/default.jpg',
                    }));
                    setItems(formatted);
                } else {
                    console.warn('Unexpected response:', data);
                    setItems([]);
                }
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu món ăn trong giỏ hàng:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const toggleCheck = (id) => {
        setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
    };

    const changeQuantity = (id, delta) => {
        setItems(
            items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)),
        );
    };

    const total = items.filter((i) => i.checked).reduce((sum, i) => sum + i.price * i.quantity, 0);

    const calledItems = [
        {
            id: 1,
            name: 'Wagyu Saiko Combo',
            quantity: 1,
            status: 'Đang chế biến',
            price: 1590000,
            children: [
                'Thăn ngoại Aging Wagyu A5 (100g)',
                'Thịt sườn Aging Wagyu A4 (100g)',
                'Lõi thăn sườn Aging (100g)',
                'Lõi vai Aging (100g)',
                'Sườn Aging (100g)',
                'Ức vai Aging (100g)',
            ],
        },
        {
            id: 2,
            name: 'Chuck Flap Premium Aging Beef',
            quantity: 1,
            status: 'Đang chế biến',
            price: 209000,
            children: [],
        },
    ];

    const orderedTotal = calledItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
                <Header />
            </div>

            <div className="pt-[80px] px-4 max-w-5xl mx-auto pb-10 min-h-[calc(100vh-160px)]">
                <div className="flex justify-center space-x-6 mb-4">
                    <button
                        onClick={() => setActiveTab('cart')}
                        className={`pb-2 ${
                            activeTab === 'cart' ? 'border-b-2 border-red-500 font-bold' : 'text-gray-500'
                        }`}
                    >
                        Giỏ đồ ăn
                    </button>
                    <button
                        onClick={() => setActiveTab('ordered')}
                        className={`pb-2 ${
                            activeTab === 'ordered' ? 'border-b-2 border-red-500 font-bold' : 'text-gray-500'
                        }`}
                    >
                        Món đã gọi
                    </button>
                </div>

                {activeTab === 'cart' ? (
                    <div>
                        {loading ? (
                            <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
                        ) : items.length === 0 ? (
                            <div className="text-center text-gray-500">Bạn chưa chọn món ăn nào.</div>
                        ) : (
                            <>
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center border border-red-200 rounded p-2 mb-3"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={() => toggleCheck(item.id)}
                                            className="mr-2 accent-red-500"
                                        />
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded mr-3 border"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold">{item.name}</p>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <button
                                                    onClick={() => changeQuantity(item.id, -1)}
                                                    className="px-2 py-1 border border-red-400 text-red-500 rounded"
                                                >
                                                    -
                                                </button>
                                                <span className="min-w-[20px] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => changeQuantity(item.id, 1)}
                                                    className="px-2 py-1 border border-red-400 text-red-500 rounded"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ml-4 font-semibold text-red-500 whitespace-nowrap">
                                            {(item.price * item.quantity).toLocaleString()}đ
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center mt-4 font-bold">
                                    <span>Tổng:</span>
                                    <span>{total.toLocaleString()}đ</span>
                                </div>
                                <button className="mt-4 w-full py-2 bg-black text-white rounded">
                                    Xác nhận đặt món
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {calledItems.map((item) => (
                            <div key={item.id}>
                                <div className="flex items-start">
                                    <div className="w-2/3 flex items-center space-x-2">
                                        <span className="bg-red-600 text-white text-sm px-2 py-0.5 rounded">
                                            {item.quantity}x
                                        </span>
                                        <span className="font-semibold">{item.name}</span>
                                    </div>

                                    <div className="w-1/6 text-gray-600 whitespace-nowrap">{item.status}</div>

                                    <div className="w-1/6 text-red-600 font-semibold text-right whitespace-nowrap">
                                        {item.price.toLocaleString()}đ
                                    </div>
                                </div>

                                {item.children.length > 0 && (
                                    <div className="mt-2 space-y-1 ml-6">
                                        {item.children.map((subItem, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-700">
                                                <span className="bg-gray-200 text-xs px-2 py-0.5 rounded mr-2">1x</span>
                                                Combo: {subItem}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-between items-center mt-6 font-bold">
                            <span>Tổng:</span>
                            <span>{orderedTotal.toLocaleString()}đ</span>
                        </div>
                        <button className="mt-4 w-full py-2 bg-black text-white rounded">Kết thúc dịch vụ</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
