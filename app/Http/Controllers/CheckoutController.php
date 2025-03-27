<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        return Inertia::render('Checkout', ['cart' => $cart]);
    }
}
