<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Http\Resources\OrderResource;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{

    public function __construct(private readonly CartService $cartService)
    {
    }

    public function show()
    {
        return new CartResource(Auth::user()->getCart());
    }

    /**
     * @throws \Throwable
     */
    public function addItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = $this->cartService->addItem($request->product_id);

        return CartResource::make($cart);
    }

    /**
     * @throws \Throwable
     */
    public function decrementItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = $this->cartService->decrementItem($request->product_id);

        return CartResource::make($cart);
    }
    /**
     * @throws \Throwable
     */
    public function removeItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = $this->cartService->removeItem($request->product_id);

        return CartResource::make($cart);
    }

    /**
     * @throws \Throwable
     */
    public function checkout()
    {
        $order = $this->cartService->checkout();

        return OrderResource::make($order);
    }

    /**
     * @throws \Throwable
     */
    public function destroy()
    {
        $cart = $this->cartService->clearCart();

        return new CartResource($cart->refresh());
    }
}
