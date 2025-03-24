<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('AdminDashboard');
    }

    public function users()
    {
        $users = User::all();
        return Inertia::render('admin/Users', ['users' => $users]);
    }

    public function products()
    {
        $products = Product::all();
        $categories = Category::all();
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
}

