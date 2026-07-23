import React from 'react';
import { FaRupeeSign, FaBoxOpen, FaUsers, FaChartLine } from 'react-icons/fa';

interface AnalyticsTabProps {
  kpi: any;
  ordersCount: number;
  usersCount: number;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ kpi, ordersCount, usersCount }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-extrabold text-text-main">Executive KPI Analytics</h3>
        <p className="text-xs text-text-muted mt-1">Real-time revenue performance & system telemetry</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-bg-input border border-border-subtle p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-brand-primary">
            <span className="text-xs font-bold text-text-muted uppercase">Gross Revenue</span>
            <FaRupeeSign className="text-lg" />
          </div>
          <p className="text-2xl font-heading font-black text-text-main">₹{kpi?.totalRevenue || 0}</p>
        </div>

        <div className="bg-bg-input border border-border-subtle p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-blue-400">
            <span className="text-xs font-bold text-text-muted uppercase">Total Orders</span>
            <FaBoxOpen className="text-lg" />
          </div>
          <p className="text-2xl font-heading font-black text-text-main">{ordersCount}</p>
        </div>

        <div className="bg-bg-input border border-border-subtle p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-green-400">
            <span className="text-xs font-bold text-text-muted uppercase">Active Customers</span>
            <FaUsers className="text-lg" />
          </div>
          <p className="text-2xl font-heading font-black text-text-main">{usersCount}</p>
        </div>

        <div className="bg-bg-input border border-border-subtle p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-purple-400">
            <span className="text-xs font-bold text-text-muted uppercase">Monthly Velocity</span>
            <FaChartLine className="text-lg" />
          </div>
          <p className="text-2xl font-heading font-black text-text-main">+18.4%</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;
