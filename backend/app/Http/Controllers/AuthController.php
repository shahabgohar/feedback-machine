<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(AuthRequest $request)
    {
        $requestedData = $request->validated();

        if (!Auth::attempt($requestedData)) {
            $this->sendFail('failed to login', [
                'email' => 'Invalid Email'
            ], 422);
        }
        $authUser = Auth::user();
        $accessToken = $authUser->createToken('user')->plainTextToken;

        $data = [
            'message' => 'success',
            'access_token' => $accessToken,
            'user' => new UserResource($authUser),
        ];

        return $this->sendResponse($data);
    }

    public function signup(AuthRequest $request)
    {
        $requestedData = $request->validated();

        $user = new User();
        $user->name = $requestedData['name'];
        $user->email = $requestedData['email'];
        $user->password = Hash::make($requestedData['password']);
        $user->save();

        return $this->sendResponse([
            'message' => 'user created successfully'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->sendResponse([
            'message' => __('User logged out!'),
        ]);
    }
}
