<?php

namespace App\Models;

use Database\Factories\FeedbackFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class Feedback extends Model
{
    use HasFactory;

    protected $table = 'feedbacks';

    protected $dates = ['created_at', 'updated_at'];

    protected static function newFactory(): Factory
    {
        return FeedbackFactory::new();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
