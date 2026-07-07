function ScheduleTable({ schedule }) {
    if (!schedule || schedule.length === 0) return null;

    const formatCurrency = (value) => {
        return Number(value).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        });
    };

    return (
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">
                Amortization Schedule
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border p-3">Month</th>
                            <th className="border p-3">Principal Paid</th>
                            <th className="border p-3">Interest Paid</th>
                            <th className="border p-3">Balance</th>
                        </tr>
                    </thead>

                    <tbody>
                        {schedule.map((item) => (
                            <tr
                                key={item.month}
                                className="text-center hover:bg-slate-50"
                            >
                                <td className="border p-2">
                                    {item.month}
                                </td>

                                <td className="border p-2">
                                    {formatCurrency(item.principal_paid)}
                                </td>

                                <td className="border p-2">
                                    {formatCurrency(item.interest_paid)}
                                </td>

                                <td className="border p-2">
                                    {formatCurrency(item.balance)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ScheduleTable;
