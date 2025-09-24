import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const CancelPage = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6 py-20"
            style={{
                background: "radial-gradient(circle at top left, #fcecec, #fff6f6 70%)",
            }}
        >
            <div className="max-w-xl w-full bg-white shadow-xl rounded-3xl p-12 text-center">
                <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-red-100 shadow-inner animate-pulse">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-16 h-16 text-red-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>

                <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-red-600">
                    Subscription Cancelled
                </h1>

                <p className="mb-10 max-w-md mx-auto text-lg text-gray-700 leading-relaxed">
                    Looks like you canceled your subscription process. Don’t worry — you
                    can always try again later.
                </p>

                <Button
                    className="bg-red-600 text-white font-semibold hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default CancelPage;
