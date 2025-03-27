<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products', [
            'products' => Product::all(),
            'categories' => Category::all()
        ]);
    }

    public function search($search)
    {
        return Inertia::render('Products', [
            'products' => Product::where('name', 'like', '%' . $search . '%')->get(),
            'categories' => Category::all(),
            'search' => $search
        ]);
    }

    public function indexByCategory($category)
    {
        $categoryId = Category::where('name', $category)->first()->id;
        return Inertia::render('Products', [
            'products' => Product::where('category_id', $categoryId)->get(),
            'categories' => Category::all(),
            'category' => $category
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Product', [
            'product' => Product::find($id)
        ]);
    }

    public function addToCart(Request $request)
    {
        $product = Product::find($request->product_id);
        $cart = session()->get('cart', []);

        if (isset($cart[$request->product_id])) {
            $cart[$request->product_id]['quantity']++;
        } else {
            $cart[$request->product_id] = [
                'name' => $product->name,
                'quantity' => 1,
                'price' => $product->price,
                'image' => $product->image,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->route('products.index')->with('success', 'Product toegevoegd aan winkelwagen');
    }

    public function getCart()
    {
        return session()->get('cart', []);
    }

    public function createProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'nullable|exists:categories,id|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $imageUrl = 'storage/' . $imagePath;
        } else {
            return response()->json(['error' => 'Afbeelding niet geüpload'], 400);
        }

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imageUrl,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('admin.products')->with('success', 'Product succesvol aangemaakt');
    }

    public function updateProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:products,id',
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors());
        }

        $product = Product::find($request->id);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/products');
            $imageUrl = str_replace('public/', 'storage/', $imagePath);
        } else {
            return back()->with('error', 'Afbeelding niet geüpload');
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imageUrl,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('admin.products')->with('success', 'Product succesvol bijgewerkt');
    }

    public function deleteProduct(Request $request)
    {
        $product = Product::find($request->id);

        if ($product->image) {
            Storage::delete(str_replace('storage/', 'public/', $product->image));
        }

        $product->delete();

        return redirect()->route('admin.products')->with('success', 'Product succesvol verwijderd');
    }
}
