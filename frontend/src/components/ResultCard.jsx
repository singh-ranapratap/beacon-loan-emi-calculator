function ResultCard({ result }) {
    if (!result) return null;

    const formatCurrency = (value) => {
        return Number(value).toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
        });
    };

    const cards = [
        {
            title: "Monthly EMI",
            value: result.monthly_emi,
        },
        {
            title: "Total Interest",
            value: result.total_interest,
        },
        {
            title: "Total Payment",
            value: result.total_payment,
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-white rounded-xl shadow-lg p-5 text-center"
                >
                    <h3 className="text-gray-500 text-sm font-medium">
                        {card.title}
                    </h3>

                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        {formatCurrency(card.value)}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ResultCard;
