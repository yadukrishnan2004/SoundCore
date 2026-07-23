import React from 'react';
import { FaBan, FaUnlock } from 'react-icons/fa';

interface UsersTabProps {
  users: any[];
  handleToggleUserBlock: (userId: any) => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({ users, handleToggleUserBlock }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-xl font-bold text-white">Customer Account Registry</h3>
        <p className="text-xs text-gray-500 mt-1">Review user accounts and moderate access permissions</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider">
              <th className="pb-3">Name</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map(u => (
              <tr key={u.id} className="hover:bg-white/5">
                <td className="py-3 font-semibold text-white">{u.name}</td>
                <td className="py-3 text-gray-400">{u.email}</td>
                <td className="py-3 capitalize">{u.role}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    u.is_blocked ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {u.is_blocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => handleToggleUserBlock(u.id)}
                    className={`p-2 rounded-lg border transition ${
                      u.is_blocked
                        ? 'bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20'
                        : 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500/20'
                    }`}
                    title={u.is_blocked ? "Unblock User" : "Block User"}
                  >
                    {u.is_blocked ? <FaUnlock /> : <FaBan />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTab;
