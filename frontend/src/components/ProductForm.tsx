import { useState } from "react";
import { Box, Button, TextField } from "@radix-ui/themes";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import { Product } from "../entities";

interface Props {
  product?: Product;
  onSubmit: (product: any) => Promise<void>;
}

const ProductForm = ({ product, onSubmit }: Props) => {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.description || !form.price || !form.quantity) {
      setError("All fields are required.");
      return;
    }
  
    setSubmitting(true);
    try {
      await onSubmit({ ...form });
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form name="product" onSubmit={handleSubmit} className="space-y-3">
      <Box>
        <TextField.Root className="max-w-sm">
          <TextField.Input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            size="3"
          />
        </TextField.Root>
      </Box>
      <Box>
        <TextField.Root className="max-w-sm">
          <TextField.Input
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            size="3"
            className="resize-none"
          />
        </TextField.Root>
      </Box>
      <Box>
        <TextField.Root className="w-24">
          <TextField.Slot>$</TextField.Slot>
          <TextField.Input
            placeholder="Price"
            name="price"
            type="number"
            step="0.01"
            min={0}
            value={form.price}
            onChange={handleChange}
            size="3"
          />
        </TextField.Root>
      </Box>
      <Box>
        <TextField.Root className="w-24">
          <TextField.Input
            placeholder="Quantity"
            name="quantity"
            type="number"
            min={0}
            value={form.quantity}
            onChange={handleChange}
          />
        </TextField.Root>
      </Box>
      {error && <ErrorMessage message={error} />}
      <Button size="3" disabled={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ProductForm;
