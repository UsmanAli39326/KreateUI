import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardShell from "@/components/Dashboard/DashboardShell";
import Button from "@/components/Common/Button";
import Input from "@/components/Common/Input";
import { useToast } from "@/components/Common";
import userService from "../../services/userService";
import { clearTokens } from "../../services/apiService";
import { useAuth } from "../../context/AuthContext";

export default function SettingsPage() {
    const toast = useToast();
    const { refreshProfile } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [profile, setProfile] = useState({ name: "", email: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const photoInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getProfile()
            .then(res => {
                // API returns flat user object: { id, name, email, role, ... }
                if (res) setProfile({ name: res.name || res.data?.name || "", email: res.email || res.data?.email || "" });
            })
            .catch(err => {
                console.error("Failed to load profile", err);
                toast.error("Failed to load user profile information.", "Load Error");
            });
    }, []);

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await userService.updateProfile({ name: profile.name });
            await refreshProfile(); // Sync AuthContext user object
            toast.success("Profile details updated successfully!", "Success");
        } catch (err) {
            toast.error("Failed to update profile settings.", "Update Error");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePhotoChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File size must be under 2MB.", "File Too Large");
            return;
        }
        setIsUploadingPhoto(true);
        try {
            const formData = new FormData();
            formData.append('photo', file);
            await userService.uploadProfilePhoto(formData);
            await refreshProfile();
            toast.success("Profile photo updated!", "Success");
        } catch (err) {
            toast.error(err?.error || "Failed to upload photo.", "Upload Error");
        } finally {
            setIsUploadingPhoto(false);
            e.target.value = ''; // reset input
        }
    };

    const handleChangePassword = async () => {
        if (!passwordForm.currentPassword || !passwordForm.newPassword) {
            toast.error("Please fill in all password fields.", "Validation");
            return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error("New passwords do not match.", "Validation");
            return;
        }
        if (passwordForm.newPassword.length < 8) {
            toast.error("New password must be at least 8 characters.", "Validation");
            return;
        }
        setIsChangingPassword(true);
        try {
            await userService.changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            toast.success("Password changed successfully!", "Success");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err) {
            toast.error(err?.error || "Failed to change password.", "Error");
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handleDeleteAccount = async () => {
        const pwd = prompt("Please enter your password to confirm account deletion:");
        if (!pwd) return;
        try {
            await userService.deleteAccount(pwd);
            toast.success("Your account has been deleted.", "Deleted");
            clearTokens();
            navigate("/auth");
        } catch (err) {
            toast.error(err?.error || "Failed to delete your account. Please check your password.", "Authentication Error");
        }
    };

    const scrollToSection = (id) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: "person" },
        { id: "security", label: "Security", icon: "lock" },
        { id: "danger", label: "Danger Zone", icon: "error", className: "text-danger hover:text-danger/80" },
    ];

    return (
        <DashboardShell active="settings">
            {/* Page Header */}
            <header className="border-b border-border-1 pb-8 mb-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black tracking-tight text-text-1 mb-2">Platform Settings</h2>
                    <p className="text-text-2">Configure your environment, manage API credentials, and connect your workflow tools.</p>
                </div>
            </header>

            <div className="max-w-5xl mx-auto pb-24">
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Inner Sidebar Navigation */}
                    <nav className="w-full md:w-56 flex flex-col gap-1 shrink-0 top-6 h-fit md:sticky">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => scrollToSection(tab.id)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all text-left relative ${activeTab === tab.id
                                        ? "bg-surface-1 text-text-1 shadow-sm"
                                        : "text-text-2 hover:bg-surface-2 hover:text-text-1"
                                    } ${tab.className || ""}`}
                            >
                                {activeTab === tab.id && (
                                    <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-accent-1 rounded-full"></div>
                                )}
                                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                                <span className="text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Content Sections */}
                    <div className="flex-1 space-y-12">

                        {/* Profile Section */}
                        <section id="profile" className="space-y-6 scroll-mt-6">
                            <div>
                                <h3 className="text-xl font-bold text-text-1">Profile Information</h3>
                                <p className="text-text-3 text-sm mt-1">Update your personal details and account preferences.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl border border-border-1 bg-surface-1">
                                <div className="col-span-full flex items-center gap-6 pb-4 border-b border-border-1">
                                    {/* Hidden file input for photo upload */}
                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                    <div
                                        className="size-20 rounded-xl bg-cover bg-center border-2 border-accent-1/40 relative group cursor-pointer bg-bg-2"
                                        style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || 'User')}&background=random")` }}
                                        onClick={() => photoInputRef.current?.click()}
                                    >
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                                            <span className="material-symbols-outlined text-white">{isUploadingPhoto ? 'sync' : 'photo_camera'}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => photoInputRef.current?.click()}
                                            disabled={isUploadingPhoto}
                                        >
                                            {isUploadingPhoto ? 'Uploading...' : 'Change Photo'}
                                        </Button>
                                        <p className="text-text-3 text-[11px]">JPG, GIF or PNG. Max size 2MB.</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Input id="full-name" label="Full Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Input id="email" label="Email Address" type="email" value={profile.email} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button variant="primary" onClick={handleSaveProfile} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </section>

                        {/* Security / Password Section */}
                        <section id="security" className="pt-12 border-t border-border-1 space-y-6 scroll-mt-6">
                            <div>
                                <h3 className="text-xl font-bold text-text-1">Security</h3>
                                <p className="text-text-3 text-sm mt-1">Change your account password.</p>
                            </div>
                            <div className="grid grid-cols-1 gap-4 p-6 rounded-xl border border-border-1 bg-surface-1">
                                <Input
                                    id="current-password"
                                    label="Current Password"
                                    type="password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                />
                                <Input
                                    id="new-password"
                                    label="New Password"
                                    type="password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                />
                                <Input
                                    id="confirm-password"
                                    label="Confirm New Password"
                                    type="password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button variant="primary" onClick={handleChangePassword} disabled={isChangingPassword}>
                                    {isChangingPassword ? 'Updating...' : 'Update Password'}
                                </Button>
                            </div>
                        </section>

                        <section id="danger" className="pt-12 border-t border-border-1 space-y-4">
                            <h3 className="text-xl font-bold text-danger">Danger Zone</h3>
                            <div className="p-6 rounded-xl border border-danger/30 bg-danger/5 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold text-text-1">Delete Account</p>
                                    <p className="text-xs text-text-3 mt-1">Permanently remove your account and all projects. This cannot be undone.</p>
                                </div>
                                <Button variant="tertiary" className="text-danger border border-danger/50 hover:bg-danger/10" onClick={handleDeleteAccount}>Delete Account</Button>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
