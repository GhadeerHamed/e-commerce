import { useParams, useLocation } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { Product } from "../entities";
import { Card, Text } from "@radix-ui/themes";

const ProductDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const productFromState = (location.state as { product?: Product })?.product;
  const productId = productFromState?.id || parseInt(params.id!);
  const { data: fetchedProduct, isLoading, error } = useProduct(productId);

  const product = productFromState || fetchedProduct;

  if (isLoading && !productFromState) return <div>Loading...</div>;
  if (error && !productFromState) return <div>Error: {error.message}</div>;
  if (!product) return <div>The given product was not found.</div>;

  return (
    <Card style={{ maxWidth: 500, margin: "2rem auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{product.name}</h1>
      <Text as="div" size="4" mb="2"><b>Description:</b> {product.description}</Text>
      <Text as="div" size="4" mb="2"><b>Price:</b> ${product.price}</Text>
      <Text as="div" size="4" mb="2"><b>Quantity:</b> {product.quantity}</Text>
      <Text as="div" size="4" mb="2"><b>Supplier:</b> {product.supplier}</Text>
    </Card>
  );
};

export default ProductDetailPage;
