import React, { useState, useEffect } from 'react';
import { getOrderStatsAPI } from '../../services/orderService';
import { FaChartBar, FaEnvelope, FaDatabase, FaDollarSign, FaShoppingCart } from 'react-icons/fa';
import { MdTrendingUp } from 'react-icons/md';

const OrderStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getOrderStatsAPI();

      if (response.success) {
        setStats(response.data);
      } else {
        setError(response.message || 'Failed to fetch statistics');
      }
    } catch (error) {
      console.error('Stats API error:', error);
      setError(error.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-red-600 text-center">
          <p>Error loading statistics: {error}</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const formatCurrency = (amount) => {
    return `₹${parseFloat(amount || 0).toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaChartBar className="text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Order Statistics</h2>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center gap-1">
          <FaDatabase className="text-xs" />
          Enhanced Tracking
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Orders */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900">
                {stats.overall_stats?.total_orders || 0}
              </p>
            </div>
            <FaShoppingCart className="text-blue-600 text-xl" />
          </div>
        </div>

        {/* Unique Emails */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Unique Emails</p>
              <p className="text-2xl font-bold text-green-900">
                {stats.overall_stats?.unique_emails || 0}
              </p>
            </div>
            <FaEnvelope className="text-green-600 text-xl" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(stats.overall_stats?.total_revenue)}
              </p>
            </div>
            <FaDollarSign className="text-purple-600 text-xl" />
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Avg Order Value</p>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(stats.overall_stats?.average_order_value)}
              </p>
            </div>
            <MdTrendingUp className="text-orange-600 text-xl" />
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-yellow-600 text-sm font-medium">Pending</p>
          <p className="text-xl font-bold text-yellow-900">
            {stats.overall_stats?.pending_orders || 0}
          </p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-600 text-sm font-medium">Processing</p>
          <p className="text-xl font-bold text-blue-900">
            {stats.overall_stats?.processing_orders || 0}
          </p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <p className="text-purple-600 text-sm font-medium">Shipped</p>
          <p className="text-xl font-bold text-purple-900">
            {stats.overall_stats?.shipped_orders || 0}
          </p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-green-600 text-sm font-medium">Delivered</p>
          <p className="text-xl font-bold text-green-900">
            {stats.overall_stats?.delivered_orders || 0}
          </p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-red-600 text-sm font-medium">Cancelled</p>
          <p className="text-xl font-bold text-red-900">
            {stats.overall_stats?.cancelled_orders || 0}
          </p>
        </div>
      </div>

      {/* Email Breakdown */}
      {stats.email_breakdown && stats.email_breakdown.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center gap-2">
            <FaEnvelope className="text-blue-600" />
            Orders by Email (Top 5)
          </h3>
          <div className="space-y-2">
            {stats.email_breakdown.slice(0, 5).map((emailStat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {emailStat.user_email}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{emailStat.order_count} orders</span>
                  <span>{formatCurrency(emailStat.total_spent)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Permanency Info */}
      <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center gap-2 text-green-800">
          <FaDatabase className="text-green-600" />
          <span className="text-sm font-medium">Data Permanency:</span>
          <span className="text-sm">All order data is permanently stored and never deleted</span>
        </div>
      </div>
    </div>
  );
};

export default OrderStats;
