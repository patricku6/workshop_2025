<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return redirect()->route('contact')->with('success', 'Message sent successfully!');
    }

    public function update(Request $request)
    {
        $user = auth()->user();
        $data = $request->all();
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'password' => ['nullable', 'string', 'min:8'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $user->name = $data['name'];
        $user->email = $data['email'];
        if ($data['password']) {
            $user->password = Hash::make($data['password']);
        }
        $user->save();

        return redirect()->route('profile.index');
    }
}

