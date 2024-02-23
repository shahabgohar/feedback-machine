<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MasterController extends Controller
{
    public function index()
    {
        $data = [
            'feedback_categories' => config('ikonic.feedback_categories')
        ];

        return $this->sendResponse($data);
    }
}
