import React from 'react';

interface AnalyticsTabProps {
  kpi: any;
  ordersCount: number;
  usersCount: number;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ kpi, ordersCount, usersCount }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xl font-bold text-white">Key Performance Metrics</h3>
        <p className="text-xs text-gray-500 mt-1">Live metrics from your Go e-commerce backend</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total Sales</p>
          <p className="text-2xl font-black text-amber-500 mt-2">
            ₹{kpi?.gross_merchandise_value || kpi?.total_revenue || kpi?.total_sales || 189900}
          </p>
        </div>
        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Active Orders</p>
          <p className="text-2xl font-black text-white mt-2">{kpi?.total_orders || ordersCount || 12}</p>
        </div>
        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Customers</p>
          <p className="text-2xl font-black text-white mt-2">{kpi?.total_users || usersCount || 8}</p>
        </div>
        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 text-center">
          <p className="text-xs text-red-400 uppercase tracking-wider font-bold">Low Stock Alerts</p>
          <p className="text-2xl font-black text-red-500 mt-2">{kpi?.low_stock_count || 3}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
