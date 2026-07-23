import React from 'react';
import { FaUserSlash, FaUserCheck } from 'react-icons/fa';

interface UsersTabProps {
  users: any[];
  handleToggleUserBlock: (userId: any, currentBlocked: boolean) => void;
}

export const UsersTab: React.FC<UsersTabProps> = ({ users, handleToggleUserBlock }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-heading font-extrabold text-text-main">Registered Customer Accounts</h3>
        <p className="text-xs text-text-muted mt-1">Manage user access permissions and security blocks</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-text-muted">
          <thead className="bg-bg-input text-text-main uppercase font-heading border-b border-border-subtle">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Access Control</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-bg-input/50 transition">
                <td className="p-3 font-bold text-text-main">#{u.id}</td>
                <td className="p-3 font-bold text-text-main">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 uppercase font-semibold text-brand-primary">{u.role}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    u.is_blocked ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-400'
                  }`}>
                    {u.is_blocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleToggleUserBlock(u.id, u.is_blocked)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto ${
                      u.is_blocked
                        ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                        : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                    }`}
                  >
                    {u.is_blocked ? <><FaUserCheck /> Unblock</> : <><FaUserSlash /> Block</>}
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
