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
        $categoryId = is_numeric($category) ? $category : Category::where('name', $category)->first()->id;
        $categoryName = Category::find($categoryId)->name ?? $category;
        return Inertia::render('Products', [
            'products' => Product::where('category_id', $categoryId)->get(),
            'categories' => Category::all(),
            'category' => $categoryName
        ]);
    }

    public function show($id)
    {
        $product = Product::find($id);
        $category = Category::find($product->category_id);

        if (!$product) {
            return redirect()->back()->with('error', 'Product niet gevonden');
        }

        if ($product->stock <= 0) {
            return redirect()->back()->with('error', 'Product is uitverkocht');
        }
        return Inertia::render('Product', [
            'product' => $product,
            'category' => $category
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
                'id' => $product->id,
                'name' => $product->name,
                'quantity' => 1,
                'price' => $product->price,
                'image' => $product->image,
                'sale' => $product->sale,
            ];
        }

        session()->put('cart', $cart);

        return redirect()->route('products.index')->with('success', 'Product toegevoegd aan winkelwagen');
    }

    public function removeFromCart(Request $request)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$request->product_id])) {
            if ($cart[$request->product_id]['quantity'] > 1) {
                $cart[$request->product_id]['quantity']--;
            } else {
                unset($cart[$request->product_id]);
            }
        }

        session()->put('cart', $cart);


        return redirect()->back()->with('success', 'Product verwijderd uit winkelwagen');
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
            'sale' => 'nullable|integer',
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
            'sale' => $request->sale,
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
            'sale' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return back()->with('error', $validator->errors());
        }
        $product = Product::find($request->id);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('public/products');
            $imageUrl = str_replace('public/', 'storage/', $imagePath);
        } else {
            $imageUrl = $product->image;
        }

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'image' => $imageUrl,
            'category_id' => $request->category_id,
            'sale' => $request->sale,
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
