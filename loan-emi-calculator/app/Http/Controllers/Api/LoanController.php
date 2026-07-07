<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoanCalculationRequest;
use App\Services\LoanCalculationService;
use Illuminate\Http\JsonResponse;

class LoanController extends Controller
{
    public function calculate(LoanCalculationRequest $request, LoanCalculationService $service): JsonResponse
    {

        $result = $service->calculate(
            $request->principal,
            $request->annual_rate,
            $request->tenure_months
        );

        return response()->json([
            'success' => true,
            'message' => 'Loan EMI calculated successfully.',
            'data' => $result,
        ], 200);
    }
}
