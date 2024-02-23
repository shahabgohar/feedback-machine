<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CategoryRule implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $eneteredCategory = collect(config('ikonic.feedback_categories'))->filter(function ($configValue, $key) use ($value) {
            return $configValue['id'] == $value;
        });

        if (count($eneteredCategory) === 0) {
            $fail('The :attribute must be a valid category');
        }
    }
}
