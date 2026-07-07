import { useState } from "react";
import LoanForm from "./components/LoanForm";
import ResultCard from "./components/ResultCard";
import ScheduleTable from "./components/ScheduleTable";
import api from "./services/api";

function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async (formData, setErrors) => {
        setLoading(true);
        setResult(null);

        try {
            const response = await api.post("/loan/calculate", formData);

            setResult(response.data.data);
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                alert("Something went wrong. Please try again.");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 py-10">
            <div className="max-w-6xl mx-auto px-4">

                <LoanForm
                    onCalculate={handleCalculate}
                    loading={loading}
                />

                {result && (
                    <>
                        <ResultCard result={result} />

                        <ScheduleTable
                            schedule={result.schedule}
                        />
                    </>
                )}

            </div>
        </div>
    );
}

export default App;
