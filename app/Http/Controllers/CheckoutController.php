<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Purchase;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);
        return Inertia::render('Checkout', ['cart' => $cart]);
    }

    public function store()
    {
        $cart = session()->get('cart', []);

        foreach ($cart as $product) {
            $productModel = Product::find($product['id']);
            $productModel->stock -= $product['quantity'];
            $productModel->save();
        }

        $purchase = new Purchase();

        $purchase->items = $cart;
        $purchase->voldaan = true;
        $purchase->bedrag = collect($cart)->sum(function ($product) {
            return $product['price'] * $product['quantity'];
        });
        $purchase->user_id = auth()->user()->id;
        $purchase->save();

        session()->forget('cart');
        return redirect()->route('checkout.index')->with('success', 'Bedankt voor uw bestelling');
    }

    public function showPurchases(){
        $purchases = Purchase::where('user_id', auth()->user()->id)->get();
        return Inertia::render('Purchases', ['purchases' => $purchases]);
    }
}
