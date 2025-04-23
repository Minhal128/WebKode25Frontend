import React, { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, setCurrentPage } from "../../feauture/transaction/transactionSlice";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { 
    filteredTransactions, 
    isLoading, 
    currentPage, 
    totalPages 
  } = useSelector(state => state.transaction);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const pageSize = 10;

  useEffect(() => {
    dispatch(fetchTransactions({ 
      page: currentPage, 
      limit: pageSize,
      type: filterType !== 'all' ? filterType : undefined,
      search: searchTerm || undefined 
    }));
  }, [dispatch, currentPage, filterType, searchTerm]);
  // Helper function to generate description from transaction type
  // These helper functions will be used when we implement transaction creation/editing
  // Keeping them commented for future use
  /*
  const getDescriptionFromType = (type) => {
    switch(type) {
      case 'subscription': return 'Subscription payment';
      case 'card_payment': return 'Card payment';
      case 'transfer': return 'Funds transfer';
      case 'refund': return 'Refund processed';
      case 'withdrawal': return 'Funds withdrawal';
      default: return 'Transaction';
    }
  };

  const getCategoryFromType = (type) => {
    switch(type) {
      case 'subscription': return 'Subscription';
      case 'card_payment': return 'Payment';
      case 'transfer': return 'Transfer';
      case 'refund': return 'Refund';
      case 'withdrawal': return 'Withdrawal';
      default: return 'Other';
    }
  };
  */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
      </div>

      <div className="bg-[#252525] border-[#333333] border rounded-lg overflow-hidden">
        <div className="p-6 border-b border-[#333333]">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <p className="text-gray-400 text-sm">View and filter your transaction history</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                placeholder="Search transactions..."
                className="pl-9 bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] w-full p-2 rounded-md border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-[180px]">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] p-2 rounded-md appearance-none border"
              >
                <option value="all">All Transactions</option>
                <option value="incoming">Incoming</option>
                <option value="outgoing">Outgoing</option>
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
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <svg
                className="animate-spin h-8 w-8 mx-auto text-[#B0F127]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="mt-4 text-gray-400">Loading transactions...</p>
            </div>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No transactions found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#333333]">
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                      <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                      <th className="text-right py-3 px-4 text-gray-400 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-[#333333] hover:bg-[#1E1E1E]/50 transition-colors"
                      >
                        <td className="py-4 px-4">{formatDate(transaction.date)}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-1.5 rounded-full ${
                                transaction.type === "incoming"
                                  ? "bg-[#70EE91]/20 text-[#70EE91]"
                                  : "bg-red-500/20 text-red-500"
                              }`}
                            >
                              {transaction.type === "incoming" ? (
                                <ArrowDown className="h-4 w-4" />
                              ) : (
                                <ArrowUp className="h-4 w-4" />
                              )}
                            </div>
                            {transaction.description}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-[#1E1E1E]">{transaction.category}</span>
                        </td>
                        <td
                          className={`py-4 px-4 text-right font-medium ${
                            transaction.type === "incoming" ? "text-[#70EE91]" : "text-red-500"
                          }`}
                        >
                          {transaction.type === "incoming" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-400">
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, filteredTransactions.length)} of{" "}
                  {filteredTransactions.length} transactions
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 border border-[#333333] hover:bg-[#333333]/50 rounded-md text-sm"
                    disabled={currentPage === 1}
                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                  >
                    Previous
                  </button>
                  <button
                    className="px-4 py-2 border border-[#333333] hover:bg-[#333333]/50 rounded-md text-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;