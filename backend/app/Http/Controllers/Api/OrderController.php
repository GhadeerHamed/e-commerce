<?php

namespace App\Http\Controllers\Api;

use App\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SupplierOrderResource;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

    public function __construct(private readonly OrderService $orderService)
    {
    }

    public function index()
    {
        return OrderResource::collection(\Auth::user()->orders);
    }

    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    public function complete(Request $request, Order $order)
    {
        return $this->orderService->completeOrder($order) ?
            response()->json(['message' => 'Success'])
            : response()->json(['message' => 'Error'], 400);
    }

    public function SupplierOrders()
    {
        $user = Auth::user();

        $orders = $this->orderService->getSupplierOrders($user);

        return SupplierOrderResource::collection($orders);
    }

}
