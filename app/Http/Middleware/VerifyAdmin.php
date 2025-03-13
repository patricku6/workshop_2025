<?php

namespace App\Http\Middleware;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Middleware;
use Closure;

class VerifyAdmin extends Middleware
{
    public function handle(Request $request, Closure $next): RedirectResponse
    {
        $user = auth()->user();

        if (!$user) {
            return redirect()->route('login');
        }
        $isAdmin = $user->is_admin;
        if (!$isAdmin) {
            return redirect()->route('home');
        }

        return $next($request);
    }
}
