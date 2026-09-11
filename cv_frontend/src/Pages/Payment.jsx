import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Payment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const cvId = params.get("cvId");

  useEffect(() => {
    if (!cvId) return;

    const startPayment = async () => {
      try {
        const token = localStorage.getItem("cv_token");

        // 1️⃣ CREATE ORDER
        const { data } = await API.post(
          "/payment/create-order",
          { cvId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // 2️⃣ RAZORPAY OPTIONS WITH ALL UPI METHODS
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: "INR",
          name: "CV Builder Pro",
          description: "Professional Resume Download",
          order_id: data.order.id,
          image: "/logo.png", // Add your logo for better UX

          // ✅ ENABLE ALL PAYMENT METHODS
          method: {
            upi: true,
            netbanking: true,
            card: true,
            wallet: true,
          },

          // ✅ UPI SPECIFIC CONFIGURATION
          upi: {
            flow: "collect", // This enables UPI QR and VPA
          },

          // ✅ PREFILL USER INFO (IMPORTANT FOR UPI)
          prefill: {
            name: "Customer", // You can get this from user profile
            email: "customer@example.com", // You can get this from user profile
            contact: "9999999999", // You can get this from user profile
          },

          handler: async (response) => {
            try {
              await API.post(
                "/payment/verify",
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  cvId,
                },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              // Open download in new tab
              window.open(
                `${import.meta.env.VITE_API_URL}/cv/${cvId}/download`,
                "_blank"
              );

              navigate("/dashboard");
            } catch (error) {
              console.error("Payment verification failed:", error);
              alert("Payment verification failed. Please contact support.");
              navigate("/dashboard");
            }
          },

          modal: {
            ondismiss: () => {
              if (window.confirm("Are you sure you want to cancel payment?")) {
                navigate("/dashboard");
              }
            },
          },

          theme: {
            color: "#4f46e5",
            backdrop_color: "#ffffff",
          },

          // ✅ ADDITIONAL OPTIONS FOR BETTER UX
          notes: {
            cvId: cvId,
            product: "Resume Download",
          },

          // ✅ RETRY OPTIONS
          retry: {
            enabled: true,
            max_count: 3,
          },

          // ✅ TIMEOUT (30 minutes)
          timeout: 1800,
          remember_customer: false,
        };

        // 3️⃣ OPEN CHECKOUT
        const razorpay = new window.Razorpay(options);
        razorpay.open();

        // Handle errors
        razorpay.on("payment.failed", function (response) {
          console.error("Payment failed:", response.error);
          alert(`Payment failed: ${response.error.description}`);
          navigate("/dashboard");
        });

      } catch (err) {
        console.error("Payment initialization error:", err);
        alert("Payment initialization failed. Please try again.");
        navigate("/dashboard");
      }
    };

    startPayment();
  }, [cvId, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Redirecting to Secure Payment
        </h2>
        <p className="text-gray-600 mb-4">
          Please wait while we connect you to Razorpay...
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">GP</span>
            </div>
            <span className="text-sm text-gray-600">Google Pay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold">PP</span>
            </div>
            <span className="text-sm text-gray-600">PhonePe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">PT</span>
            </div>
            <span className="text-sm text-gray-600">Paytm</span>
          </div>
        </div>
      </div>
    </div>
  );
}