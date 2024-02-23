<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Feedback;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = \App\Models\User::factory()
            ->create([
                'name' => 'shahab',
                'email' => 'shahab.developer.work@gmail.com',
                'password' => Hash::make('12345678'),
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now()
            ]);
        $anotherUser =
            \App\Models\User::factory()
            ->create([
                'name' => 'comment user',
                'email' => 'comment.user.work@gmail.com',
                'password' => Hash::make('12345678'),
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now()
            ]);

        \App\Models\Feedback::factory()
            ->has(
                \App\Models\Comment::factory()
                    // ->state(function ($attributes, Feedback $feedback) use ($user, $anotherUser) {
                    //     return [
                    //         'feedback_id' => $feedback->id,
                    //     ];
                    // })
                    ->sequence(
                        ['user_id' => $user->id],
                        ['user_id' => $anotherUser->id]
                    )
                    ->count(5)
            )
            ->sequence(
                ['category' => 1],
                ['category' => 2],
                ['category' => 3]
            )
            ->for($user)
            ->count(15)
            ->create();
    }
}
