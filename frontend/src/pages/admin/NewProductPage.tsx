import { useAuth } from '../../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Heading } from "@radix-ui/themes";
import ProductForm from "../../components/ProductForm";
import toast from 'react-hot-toast';
import { createProduct } from '../../api';

const NewProductPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  if (loading) return <p>Loading auth...</p>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <Heading mb="4">New Product</Heading>
      <ProductForm
        onSubmit={async (product) => {
          await createProduct(product);
          toast.success("Product created successfully!");
          navigate("/admin/products");
        }}
      />
    </div>
  );
};

export default NewProductPage;
