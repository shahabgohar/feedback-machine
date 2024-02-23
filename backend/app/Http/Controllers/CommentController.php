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
        $comment->mentionedUsers()->sync($validatedData['mentioned_users']);

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
}
