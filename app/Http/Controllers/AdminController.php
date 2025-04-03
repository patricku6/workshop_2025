<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $purchases = \App\Models\Purchase::selectRaw('DATE(created_at) as date, COUNT(*) as value')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $users = \App\Models\User::selectRaw('DATE(created_at) as date, COUNT(*) as value')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $products = \App\Models\Product::selectRaw('DATE(created_at) as date, COUNT(*) as value')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return Inertia::render('AdminDashboard', [
            'stats' => [
                'users' => \App\Models\User::count(),
                'products' => \App\Models\Product::count(),
                'purchases' => \App\Models\Purchase::count(),
            ],
            'miniGraphs' => [
                'users' => $users,
                'products' => $products,
                'purchases' => $purchases,
            ]
        ]);
    }



    public function users()
    {
        $users = User::all();
        return Inertia::render('admin/Users', ['users' => $users]);
    }

    public function products()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        $categories = Category::orderBy('created_at', 'desc')->get();
        return Inertia::render('admin/Products', ['products' => $products, 'categories' => $categories]);
    }

    public function categories()
    {
        $categories = Category::all();
        return Inertia::render('admin/Categories', ['categories' => $categories]);
    }

    public function updateUsers(Request $request)
    {
        $user = User::find($request->id);
        $user->is_admin = $request->is_admin;
        $user->email = $request->email;
        $user->name = $request->name;
        $user->save();
        return redirect()->route('admin.users');
    }

    public function deleteUsers(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();
        return redirect()->route('admin.users');
    }

    // purchases
    public function purchases()
    {
        $purchases = Purchase::orderBy('created_at', 'desc')->get();

        foreach ($purchases as $purchase) {
            $purchase->username = User::find($purchase->user_id)->name;
        }

        return Inertia::render('admin/Purchase', ['purchases' => $purchases]);
    }

    // edit purchase
    public function updatePurchase(Request $request)
    {
        $purchase = Purchase::find($request->id);
        if ($purchase) {
            $purchase->voldaan = $request->voldaan;
            $purchase->bedrag = $request->bedrag;
            $purchase->items = $request->items;
            $purchase->save();
        }
        return redirect()->route('admin.purchases');
    }

    // delete purchase
    public function deletePurchase(Request $request)
    {
        $purchase = Purchase::find($request->id);
        if ($purchase) {
            $purchase->delete();
        }
        return redirect()->route('admin.purchases');
    }

}

