<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeedbackResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => collect(config('ikonic.feedback_categories'))->where('id', '=', $this->category)->first(),
            'user' => $this->user ? $this->user : null,
            'comments' => $this->comments ? CommentResource::collection($this->comments) :  [],
            'created_at' => $this->created_at->diffForHumans()
        ];
    }
}
