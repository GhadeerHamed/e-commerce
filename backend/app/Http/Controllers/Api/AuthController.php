<?php

namespace App\Http\Controllers\Api;

use App\Enums\Roles;
use App\Http\Controllers\Controller;
use App\Models\User;
use Couchbase\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|max:100|unique:users',
            'password' => 'required',
            'role' => ['required', new Enum(Roles::class)],
        ]);

        $user = User::create($request->all());

        $res = [
            'user' => $user->only(['name', 'email', 'role']),
            'token' => $user->createToken('MyApp')->plainTextToken
        ];

        return response()->json($res, 201);
    }

    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $res = [
                'user' => $user->only(['name', 'email', 'role']),
                'token' => $user->createToken('MyApp')->plainTextToken
            ];
            return response()->json($res);
        }

        return response()->json('Unauthorised.', ['error'=>'Unauthorised']);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete();

        return response()->json();
    }
}
