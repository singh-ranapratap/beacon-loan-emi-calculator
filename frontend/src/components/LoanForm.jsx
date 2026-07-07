import { useState } from "react";

function LoanForm({ onCalculate, loading }) {
    const [formData, setFormData] = useState({
        principal: "",
        annual_rate: "",
        tenure_months: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: "",
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});

        onCalculate(formData, setErrors);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 space-y-5"
        >
            <h2 className="text-2xl font-bold text-center text-slate-800">
                Loan EMI Calculator
            </h2>

            {/* Loan Amount */}

            <div>
                <label className="block mb-2 font-medium">
                    Loan Amount
                </label>

                <input
                    type="number"
                    disabled={loading}
                    name="principal"
                    value={formData.principal}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="500000"
                />

                {errors.principal && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.principal[0]}
                    </p>
                )}
            </div>

            {/* Interest */}

            <div>
                <label className="block mb-2 font-medium">
                    Annual Interest Rate (%)
                </label>

                <input
                    type="number"
                    disabled={loading}
                    step="0.01"
                    name="annual_rate"
                    value={formData.annual_rate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="10.5"
                />

                {errors.annual_rate && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.annual_rate[0]}
                    </p>
                )}
            </div>

            {/* Tenure */}

            <div>
                <label className="block mb-2 font-medium">
                    Tenure (Months)
                </label>

                <input
                    type="number"
                    disabled={loading}
                    name="tenure_months"
                    value={formData.tenure_months}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                    placeholder="24"
                />

                {errors.tenure_months && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.tenure_months[0]}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
                {loading ? "Calculating..." : "Calculate EMI"}
            </button>
        </form>
    );
}

export default LoanForm;
