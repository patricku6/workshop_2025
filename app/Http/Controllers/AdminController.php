<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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

