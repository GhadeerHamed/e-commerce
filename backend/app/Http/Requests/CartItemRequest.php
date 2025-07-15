<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CartItemRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'cart_id' => ['required', 'exists:carts'],
            'product_id' => ['required', 'exists:products'],
            'quantity' => ['required', 'integer'],
            'unit_price' => ['required', 'numeric'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}
