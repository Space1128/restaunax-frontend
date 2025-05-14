import React, { useEffect, useState, useCallback } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    MenuItem,
    CircularProgress,
    TablePagination,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { Order, OrderStatus, OrderFilters } from '../types/order';
import { getOrders } from '../services';
import OrderList from './OrderList';
import debounce from 'lodash/debounce';

const statusOptions: OrderStatus[] = [
    'pending',
    'confirmed',
    'preparing',
    'ready',
    'delivered',
    'completed',
];

const Dashboard: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<OrderFilters>({
        page: 1,
        pageSize: 10,
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [totalOrders, setTotalOrders] = useState(0);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await getOrders(filters);
            setOrders(response.orders);
            setTotalOrders(response.total);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((term: string) => {
            setFilters(prev => ({
                ...prev,
                search: term || undefined,
                page: 1, // Reset to first page on search
            }));
        }, 500),
        []
    );

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value;
        setSearchTerm(term);
        debouncedSearch(term);
    };

    // Clear search
    const handleClearSearch = () => {
        setSearchTerm('');
        setFilters(prev => ({
            ...prev,
            search: undefined,
            page: 1,
        }));
    };

    const handleFilterChange = (field: keyof OrderFilters) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFilters((prev) => ({
            ...prev,
            [field]: event.target.value,
            page: 1, // Reset page when filters change
        }));
    };

    const handlePageChange = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setFilters(prev => ({
            ...prev,
            page: newPage + 1, // MUI uses 0-based index, our API uses 1-based index
        }));
    };

    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({
            ...prev,
            pageSize: parseInt(event.target.value, 10),
            page: 1, // Reset to first page when changing rows per page
        }));
    };

    useEffect(() => {
        fetchOrders();
    }, [filters]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4" gutterBottom>
                            Order Dashboard
                        </Typography>
                        <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {/* Global Search Field */}
                            <TextField
                                label="Search Orders"
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by order Name, Email, PreparationNotes..."
                                sx={{ minWidth: 300 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: searchTerm && (
                                        <InputAdornment position="end">
                                            <IconButton
                                                size="small"
                                                onClick={handleClearSearch}
                                                aria-label="clear search"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                select
                                label="Status"
                                variant="outlined"
                                size="small"
                                value={filters.status || ''}
                                onChange={handleFilterChange('status')}
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="">All</MenuItem>
                                {statusOptions.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <>
                                <OrderList
                                    orders={orders}
                                    onStatusChange={fetchOrders}
                                />
                                <TablePagination
                                    component="div"
                                    count={totalOrders}
                                    page={filters.page - 1} // Convert 1-based to 0-based index
                                    onPageChange={handlePageChange}
                                    rowsPerPage={filters.pageSize}
                                    onRowsPerPageChange={handleRowsPerPageChange}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                    sx={{ mt: 2 }}
                                />
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard; 