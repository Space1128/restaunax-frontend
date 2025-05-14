import { Order, OrderFilters, OrdersResponse } from "../../types/order";
import api from "../api";
import {
  API_ORDERS,
  API_ORDER,
  API_ORDER_CREATE,
  API_ORDER_UPDATE,
} from "../endpoints";

export const getOrders = async (
  filters: OrderFilters
): Promise<OrdersResponse> => {
  const response = await api.get(API_ORDERS, { params: filters });
  return response.data;
};

export const getOrder = async (id: string | number): Promise<Order> => {
  const response = await api.get(API_ORDER(id.toString()));
  return response.data;
};

export const updateOrder = async (
  id: string | number,
  data: Partial<Order>
): Promise<Order> => {
  const response = await api.patch(API_ORDER_UPDATE(id.toString()), data);
  return response.data;
};

export const createOrder = async (data: Omit<Order, "id">): Promise<Order> => {
  const response = await api.post(API_ORDER_CREATE, data);
  return response.data;
};
