import { useState } from "react";
import { Product } from "../entities";
import useProducts from "../hooks/useProducts";
import { Button, Table } from "@radix-ui/themes";
import { useCart } from "../hooks/useCart";
import ExpandableText from "./ExpandableText";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useProducts(page);
  const { addToCart } = useCart();

  const products = data?.data || [];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (products.length === 0) return <p>No products available.</p>;

  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product: Product) => (
            <Table.Row key={product.id}>
              <Table.Cell>
                <Link to={`/products/${product.id}`} state={{ product }} style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}>
                  {product.name}
                </Link>
              </Table.Cell>
              <Table.Cell>
                <ExpandableText text={product.description} />
              </Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>{product.supplier}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => addToCart(product)}>+</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      {data && (
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>Page {data.meta?.current_page} of {data.meta?.last_page}</span>
          <button
            onClick={() => setPage((p) => (data.links?.next ? p + 1 : p))}
            disabled={!data.links?.next}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
