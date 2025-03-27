<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\VerifyAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register');
})->name('register');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index')->middleware('auth');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{search}', [ProductController::class, 'search'])->name('products.search');
Route::get('/products/category/{category}', [ProductController::class, 'indexByCategory'])->name('products.category');
Route::get('/product/{id}', [ProductController::class, 'show'])->name('products.show');

Route::get('/categories', [CategoryController::class, 'fetchCategories'])->name('admin.categories');

Route::post('cart/add', [ProductController::class, 'addToCart'])->name('cart.add');
Route::get('cart/get', [ProductController::class, 'getCart'])->name('cart.get');
Route::post('cart/remove', [ProductController::class, 'removeFromCart'])->name('cart.remove');

Route::post('/profile-update', [ProfileController::class, 'update'])->name('profile.update');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/create', [AuthController::class, 'create'])->name('create');

Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');

Route::get('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard')->middleware(VerifyAdmin::class, 'auth');
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users')->middleware(VerifyAdmin::class, 'auth');
Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products')->middleware(VerifyAdmin::class, 'auth');
Route::get('/admin/categories', [AdminController::class, 'categories'])->name('admin.categories')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/categories/create', [CategoryController::class, 'createCategory'])->name('admin.categories.create')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/categories/delete', [CategoryController::class, 'deleteCategory'])->name('admin.categories.delete')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/products/create', [ProductController::class, 'createProduct'])->name('admin.products.create')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/products/update', [ProductController::class, 'updateProduct'])->name('admin.products.update')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/products/delete', [ProductController::class, 'deleteProduct'])->name('admin.products.delete')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/users/update', [AdminController::class, 'updateUsers'])->name('admin.users.update')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/users/delete', [AdminController::class, 'deleteUsers'])->name('admin.users.delete')->middleware(VerifyAdmin::class, 'auth');
Route::get('/isLoggedIn', [AuthController::class, 'isLoggedIn'])->name('isLoggedIn');
Route::get('/getInitials', [AuthController::class, 'getInitials'])->name('getInitials');
Route::get('/isAdmin', [AuthController::class, 'isAdmin'])->name('isAdmin');


