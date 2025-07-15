import { useAuth } from "../contexts/AuthContext";
import { useQuery } from "react-query";
import { getMyOrders, getSupplierOrders } from "../api";
import OrdersList from "../components/OrdersList";

const OrdersPage = () => {
  const { user } = useAuth();
  const isSupplier = user?.role === "supplier";

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery([isSupplier ? "supplierOrders" : "myOrders"], isSupplier ? getSupplierOrders : getMyOrders);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">{isSupplier ? "Supplier Orders" : "My Orders"}</h1>
      <OrdersList orders={orders?.data || []} isSupplier={isSupplier} />
    </div>
  );
};

export default OrdersPage; 