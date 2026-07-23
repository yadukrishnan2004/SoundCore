import React from 'react';

interface ProfileInfoTabProps {
  user: any;
  newName: string;
  setNewName: (val: string) => void;
  profileMessage: string;
  updatingProfile: boolean;
  handleUpdateProfile: (e: React.FormEvent) => void;
}

export const ProfileInfoTab: React.FC<ProfileInfoTabProps> = ({
  user,
  newName,
  setNewName,
  profileMessage,
  updatingProfile,
  handleUpdateProfile
}) => {
  return (
    <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
      <div>
        <h3 className="text-xl font-bold text-white">Edit Profile Details</h3>
        <p className="text-xs text-gray-500 mt-1">Keep your profile credentials up to date</p>
      </div>

      {profileMessage && (
        <p className={`text-xs font-bold ${profileMessage.startsWith('❌') ? 'text-red-500' : 'text-green-400'}`}>
          {profileMessage}
        </p>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full bg-[#0b0c10] text-sm text-gray-500 px-4 py-3 rounded-xl border border-white/5 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Full Name</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
          className="w-full bg-[#0b0c10] text-sm text-gray-200 px-4 py-3 rounded-xl border border-white/5 focus:outline-none focus:border-amber-500"
        />
      </div>

      <button
        type="submit"
        disabled={updatingProfile}
        className="px-6 py-3 bg-amber-500 text-black font-extrabold text-xs rounded-xl hover:bg-amber-400 transition disabled:opacity-50"
      >
        {updatingProfile ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileInfoTab;
