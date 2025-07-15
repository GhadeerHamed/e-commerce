<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Enums\Roles;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class OrderService
{

    public function __construct(private readonly PaymentService $paymentService)
    {
    }

    public function createOrder(User $user, Cart $cart)
    {
        $order = $user->orders()->create(['total_price' => $cart->totalPrice()]);

        $cart->items->map(function (CartItem $item) use ($order) {
            $order->items()->create([
                'product_name' => $item->product->name,
                'quantity' => $item->quantity,
                'unit_price' => $item->unit_price,
            ]);
        });

        return $order->refresh();
    }

    public function completeOrder(Order $order): bool
    {
        return DB::transaction(function () use ($order) {
            if ($this->paymentService->pay($order->total_price)) {
                $order->update(['status' => OrderStatus::Completed]);

                return true;
            }

            return false;
        });
    }

    public function getSupplierOrders(User $user): LengthAwarePaginator
    {
        abort_if($user->role !== Roles::Supplier, 403, 'Unauthorized action.');

        $userProductsIds = $user->products->pluck('id')->toArray();
        return Order::query()
            ->withWhereHas('items', fn(Builder|HasMany $query) => $query->whereIn('product_id', $userProductsIds))
            ->with('user')
            ->paginate(20);
    }
}
