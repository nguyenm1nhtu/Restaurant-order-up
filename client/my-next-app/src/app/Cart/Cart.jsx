'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/Layout/Header/Header';
import Footer from '@/app/Layout/Footer/Footer';

export default function Cart() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const res = await fetch('http://localhost:3001/receipt/cart/monan', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Failed to fetch cart data');

                const data = await res.json();

                if (Array.isArray(data)) {
                    const formatted = data.map((item) => ({
                        id: item.Ma_mon_an,
                        name: item.Ten_mon_an,
                        price: item.Don_gia,
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

        const fetchPaymentMethods = async () => {
            try {
                const res = await fetch('http://localhost:3001/receipt/payment-methods', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!res.ok) throw new Error('Failed to fetch payment methods');
                const data = await res.json();
                setPaymentMethods(data);
                if (data.length > 0) setPaymentMethod(data[0].Ma_phuong_thuc_thanh_toan.toString());
            } catch (err) {
                console.error('Lỗi khi lấy phương thức thanh toán:', err);
            }
        };

        fetchCartItems();
        fetchPaymentMethods();
    }, []);

    const changeQuantity = async (id, delta) => {
        setItems((prevItems) => {
            const updated = prevItems.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            );
            const changedItem = updated.find((item) => item.id === id);
            if (changedItem) {
                fetch('http://localhost:3001/receipt/cart/update', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({
                        Ma_mon_an: changedItem.id,
                        So_luong: changedItem.quantity,
                    }),
                }).catch((err) => {
                    console.error('Failed to update item quantity:', changedItem.id, err);
                });
            }
            return updated;
        });
    };

    const handleRemoveItem = async (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        try {
            await fetch('http://localhost:3001/receipt/cart/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ Ma_mon_an: id }),
            });
        } catch (err) {
            console.error('Failed to remove item:', id, err);
        }
    };

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const handleConfirmOrder = async () => {
        if (total === 0) {
            alert('Bạn chưa chọn món ăn nào!');
            return;
        }
        try {
            await fetch('http://localhost:3001/receipt/confirm-order', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ paymentMethod }),
            });
        } catch (err) {
            console.error('Failed to confirm order:', err);
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full z-50 shadow bg-white">
                <Header />
            </div>

            <div className="pt-[80px] px-4 max-w-5xl mx-auto pb-10 min-h-[calc(100vh-160px)]">
                <div className="flex justify-center space-x-6 mb-4">
                    <span className="pb-2 border-b-2 border-red-500 font-bold">Giỏ đồ ăn</span>
                </div>

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
                                <button
                                    className="ml-4 text-red-500 text-xl font-bold hover:opacity-70"
                                    title="Xóa món"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        {/* Chi tiết thanh toán */}
                        <div className="mt-6">
                            <h2 className="font-bold mb-2">Phương thức thanh toán</h2>
                            <div className="space-y-2">
                                {paymentMethods.map((pm) => (
                                    <label key={pm.Ma_phuong_thuc_thanh_toan} className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            value={pm.Ma_phuong_thuc_thanh_toan}
                                            checked={paymentMethod === pm.Ma_phuong_thuc_thanh_toan.toString()}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span>{pm.Ten_phuong_thuc_thanh_toan}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-4 border-t pt-2 font-semibold">
                                <div className="flex justify-between">
                                    <span>Tổng cộng:</span>
                                    <span>{total.toLocaleString()}đ</span>
                                </div>
                            </div>

                            <button
                                className="mt-4 w-full py-2 bg-black text-white rounded"
                                onClick={handleConfirmOrder}
                            >
                                Xác nhận đặt món
                            </button>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}
