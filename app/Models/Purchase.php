<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected function casts(): array
    {
        return [
            'items' => 'array',
            'voldaan' => 'boolean',
        ];
    }

    protected $fillable = [
        'items',
        'voldaan',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getPurchasedProducts()
    {
        $this->items = json_decode($this->items);

        $products = [];
        foreach ($this->items as $item) {
            $product = Product::find($item->product_id);
            $product->quantity = $item->quantity;
            $products[] = $product;
        }

        return $products;
    }
}
