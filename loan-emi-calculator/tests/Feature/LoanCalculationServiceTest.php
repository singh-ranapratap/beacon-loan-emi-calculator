<?php

namespace Tests\Feature;

use Tests\TestCase;

class LoanCalculationServiceTest extends TestCase
{
    /**
     * Test successful loan EMI calculation.
     */
    public function test_loan_emi_calculation_successfully(): void
    {
        $response = $this->postJson('/api/loan/calculate', [
            'principal' => 500000,
            'annual_rate' => 10.5,
            'tenure_months' => 24,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Loan EMI calculated successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'principal',
                    'annual_rate',
                    'tenure_months',
                    'monthly_emi',
                    'total_interest',
                    'total_payment',
                    'schedule',
                ]
            ]);

        $this->assertCount(
            24,
            $response->json('data.schedule')
        );
    }

    /**
     * Test validation failure.
     */
    public function test_validation_fails_for_invalid_input(): void
    {
        $response = $this->postJson('/api/loan/calculate', [
            'principal' => 500,
            'annual_rate' => 60,
            'tenure_months' => 500,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'principal',
                'annual_rate',
                'tenure_months',
            ]);
    }
}
