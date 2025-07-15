<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class JsonMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (str_contains($request->path(), 'api')) {
            request()->headers->set('Accept', 'application/json');
        }
        return $next($request);
    }
}
