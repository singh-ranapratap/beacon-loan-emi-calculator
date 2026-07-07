<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class LoanCalculationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'principal' => ['required', 'numeric', 'min:1000'],
            'annual_rate' => ['required', 'numeric', 'between:0,50'],
            'tenure_months' => ['required', 'integer', 'between:1,360'],
        ];
    }

    public function messages(): array
    {
        return [
            'principal.required' => 'Loan amount is required.',
            'principal.numeric' => 'Loan amount must be numeric.',
            'principal.min' => 'Minimum loan amount is 1000.',

            'annual_rate.required' => 'Interest rate is required.',
            'annual_rate.numeric' => 'Interest rate must be numeric.',
            'annual_rate.between' => 'Interest rate must be between 0 and 50.',

            'tenure_months.required' => 'Tenure is required.',
            'tenure_months.integer' => 'Tenure must be an integer.',
            'tenure_months.between' => 'Tenure must be between 1 and 360 months.',
        ];
    }
}
