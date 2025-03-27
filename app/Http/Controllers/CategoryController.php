<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{

    public function fetchCategories()
    {
        $categories = Category::all();

        return view('admin.categories', [
            'categories' => $categories,
        ]);
    }

    public function createCategory(Request $request): RedirectResponse
    {
        $category = Category::create([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.categories')->with('success', 'Categorie succesvol aangemaakt');
    }

    public function deleteCategory(Request $request): RedirectResponse
    {
        $category = Category::find($request->id);

        if (!$category) {
            return redirect()->route('admin.categories')->with('error', 'Category not found.');
        }

        DB::table('products')->where('category_id', $category->id)->update(['category_id' => null]);

        $category->delete();

        return redirect()->route('admin.categories')->with('success', 'Category deleted successfully.');
    }

}

