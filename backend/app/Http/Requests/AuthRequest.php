<?php

namespace App\Http\Requests;

class AuthRequest extends BaseFormRequest
{
    public function loginRules()
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }

    public function signupRules()
    {
        return [
            'name' => ['required'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
