import { Heading } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { useAuth } from '../../contexts/AuthContext';
import useProduct from '../../hooks/useProduct';
import { updateProduct } from '../../api';

const EditProductPage = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading auth...</p>;
  if (!user) return <Navigate to="/login" />;

  const navigate = useNavigate();
  const params = useParams();
  const productId = parseInt(params.id!);
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!product) return <div>The given product was not found.</div>;

  console.log(product);
  return (
    <div>
      <Heading mb="4">Edit Product</Heading>
      <ProductForm
        product={product}
        onSubmit={async (formData) => {
          await updateProduct(productId, formData);
          toast.success("Changes were successfully saved.");
          navigate("/admin/products");
        }}
      />
    </div>
  );
};

export default EditProductPage;
