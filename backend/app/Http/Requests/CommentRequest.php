<?php

namespace App\Http\Requests;

use App\Rules\ArrayOfIdsExists;

class CommentRequest extends BaseFormRequest
{
    public function storeRules()
    {
        return [
            'content' => ['required'],
            'feedback_id' => ['required', 'exists:feedbacks,id'],
            'mentioned_users' => ['sometimes', 'array', new ArrayOfIdsExists]
        ];
    }
}
