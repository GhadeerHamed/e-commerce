import { Order } from "../entities";
import { Table } from "@radix-ui/themes";

const OrdersList = ({ orders, isSupplier }: { orders: Order[]; isSupplier?: boolean }) => {
  if (!orders || orders.length === 0) return <p>No orders found.</p>;

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          {isSupplier && <Table.ColumnHeaderCell>Customer</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order) => (
          <Table.Row key={order.id}>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>${order.total_price}</Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>{new Date(order.created_at).toLocaleString()}</Table.Cell>
            {isSupplier && <Table.Cell>{order.user?.name || '-'}</Table.Cell>}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default OrdersList; 