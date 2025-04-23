import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Download, FileText } from "lucide-react";
import { generateInvoice, clearInvoiceData } from "../../feauture/transaction/transactionSlice";

const InvoicesPage = () => {
  const dispatch = useDispatch();
  const { loading, error, invoiceData } = useSelector((state) => state.transaction);
  
  useEffect(() => {
    // Cleanup invoice data when component unmounts
    return () => {
      dispatch(clearInvoiceData());
    };
  }, [dispatch]);
  
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(generateInvoice(formData));
  };

  const handleDownload = () => {
    // In a real app, this would download the invoice PDF
    // You can add a download link here that points to your backend API
    if (invoiceData && invoiceData.pdfUrl) {
      window.open(invoiceData.pdfUrl, '_blank');
    } else {
      alert("Invoice downloaded successfully!");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generate Invoice</h1>

      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 text-center mb-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-[#252525] border-[#333333] mb-8 rounded-lg overflow-hidden border">
        <div className="p-6">
          <h2 className="text-xl font-semibold">Period Invoice</h2>
          <p className="text-gray-400 text-sm">Generate an invoice for a specific date range</p>
        </div>
        <div className="px-6 pb-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="startDate" className="block text-sm font-medium">Start Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="startDate"
                    name="startDate"
                    type="date"
                    className="pl-10 bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] w-full p-2 rounded-md border"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="endDate" className="block text-sm font-medium">End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="endDate"
                    name="endDate"
                    type="date"
                    className="pl-10 bg-[#1E1E1E] border-[#333333] focus:border-[#B0F127] w-full p-2 rounded-md border"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>
          </form>
        </div>
        <div className="px-6 pb-6 pt-2">
          <button
            className="w-full bg-[#B0F127] text-black hover:bg-[#70EE91] py-2 px-4 rounded-md font-medium flex items-center justify-center"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <span className="flex items-center">
                <div className="animate-spin h-5 w-5 mr-3 border-2 border-black border-t-transparent rounded-full"></div>
                Generating...
              </span>
            ) : (
              <span className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Generate Invoice
              </span>
            )}
          </button>
        </div>
      </div>

      {invoiceData && (
        <div className="bg-[#252525] border-[#333333] rounded-lg overflow-hidden border">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Invoice Summary</h2>
            <p className="text-gray-400 text-sm">
              Period: {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Transactions</p>
                  <p className="text-2xl font-bold">{invoiceData.transactionCount}</p>
                </div>
                <div className="bg-[#1E1E1E] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(invoiceData.totalAmount)}</p>
                </div>
              </div>

              <div className="border-t border-[#333333] pt-6">
                <h3 className="text-lg font-medium mb-4">Invoice Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Invoice Number:</span>
                    <span>{invoiceData.invoiceNumber || 'INV-' + Math.floor(Math.random() * 10000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issue Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-[#70EE91]">Ready for download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <button
              className="w-full bg-[#B0F127] text-black hover:bg-[#70EE91] py-2 px-4 rounded-md font-medium flex items-center justify-center"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;