import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, BookOpen, GraduationCap, Calendar, ShieldCheck, Edit3, Save, X, Lock, Eye, EyeOff, KeyRound } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const departments = [
    'Information Technology',
    'Computer Science and Engineering',
    'Aeronautical Engineering',
    'Food Technology',
    'Civil Engineering',
    'Agricultural Engineering',
    'Cyber Security',
    'Artificial Intelligence and Machine Learning',
    'Computer and Communication Engineering',
    'Science and Humanities(1st Year)',
    'Master of Business Administration(MBA)',
    'Administration',
    'Infrastructure',
  ];

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setDepartment(user.department || '');
      setYear(user.year || 'N/A');
      setRollNumber(user.rollNumber || '');
      setEmployeeId(user.employeeId || '');
      setNewPassword('');
      setConfirmPassword('');
    }
  }, [user, editing]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !email || !department) {
      setError('Please fill in all required fields.');
      return;
    }

    if (user.role === 'student' && !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Password validation if user enters a new password
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match. Please check and try again.');
        return;
      }
      if (newPassword.length < 6) {
        setError('New Password must be at least 6 characters long.');
        return;
      }
    }

    setError('');
    setSuccess('');
    setSaving(true);

    const profileData = {
      name,
      email,
      department,
    };

    if (newPassword) {
      profileData.newPassword = newPassword;
    }

    if (user.role === 'student') {
      profileData.year = year;
    } else {
      profileData.employeeId = employeeId;
    }

    const result = await updateProfile(profileData);
    setSaving(false);

    if (result.success) {
      setSuccess('Profile and password updated successfully!');
      setEditing(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setError(result.message);
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">Profile Settings</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View and manage your account details and security password
          </p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-primary-hover shadow-md shadow-primary/10"
          >
            <Edit3 className="h-3.5 w-3.5" />
            Edit Profile & Password
          </button>
        ) : (
          <button
            onClick={() => {
              setEditing(false);
              setError('');
              setNewPassword('');
              setConfirmPassword('');
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-all hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
        )}
      </div>

      {/* Success/Error Alerts */}
      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-600 dark:border-emerald-900/35 dark:bg-emerald-950/20 dark:text-emerald-400">
          {success}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-600 dark:border-rose-900/35 dark:bg-rose-950/20 dark:text-rose-400">
          {error}
        </div>
      )}

      {/* Profile Details Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-slate-900">
        {!editing ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{user.name}</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400 mt-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  {user.role} Account
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2 dark:border-slate-800">
              <div className="flex items-start gap-3">
                {user.role === 'student' ? (
                  <GraduationCap className="h-5 w-5 text-slate-400 mt-0.5" />
                ) : (
                  <User className="h-5 w-5 text-slate-400 mt-0.5" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {user.role === 'student' ? 'Register Number' : 'Username / Email'}
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {user.role === 'student' ? user.rollNumber : user.email}
                  </p>
                </div>
              </div>

              {user.role === 'student' && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Email Address</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Department</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user.department}</p>
                </div>
              </div>

              {user.role === 'student' ? (
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Year of Study</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user.year}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <KeyRound className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Employee ID</span>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{user.employeeId || 'EMP-001'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 py-3.5 px-4 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                  disabled={saving}
                />
              </div>

              {user.role === 'student' ? (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Register Number (Locked)</label>
                  <input
                    type="text"
                    disabled={true}
                    value={rollNumber}
                    className="mt-1.5 w-full rounded-2xl border border-slate-100/80 bg-slate-50/50 py-3.5 px-4 text-sm text-slate-400 outline-none dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Username / Email</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 py-3.5 px-4 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white font-mono"
                    disabled={saving}
                  />
                </div>
              )}
            </div>

            {user.role === 'student' && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 py-3.5 px-4 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                  disabled={saving}
                />
              </div>
            )}

            <div className={user.role === 'student' ? "grid grid-cols-1 gap-4 sm:grid-cols-2" : "w-full"}>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 py-3.5 px-4 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                  disabled={saving}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept} className="dark:bg-slate-900">{dept}</option>
                  ))}
                </select>
              </div>

              {user.role === 'student' && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Year of Study</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-slate-200 py-3.5 px-4 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                    disabled={saving}
                  >
                    <option value="1st Year" className="dark:bg-slate-900">1st Year</option>
                    <option value="2nd Year" className="dark:bg-slate-900">2nd Year</option>
                    <option value="3rd Year" className="dark:bg-slate-900">3rd Year</option>
                    <option value="4th Year" className="dark:bg-slate-900">4th Year</option>
                    <option value="N/A" className="dark:bg-slate-900">N/A</option>
                  </select>
                </div>
              )}
            </div>

            {/* Password Change Section */}
            <div className="border-t border-slate-100 pt-4 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Lock className="h-4 w-4 text-primary" />
                Change Account Password (Optional)
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* New Password */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">New Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep current"
                      className="w-full rounded-2xl border border-slate-200 py-3 px-4 pr-10 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Confirm New Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-2xl border border-slate-200 py-3 px-4 pr-10 text-sm bg-transparent outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-800 dark:text-white"
                      disabled={saving}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:bg-primary-hover"
            >
              {saving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Profile Changes & Password
                </>
              )}
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

export default Profile;
