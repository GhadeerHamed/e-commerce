<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartService
{

    public function __construct(private readonly OrderService $orderService)
    {
    }

    /**
     * @throws \Throwable
     */
    public function addItem(int $product_id): Cart
    {
        $cart = Auth::user()->getCart();

        $product = Product::withoutEagerLoads()->find($product_id, ['id', 'quantity', 'price']);
        abort_if($product->quantity < 1, 400, 'Out of stock');

        return DB::transaction(function () use ($product, $cart) {
            $item = $cart->items()->where('product_id', $product->id)->first();
            if ($item) {
                // $item->increment('quantity');
                $item->update([
                    'quantity' => $item->quantity + 1,
                    'unit_price' => $product->price,
                    'total_price' => $item->total_price + $item->unit_price,
                ]);
            } else {
                $cart->items()->create([
                    'quantity' => 1,
                    'product_id' => $product->id,
                    'unit_price' => $product->price,
                    'total_price' => $product->price,
                ]);
            }

            $product->decrement('quantity');

            return $cart->refresh();
        });
    }

    /**
     * @throws \Throwable
     */
    public function decrementItem(int $product_id): Cart
    {
        $cart = Auth::user()->getCart();

        $product = Product::withoutEagerLoads()->find($product_id, ['id', 'quantity', 'price']);

        return DB::transaction(function () use ($product, $cart) {
            $item = $cart->items()->where('product_id', $product->id)->first();
            if ($item) {
                $item->update([
                    'quantity' => $item->quantity - 1,
                    'total_price' => $item->total_price - $item->unit_price,
                ]);

                $product->increment('quantity');
            }

            return $cart->refresh();
        });
    }

    public function removeItem(int $product_id): Cart
    {
        $cart = Auth::user()->getCart();

        $product = Product::withoutEagerLoads()->find($product_id, ['id', 'quantity', 'price']);

        return DB::transaction(function () use ($product, $cart) {
            $item = $cart->items()->where('product_id', $product->id)->first();
            if ($item) {
                $product->increment('quantity', $item->quantity);
                $item->delete();
            }

            return $cart->refresh();
        });
    }

    /**
     * @throws \Throwable
     */
    public function clearCart(): Cart
    {
        $cart = Auth::user()->getCart();
        $cart->load('items.product');

        return DB::transaction(function () use ($cart) {
            $cart->items->map(function (CartItem $item) {
                $item->product->increment('quantity', $item->quantity);
                $item->delete();
            });

            return $cart->refresh();
        });
    }

    /**
     * @throws \Throwable
     */
    public function checkout(): Order
    {
        $user = Auth::user();
        $cart = $user->getCart();
        $cart->load('items.product');

        abort_if($cart->isEmpty(), 400, 'Add some items first');

        return DB::transaction(function () use ($cart, $user) {
            $order = $this->orderService->createOrder($user, $cart);

            $this->clearCart();

            return $order;
        });
    }
}
