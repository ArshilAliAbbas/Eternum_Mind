"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Shield,
  User,
  Database,
  Brain,
  Save,
  X,
  Edit2,
  LogOut,
} from "lucide-react";

import Sidebar from "../../components/Dashboard/Sidebar";

const ProfilePage = () => {
  // User profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    initials: "JD",
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profile.name,
    email: profile.email,
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    encryption: true,
    decentralizedStorage: true,
  });

  // Handle profile edit
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedProfile({
        name: profile.name,
        email: profile.email,
      });
    }
    setIsEditing(!isEditing);
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // Generate initials from the name
    const nameParts = editedProfile.name.split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0].substring(0, 2);

    setProfile({
      ...editedProfile,
      initials: initials.toUpperCase(),
    });
    setIsEditing(false);
  };

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-[#0c1222]">
      <Sidebar />
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <div className="min-h-screen bg-gradient-to-b from-[#0a1222] to-[#0f1729] p-10">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-8 text-4xl font-bold text-white">Your Profile</h1>
            {/* Account Information Card */}
            <div className="mb-6 rounded-xl bg-[#0f1729]/90 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-4 flex items-center">
                <User className="mr-2 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">
                  Account Information
                </h2>
              </div>
              {!isEditing ? (
                <div className="flex items-center">
                  <div className="mr-4 flex size-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                    {profile.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-gray-400">{profile.email}</p>
                    <button
                      onClick={handleEditToggle}
                      className="mt-1 flex items-center text-sm text-indigo-400 hover:text-indigo-300"
                    >
                      <Edit2 className="mr-1" size={14} /> Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm text-gray-400">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="rounded-lg border border-gray-700 bg-[#0d1525] px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm text-gray-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="rounded-lg border border-gray-700 bg-[#0d1525] px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-500"
                    >
                      <Save className="mr-1" size={14} /> Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-600"
                    >
                      <X className="mr-1" size={14} /> Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Privacy & Security Card */}
            <div className="mb-6 rounded-xl bg-[#0f1729]/90 p-6 shadow-xl backdrop-blur-sm">
              <div className="mb-6 flex items-center">
                <Shield className="mr-2 text-gray-400" />
                <h2 className="text-xl font-semibold text-white">
                  Privacy & Security
                </h2>
              </div>
              <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-base font-medium text-white">
                    End-to-End Encryption
                  </h3>
                  <p className="text-sm text-gray-400">
                    Your data is encrypted and only accessible to you.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={securitySettings.encryption}
                      onChange={() =>
                        setSecuritySettings((prev) => ({
                          ...prev,
                          encryption: !prev.encryption,
                        }))
                      }
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-600 after:bg-gray-800 after:transition-all after:content-[''] peer-checked:bg-green-900/30 peer-checked:after:translate-x-full peer-checked:after:border-green-400 peer-checked:after:bg-green-400"></div>
                  </label>
                  <span className="ml-3 rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400">
                    {securitySettings.encryption ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
              <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-base font-medium text-white">
                    Decentralized Storage
                  </h3>
                  <p className="text-sm text-gray-400">
                    Your journals are stored on IPFS/Filecoin.
                  </p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={securitySettings.decentralizedStorage}
                      onChange={() =>
                        setSecuritySettings((prev) => ({
                          ...prev,
                          decentralizedStorage: !prev.decentralizedStorage,
                        }))
                      }
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-600 after:bg-gray-800 after:transition-all after:content-[''] peer-checked:bg-green-900/30 peer-checked:after:translate-x-full peer-checked:after:border-green-400 peer-checked:after:bg-green-400"></div>
                  </label>
                  <span className="ml-3 rounded-full bg-green-900/30 px-3 py-1 text-xs font-medium text-green-400">
                    {securitySettings.decentralizedStorage
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>
              </div>
              <button className="w-full rounded-lg bg-[#1a1b3a] py-2 text-center text-sm font-medium text-indigo-300 transition-all duration-300 hover:bg-[#1e1f45]">
                Manage Privacy Settings
              </button>
            </div>
            {/* Logout Button */}
            <div className="mb-6">
              <button className="flex w-full items-center justify-center rounded-lg border border-red-800/30 bg-red-900/10 py-3 text-red-400 transition-all duration-300 hover:bg-red-900/20">
                <LogOut className="mr-2" size={18} /> Sign Out
              </button>
            </div>
            {/* Two Column Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* AI Preferences Card */}
              <div className="rounded-xl bg-[#0f1729]/90 p-6 shadow-xl backdrop-blur-sm">
                <div className="mb-4 flex items-center">
                  <Brain className="mr-2 text-gray-400" />
                  <h2 className="text-xl font-semibold text-white">
                    AI Preferences
                  </h2>
                </div>
                <p className="mb-6 text-sm text-gray-400">
                  Configure how the AI analyzes your journals and provides
                  insights.
                </p>
                <button className="w-full rounded-lg bg-[#1a1b3a] py-2 text-center text-sm font-medium text-indigo-300 transition-all duration-300 hover:bg-[#1e1f45]">
                  Customize AI Settings
                </button>
              </div>
              {/* Data Management Card */}
              <div className="rounded-xl bg-[#0f1729]/90 p-6 shadow-xl backdrop-blur-sm">
                <div className="mb-4 flex items-center">
                  <Database className="mr-2 text-gray-400" />
                  <h2 className="text-xl font-semibold text-white">
                    Data Management
                  </h2>
                </div>
                <p className="mb-6 text-sm text-gray-400">
                  Export your data or manage what's stored in your vault.
                </p>
                <button className="w-full rounded-lg bg-[#1a1b3a] py-2 text-center text-sm font-medium text-indigo-300 transition-all duration-300 hover:bg-[#1e1f45]">
                  Manage Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
