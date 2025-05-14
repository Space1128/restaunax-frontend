import { Order, OrderStatus, OrderType, OrderItem } from '../types/order';
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Menu items to randomly select from
const menuItems: { name: string; price: number }[] = [
    { name: 'Margherita Pizza', price: 12.99 },
    { name: 'Pepperoni Pizza', price: 14.99 },
    { name: 'Vegetarian Pizza', price: 13.99 },
    { name: 'Caesar Salad', price: 8.99 },
    { name: 'Greek Salad', price: 9.99 },
    { name: 'Garlic Bread', price: 4.99 },
    { name: 'Buffalo Wings', price: 11.99 },
    { name: 'Coca Cola', price: 2.99 },
    { name: 'Tiramisu', price: 6.99 },
    { name: 'Cheesecake', price: 7.99 },
];

// Special instructions to randomly select from
const specialInstructions: string[] = [
    'Extra cheese please',
    'No onions',
    'Extra spicy',
    'Gluten-free if possible',
    'Well done',
    'Light on the sauce',
    'Extra crispy',
    'Add extra toppings',
];

// Preparation notes to randomly select from
const preparationNotes: string[] = [
    'Allergy alert: Customer has nut allergy',
    'Regular customer - likes extra sauce',
    'VIP customer',
    'Previous order was late - priority service',
    'Customer prefers items packed separately',
    'Birthday celebration',
    'Corporate order',
];

// Helper function to generate random order items
const generateOrderItems = (minItems: number = 1, maxItems: number = 5): OrderItem[] => {
    const numItems = faker.number.int({ min: minItems, max: maxItems });
    const items: OrderItem[] = [];

    for (let i = 0; i < numItems; i++) {
        const menuItem = faker.helpers.arrayElement(menuItems);
        const quantity = faker.number.int({ min: 1, max: 4 });
        
        items.push({
            id: uuidv4(),
            name: menuItem.name,
            quantity,
            price: menuItem.price,
            specialInstructions: faker.number.int({ min: 1, max: 10 }) > 7 
                ? faker.helpers.arrayElement(specialInstructions) 
                : undefined
        });
    }

    return items;
};

// Helper function to calculate total from items
const calculateTotal = (items: OrderItem[]): number => {
    return Number(items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2));
};

// Generate a random date between two dates
const randomDate = (start: Date, end: Date): string => {
    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return randomDate.toISOString();
};

// Main function to generate orders
const generateOrders = (numOrders: number = 40): Order[] => {
    const orders: Order[] = [];
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

    for (let i = 0; i < numOrders; i++) {
        const items = generateOrderItems();
        const orderType = faker.helpers.arrayElement(['delivery', 'pickup'] as OrderType[]);
        const status = faker.helpers.arrayElement([
            'pending', 'confirmed', 'preparing', 'ready', 'delivered', 'completed'
        ] as OrderStatus[]);

        const order: Order = {
            id: uuidv4(),
            customerName: faker.person.fullName(),
            customerEmail: faker.internet.email(),
            orderType,
            items,
            status,
            total: calculateTotal(items),
            createdAt: randomDate(thirtyDaysAgo, now),
            preparationNotes: faker.number.int({ min: 1, max: 10 }) > 7 
                ? faker.helpers.arrayElement(preparationNotes) 
                : '',
        };

        // Add scheduled time for some future orders
        if (faker.number.int({ min: 1, max: 10 }) > 7) {
            const futureDate = new Date(now.getTime() + faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000);
            order.scheduledFor = futureDate.toISOString();
        }

        orders.push(order);
    }

    return orders;
};

// Generate the orders
const orders = generateOrders();

// Save to a JSON file
const outputDir = path.join(__dirname, '../../data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
    path.join(outputDir, 'seedOrders.json'),
    JSON.stringify({ orders }, null, 2)
);

console.log(`✅ Successfully generated ${orders.length} orders in data/seedOrders.json`); 