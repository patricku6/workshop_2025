<?php

use App\Http\Controllers\AuthController;
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

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/create', [AuthController::class, 'create'])->name('create');

Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/admin/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->name('admin.dashboard')->middleware(VerifyAdmin::class, 'auth');
