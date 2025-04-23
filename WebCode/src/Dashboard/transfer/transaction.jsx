import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Check } from "lucide-react";
import { transferFunds, clearTransferStatus } from "../../feauture/transaction/transactionSlice";

function TransferPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transferLoading, transferError, transferSuccess } = useSelector((state) => state.transaction);
  
  const [formData, setFormData] = useState({
    sourceAccount: "",
    destinationAccount: "",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]);

  // Fetch user accounts when component mounts
  useEffect(() => {
    // In a real app, fetch accounts from your backend API
    // For now, using mock data
    setAccounts([
      { id: "acc1", name: "Main Account", balance: 12345.67 },
      { id: "acc2", name: "Savings Account", balance: 5678.9 },
      { id: "acc3", name: "Investment Account", balance: 9876.54 },
    ]);
  }, []);

  // Reset transfer status when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearTransferStatus());
    };
  }, [dispatch]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sourceAccount) {
      newErrors.sourceAccount = "Source account is required";
    }

    if (!formData.destinationAccount) {
      newErrors.destinationAccount = "Destination account is required";
    }

    if (formData.sourceAccount === formData.destinationAccount) {
      newErrors.destinationAccount = "Source and destination accounts cannot be the same";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Dispatch transfer action
    dispatch(transferFunds(formData));
  };

  // Redirect to dashboard after successful transfer
  useEffect(() => {
    if (transferSuccess) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [transferSuccess, navigate]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Transfer Funds</h1>

      {transferSuccess ? (
        <div className="bg-[#252525] border-[#333333] border rounded-lg overflow-hidden">
          <div className="pt-6 px-6 pb-6">
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-[#70EE91]/20 p-3 rounded-full mb-4">
                <Check className="h-8 w-8 text-[#70EE91]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Transfer Successful!</h2>
              <p className="text-gray-400 mb-6">
                Your transfer of {formatCurrency(Number(formData.amount))} has been processed successfully.
              </p>
              <button 
                className="bg-[#B0F127] text-black hover:bg-[#70EE91] px-4 py-2 rounded-md font-medium"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#252525] border-[#333333] border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-[#333333]">
            <h2 className="text-xl font-bold">Transfer Details</h2>
            <p className="text-gray-400 text-sm">Transfer funds between your accounts or to other recipients</p>
          </div>
          
          {transferError && (
            <div className="mx-6 mt-6 bg-red-500/10 text-red-500 p-3 rounded-md text-sm">
              {transferError}
            </div>
          )}
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="sourceAccount" className="block text-sm font-medium">From Account</label>
                  <div className="relative">
                    <select
                      id="sourceAccount"
                      value={formData.sourceAccount}
                      onChange={(e) => handleSelectChange("sourceAccount", e.target.value)}
                      className="w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md appearance-none border"
                    >
                      <option value="">Select source account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} ({formatCurrency(account.balance)})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  {errors.sourceAccount && <p className="text-red-500 text-sm">{errors.sourceAccount}</p>}
                </div>

                {/* Destination account selection */}
                <div className="space-y-2">
                  <label htmlFor="destinationAccount" className="block text-sm font-medium">To Account</label>
                  <div className="relative">
                    <select
                      id="destinationAccount"
                      value={formData.destinationAccount}
                      onChange={(e) => handleSelectChange("destinationAccount", e.target.value)}
                      className="w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md appearance-none border"
                    >
                      <option value="">Select destination account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                      <option value="external">External Account</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  {errors.destinationAccount && <p className="text-red-500 text-sm">{errors.destinationAccount}</p>}
                </div>

                {formData.destinationAccount === "external" && (
                  <div className="space-y-2">
                    <label htmlFor="accountNumber" className="block text-sm font-medium">Account Number</label>
                    <input
                      id="accountNumber"
                      name="accountNumber"
                      placeholder="Enter account number"
                      className="w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md border"
                      onChange={handleChange}
                    />
                  </div>
                )}

                {/* Amount input */}
                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">$</span>
                    <input
                      id="amount"
                      name="amount"
                      placeholder="0.00"
                      className="pl-8 w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md border"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
                </div>

                {/* Description input */}
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium">Description (Optional)</label>
                  <input
                    id="description"
                    name="description"
                    placeholder="Enter a description for this transfer"
                    className="w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md border"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="px-6 pb-6 border-t border-[#333333] pt-6">
            <button
              type="submit"
              className="w-full bg-[#B0F127] text-black hover:bg-[#70EE91] py-2 px-4 rounded-md font-medium flex items-center justify-center"
              disabled={transferLoading}
              onClick={handleSubmit}
            >
              {transferLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin h-5 w-5 mr-3 border-2 border-black border-t-transparent rounded-full"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  Transfer Funds
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferPage;
