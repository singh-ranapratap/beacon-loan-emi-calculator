<?php

namespace App\Services;

class LoanCalculationService
{
    public function calculate(float $principal, float $annualRate, int $tenureMonths): array
    {
        // Monthly Interest Rate
        $monthlyRate = ($annualRate / 12) / 100;

        // EMI Calculation
        if ($monthlyRate == 0) {
            $emi = $principal / $tenureMonths;
        } else {
            $emi = ($principal * $monthlyRate * pow(1 + $monthlyRate, $tenureMonths))
                / (pow(1 + $monthlyRate, $tenureMonths) - 1);
        }

        $scheduleData = $this->generateSchedule(
            $principal,
            $monthlyRate,
            $emi,
            $tenureMonths
        );

        return [
            'principal' => round($principal, 2),
            'annual_rate' => round($annualRate, 2),
            'tenure_months' => $tenureMonths,
            'monthly_emi' => round($emi, 2),
            'total_interest' => $scheduleData['total_interest'],
            'total_payment' => round($principal + $scheduleData['total_interest'], 2),
            'schedule' => $scheduleData['schedule'],
        ];
    }

    private function generateSchedule(float $principal, float $monthlyRate, float $emi, int $tenureMonths): array
    {

        $balance = $principal;
        $schedule = [];
        $totalInterest = 0;

        for ($month = 1; $month <= $tenureMonths; $month++) {

            $interest = $balance * $monthlyRate;

            $principalPaid = $emi - $interest;

            // Last installment adjustment
            if ($principalPaid > $balance) {
                $principalPaid = $balance;
                $emi = $principalPaid + $interest;
            }

            $balance -= $principalPaid;

            if ($balance < 0) {
                $balance = 0;
            }

            $totalInterest += $interest;

            $schedule[] = [
                'month' => $month,
                'principal_paid' => round($principalPaid, 2),
                'interest_paid' => round($interest, 2),
                'balance' => round($balance, 2),
            ];
        }

        return [
            'schedule' => $schedule,
            'total_interest' => round($totalInterest, 2),
        ];
    }
}
