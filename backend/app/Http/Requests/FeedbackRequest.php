<?php

namespace App\Http\Requests;

use App\Rules\CategoryRule;

class FeedbackRequest extends BaseFormRequest
{
    public function storeRules()
    {
        return [
            'title' => ['required'],
            'description' => ['required'],
            'category' => ['required', new CategoryRule]
        ];
    }

    public function updateRules()
    {
        return [
            'id' => ['required', 'exists:feedbacks,id'],
            'title' => ['required'],
            'description' => ['required']
        ];
    }
}
