# Order Seed Script

This script generates mock order data for testing and development purposes. It creates a variety of orders with different statuses, types, and scenarios.

## Features

- Generates 40 orders by default (configurable)
- Includes various order statuses (pending, confirmed, preparing, ready, delivered, completed)
- Mixes delivery and pickup orders
- Includes random special instructions and preparation notes
- Creates orders with multiple items
- Generates some scheduled orders for future dates
- Creates orders spanning the last 30 days
- Uses realistic mock data for customer names and emails

## Generated Data Includes

- Customer information (name, email)
- Order items with quantities and prices
- Special instructions for items
- Order status
- Order type (delivery/pickup)
- Creation dates
- Scheduled delivery/pickup times (for some orders)
- Preparation notes
- Total order amount

## How to Use

1. Install the required dependencies:
   ```bash
   npm install
   ```

2. Run the seed script:
   ```bash
   npm run seed
   ```

The script will generate a `data/seedOrders.json` file containing the mock orders.

## Customization

You can modify the following in the script:
- Number of orders generated (default: 40)
- Menu items and prices
- Special instructions
- Preparation notes
- Date range for orders
- Probability of special features (scheduled orders, special instructions, etc.) 