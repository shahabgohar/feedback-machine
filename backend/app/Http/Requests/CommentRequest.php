<?php

namespace App\Http\Requests;

class CommentRequest extends BaseFormRequest
{
    public function storeRules()
    {
        return [
            'content' => ['required'],
            'feedback_id' => ['required', 'exists:feedbacks,id'],
        ];
    }
}
