import React, {createContext, useContext, useEffect, useState} from "react";

export interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image: string | undefined;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    updateQuantity: (id: string, quantity: number) => void;  // 🟢 nou
}


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(p => p.id === item.id);

            if (existing) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };


    const removeItem = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);


    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
