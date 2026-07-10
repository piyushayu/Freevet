import React from 'react';

function EditProfile({ edit, cancelfunctn }) {
  if (!edit) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-neutral-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-bold mb-6 text-neutral-200">Edit Profile</h2>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="profile-name" className="text-sm font-medium text-neutral-400">Full Name</label>
            <input
              id="profile-name"
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              placeholder="e.g. Rajan Kumar"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="profile-location" className="text-sm font-medium text-neutral-400">Location</label>
            <input
              id="profile-location"
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              placeholder="e.g. Mumbai, MH"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="profile-member" className="text-sm font-medium text-neutral-400">Member Since</label>
            <input
              id="profile-member"
              type="text"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              placeholder="e.g. June 2024"
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={cancelfunctn}
              className="px-5 py-2.5 rounded-lg border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800 hover:text-neutral-100 transition active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-md shadow-violet-600/10 transition active:scale-95 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
