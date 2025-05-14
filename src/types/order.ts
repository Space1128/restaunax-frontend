export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'completed';

export type OrderType = 'delivery' | 'pickup';

export interface OrderItem {
    id: string | number;
    name: string;
    quantity: number;
    price: number;
    specialInstructions?: string;
}

export interface Order {
    id: string | number;
    customerName: string;
    customerEmail: string;
    orderType: OrderType;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    createdAt: string;
    scheduledFor?: string;
    preparationNotes: string;
}

export interface OrdersResponse {
    orders: Order[];
    total: number;
    page: number;
    pageSize: number;
}

export interface OrderFilters {
    status?: OrderStatus;
    customerName?: string;
    orderType?: OrderType;
    search?: string;
    page: number;
    pageSize: number;
} 