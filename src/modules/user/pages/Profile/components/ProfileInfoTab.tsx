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
        <h3 className="text-xl font-heading font-bold text-text-main">Edit Profile Details</h3>
        <p className="text-xs text-text-muted mt-1">Keep your profile credentials up to date</p>
      </div>

      {profileMessage && (
        <p className={`text-xs font-bold ${profileMessage.startsWith('❌') ? 'text-red-500' : 'text-green-400'}`}>
          {profileMessage}
        </p>
      )}

      <div>
        <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Email Address</label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full bg-bg-input text-sm text-text-muted px-4 py-3 rounded-xl border border-border-subtle cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-text-muted mb-2 uppercase tracking-wider">Full Name</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
          className="w-full bg-bg-base text-sm text-text-main px-4 py-3 rounded-xl border border-border-subtle focus:outline-none focus:border-brand-primary"
        />
      </div>

      <button
        type="submit"
        disabled={updatingProfile}
        className="px-6 py-3 bg-brand-primary text-black font-extrabold text-xs rounded-xl hover:bg-brand-hover transition disabled:opacity-50 cursor-pointer"
      >
        {updatingProfile ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfileInfoTab;
