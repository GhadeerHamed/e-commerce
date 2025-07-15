<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group( function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'store']);
    Route::patch('products/{product}', [ProductController::class, 'update']);
    Route::get('products/{product}', [ProductController::class, 'show']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);

    Route::get('cart', [CartController::class, 'show']);
    Route::post('cart/add-item', [CartController::class, 'addItem']);
    Route::post('cart/decrement', [CartController::class, 'decrementItem']);
    Route::post('cart/remove-item', [CartController::class, 'removeItem']);
    Route::post('cart/clear', [CartController::class, 'destroy']);
    Route::post('cart/checkout', [CartController::class, 'checkout']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::post('orders/{order}/complete', [OrderController::class, 'complete']);

    Route::get('supplier-orders', [OrderController::class, 'SupplierOrders']);
    Route::get('supplier-products', [ProductController::class, 'SupplierProducts']);

});
