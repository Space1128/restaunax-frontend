import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Order, OrderStatus } from '../types/order';
import { getOrder, updateOrder } from '../services';
import { format } from 'date-fns';

const statusOptions: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'completed',
];

const OrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [preparationNotes, setPreparationNotes] = useState('');
    const [status, setStatus] = useState<OrderStatus>('pending');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const data = await getOrder(id!);
                setOrder(data);
                setPreparationNotes(data.preparationNotes);
                setStatus(data.status);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const handleSave = async () => {
        if (!order) return;

        try {
            await updateOrder(order.id, {
                preparationNotes,
                status,
            });
            // Refresh order data
            const updatedOrder = await getOrder(id!);
            setOrder(updatedOrder);
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!order) {
        return <Typography>Order not found</Typography>;
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 3 }}
            >
                Back to Orders
            </Button>
            <Paper sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Order #{order.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Customer Information
                                </Typography>
                                <Typography>Name: {order.customerName}</Typography>
                                <Typography>Email: {order.customerEmail}</Typography>
                                <Typography>
                                    Order Type: {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                                </Typography>
                                <Typography>
                                    Created: {format(new Date(order.createdAt), 'PPpp')}
                                </Typography>
                                {order.scheduledFor && (
                                    <Typography>
                                        Scheduled for: {format(new Date(order.scheduledFor), 'PPpp')}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Status
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Select
                                        fullWidth
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value as OrderStatus)}
                                    >
                                        {statusOptions.map((status) => (
                                            <MenuItem key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Preparation Notes"
                                    value={preparationNotes}
                                    onChange={(e) => setPreparationNotes(e.target.value)}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleSave}
                                    sx={{ mt: 2 }}
                                >
                                    Save Changes
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Items
                                </Typography>
                                {order.items.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 1,
                                        }}
                                    >
                                        <Typography>
                                            {item.quantity}x {item.name}
                                            {item.specialInstructions && (
                                                <Typography
                                                    component="span"
                                                    color="text.secondary"
                                                    sx={{ ml: 1 }}
                                                >
                                                    ({item.specialInstructions})
                                                </Typography>
                                            )}
                                        </Typography>
                                        <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                                    </Box>
                                ))}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        mt: 2,
                                        pt: 2,
                                        borderTop: 1,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6">${order.total.toFixed(2)}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default OrderDetail; 