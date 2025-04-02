<?php
namespace App\Http\Controllers;

use App\Models\Review;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log; 

class ReviewController extends Controller {
    public function index() {
        return Inertia::render('Reviews');
    }

    public function getReviews()
    {
        $reviews = Review::all(); 
        return response()->json($reviews);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'message' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('reviews', 'public'); 
            $validated['image'] = $imagePath;
        } 
        else
        {
            $validated['image'] = null;
        }

        $review = Review::create($validated);

        Log::info('Review Created: ', $review->toArray());

        return response()->json($review, 201);
    }
}