import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getCart,
  addItemToCart,
  decrementCartItem,
  removeItemFromCart,
  clearCart,
  checkoutCart,
} from "../api";
import toast from "react-hot-toast";

function getErrorMessage(error: any, fallback: string) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallback
  );
}

export const useCart = () => {
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["cart"], getCart, {
    staleTime: 5 * 60 * 1000,
  });

  const addMutation = useMutation((productId: number) => addItemToCart(productId), {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error: any) => {
      toast.error(getErrorMessage(error, "Failed to add item to cart"));
    },
  });

  const decrementMutation = useMutation((productId: number) => decrementCartItem(productId), {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error: any) => {
      toast.error(getErrorMessage(error, "Failed to decrement item"));
    },
  });

  const removeMutation = useMutation((productId: number) => removeItemFromCart(productId), {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error: any) => {
      toast.error(getErrorMessage(error, "Failed to remove item"));
    },
  });

  const clearMutation = useMutation(clearCart, {
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
    onError: (error: any) => {
      toast.error(getErrorMessage(error, "Failed to clear cart"));
    },
  });

  const checkoutMutation = useMutation(checkoutCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Checkout successful!");
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error, "Checkout failed"));
    },
  });

  return {
    cart: cartQuery.data?.data,
    isLoading: cartQuery.isLoading,
    error: cartQuery.error,
    addToCart: (product: { id: number }) => addMutation.mutate(product.id),
    decrementCartItem: (product: { id: number }) => decrementMutation.mutate(product.id),
    removeFromCart: (product: { id: number }) => removeMutation.mutate(product.id),
    clearCart: () => clearMutation.mutate(),
    getItemCount: () => cartQuery.data?.data?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
    getItem: (product: { id: number }) => cartQuery.data?.data?.items?.find((item: any) => item.id === product.id) || null,
    checkout: () => checkoutMutation.mutate(),
  };
};
