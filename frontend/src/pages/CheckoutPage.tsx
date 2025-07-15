import { Button, Table, Heading } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import toast from "react-hot-toast";
import { CartItem } from "../entities";

const CheckoutPage = () => {
  const { cart, isLoading, checkout } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await checkout();
      toast.success("Checkout successful!");
      navigate("/orders");
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (isLoading) return <div>Loading cart...</div>;
  if (!cart || cart.items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div>
      <Heading mb="4">Checkout</Heading>
      <Table.Root className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Unit Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cart.items.map((item: CartItem) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.product?.name}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>${item.unit_price.toFixed(2)}</Table.Cell>
              <Table.Cell>${item.total_price.toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-lg">Total: ${cart.total_price.toFixed(2)}</span>
        <Button size="3" onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
};

export default CheckoutPage; 