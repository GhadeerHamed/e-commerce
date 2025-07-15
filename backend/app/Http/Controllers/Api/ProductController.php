<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Product::class);

        return ProductResource::collection(Product::paginate(20));
    }

    public function store(ProductRequest $request)
    {
        $this->authorize('create', Product::class);

        $user = Auth::user();
        $product = $user->products()->create($request->validated());

        return new ProductResource($product);
    }

    public function show(Product $product)
    {
        $this->authorize('view', $product);

        return new ProductResource($product);
    }

    public function update(ProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);

        $product->update($request->validated());

        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        $product->delete();

        return response()->json();
    }

    public function SupplierProducts()
    {
        $user = Auth::user();

        $products = $user->products()->paginate(20);

        return ProductResource::collection($products);
    }
}
