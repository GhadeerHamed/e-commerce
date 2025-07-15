import { Button, Table } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "react-query";
import { Link, Navigate } from "react-router-dom";
import { Product } from "../../entities";
import { useAuth } from '../../contexts/AuthContext';
import { deleteProduct, getSupplierProducts } from "../../api";
import { useState } from "react";
import ExpandableText from "../../components/ExpandableText";

const ProductListPage = () => {
  const { user, loading } = useAuth();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data: productsResponse, isLoading, error } = useQuery(['supplier-products', page], () => getSupplierProducts(page));
  const products = productsResponse?.data || [];

  if (loading) return <p>Loading auth...</p>;
  if (!user) return <Navigate to="/login" />;

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    queryClient.invalidateQueries(["supplier-products"]);
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to="new">
        <Button>New Product</Button>
      </Link>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {(error as Error).message}</div>
      ) : products.length === 0 ? (
        <p>No products was found!</p>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {products.map((product: Product) => (
                  <Table.Row key={product.id}>
                    <Table.Cell>{product.name}</Table.Cell>
                    <Table.Cell><ExpandableText text={product.description} /></Table.Cell>
                    <Table.Cell>${product.price}</Table.Cell>
                    <Table.Cell>{product.quantity}</Table.Cell>
                    <Table.Cell>{product.supplier}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Button color="red" variant="soft" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </div>
          {productsResponse && (
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {productsResponse.meta?.current_page} of {productsResponse.meta?.last_page}</span>
              <button
                onClick={() => setPage((p) => (productsResponse.links?.next ? p + 1 : p))}
                disabled={!productsResponse.links?.next}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListPage;
