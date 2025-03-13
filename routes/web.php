<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
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

Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index')->middleware('auth');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::post('/profile-update', [ProfileController::class, 'update'])->name('profile.update');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/create', [AuthController::class, 'create'])->name('create');

Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard')->middleware(VerifyAdmin::class, 'auth');
Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/users/update', [AdminController::class, 'updateUsers'])->name('admin.users.update')->middleware(VerifyAdmin::class, 'auth');
Route::post('/admin/users/delete', [AdminController::class, 'deleteUsers'])->name('admin.users.delete')->middleware(VerifyAdmin::class, 'auth');
Route::get('/isLoggedIn', [AuthController::class, 'isLoggedIn'])->name('isLoggedIn');

