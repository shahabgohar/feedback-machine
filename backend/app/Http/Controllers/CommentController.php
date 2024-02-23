<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(CommentRequest $request)
    {
        // try {
        //     $validatedData = $request->validated();
        //     $feedback = Feedback::where('id', $validatedData['feedback_id'])->first();
        //     $comment = new Comment();
        //     $comment->content = $validatedData['content'];
        //     $comment->date = $validatedData['date'];
        //     $feedback->comments()->save($comment);
        // } catch (\Exception $e) {
        //     $this->sendError($e, 300);
        // }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommentRequest $request)
    {
        $validatedData = $request->validated();
        $comment = new Comment();
        $comment->content = $validatedData['content'];
        $comment->feedback_id = $validatedData['feedback_id'];
        $user = Auth::user();
        $user->comments()->save($comment);
        $comment->load('user');

        return $this->sendResponse([
            'message' => 'success',
            'comment' => new CommentResource($comment)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
