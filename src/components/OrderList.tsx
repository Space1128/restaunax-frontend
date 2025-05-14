import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    IconButton,
    Tooltip,
    Typography,
    Box,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Order, OrderStatus } from '../types/order';
import { updateOrder } from '../services';
import { format } from 'date-fns';

interface OrderListProps {
    orders: Order[];
    onStatusChange: () => void;
}

const statusOptions: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'completed',
];

const OrderList: React.FC<OrderListProps> = ({ orders, onStatusChange }) => {
    const navigate = useNavigate();

    const handleStatusChange = async (orderId: string | number, newStatus: OrderStatus) => {
        try {
            await updateOrder(orderId, { status: newStatus });
            onStatusChange();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleViewOrder = (orderId: string | number) => {
        navigate(`/orders/${orderId}`);
    };

    if (orders.length === 0) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                    No orders found matching your criteria
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ minHeight: 400 }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id} hover>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>
                                {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                            </TableCell>
                            <TableCell>
                                <Select
                                    size="small"
                                    value={order.status}
                                    onChange={(e) =>
                                        handleStatusChange(order.id, e.target.value as OrderStatus)
                                    }
                                    sx={{ minWidth: 120 }}
                                >
                                    {statusOptions.map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                                {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                            </TableCell>
                            <TableCell align="center">
                                <Tooltip title="View Details">
                                    <IconButton
                                        onClick={() => handleViewOrder(order.id)}
                                        size="small"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderList; 