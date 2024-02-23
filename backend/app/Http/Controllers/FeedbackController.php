<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\FeedbackResource;
use App\Http\Resources\PaginationResource;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // $feedbacks = Feedback::with(['user'])
        //     ->orderBy('created_at', 'desc')
        //     ->paginate($request->input('paginate', 15));
        $feedbacks = Feedback::with(['user'])
            ->orderBy('created_at', 'desc')
            ->get();
        return $this->sendResponse([
            'feedbacks' => FeedbackResource::collection($feedbacks)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FeedbackRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $user = Auth::user();
            $feedback = new Feedback();
            $feedback->title = $validatedData['title'];
            $feedback->description = $validatedData['description'];
            $feedback->category = $validatedData['category'];

            $user->feedbacks()->save($feedback);

            return $this->sendResponse([
                'feedback' => new FeedbackResource($feedback),
                'message' => 'feedback created successfully'
            ]);
        } catch (\Exception $e) {
            $this->sendError($e, 300);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
        $feedback->load(['comments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }, 'user']);
        $users = User::all();
        return $this->sendResponse([
            'feedback' => new FeedbackResource($feedback),
            'users' => $users
        ]);
    }
}
