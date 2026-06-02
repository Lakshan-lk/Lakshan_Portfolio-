"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Inbox, Briefcase, GraduationCap, FileText, LogOut, Plus, Trash2, Edit3,
    ExternalLink, Menu, X, Check, AlertCircle, Calendar, Mail, User, ShieldAlert, ShieldCheck,
    UploadCloud, PlusCircle, LayoutGrid, Award, BookOpen
} from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";
import { toggleMessageReadAction, deleteMessageAction } from "@/app/actions/messages";
import { createProjectAction, updateProjectAction, deleteProjectAction } from "@/app/actions/projects";
import { createJourneyAction, updateJourneyAction, deleteJourneyAction } from "@/app/actions/journey";
import { createCertificationAction, updateCertificationAction, deleteCertificationAction } from "@/app/actions/certifications";
import { uploadCVAction } from "@/app/actions/cv";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Predefined icons available in our DynamicIcon registry to select for journey
const TIMELINE_ICONS = ["Briefcase", "GraduationCap", "School", "Award", "BookOpen", "ShieldCheck"];

// Predefined popular technologies for easy multi-selection in Projects Tech Stack
const PRESET_TECH = [
    { name: "Next.js", icon: "SiNextdotjs" },
    { name: "React", icon: "FaReact" },
    { name: "TypeScript", icon: "SiTypescript" },
    { name: "Tailwind CSS", icon: "SiTailwindcss" },
    { name: "JavaScript", icon: "SiJavascript" },
    { name: "Node.js", icon: "FaNodeJs" },
    { name: "Express", icon: "SiExpress" },
    { name: "MongoDB", icon: "SiMongodb" },
    { name: "MySQL", icon: "SiMysql" },
    { name: "Firebase", icon: "SiFirebase" },
    { name: "Kotlin", icon: "SiKotlin" },
    { name: "Android", icon: "FaAndroid" },
    { name: "Figma", icon: "FaFigma" },
    { name: "Photoshop", icon: "SiAdobephotoshop" },
    { name: "Illustrator", icon: "SiAdobeillustrator" },
    { name: "Git", icon: "FaGitAlt" },
];

interface DashboardClientProps {
    initialProjects: any[];
    initialJourney: any[];
    initialMessages: any[];
    initialCertifications: any[];
}

export default function DashboardClient({
    initialProjects,
    initialJourney,
    initialMessages,
    initialCertifications,
}: DashboardClientProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // CMS Lists States
    const [projects, setProjects] = useState(initialProjects);
    const [journey, setJourney] = useState(initialJourney);
    const [messages, setMessages] = useState(initialMessages);
    const [certifications, setCertifications] = useState(initialCertifications);

    // Active Navigation Tab
    const [activeTab, setActiveTab] = useState<"inbox" | "projects" | "certifications" | "journey" | "cv">("inbox");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Notifications state
    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // Dynamic MODALS State
    const [projectModal, setProjectModal] = useState<{ open: boolean; editItem?: any }>({ open: false });
    const [journeyModal, setJourneyModal] = useState<{ open: boolean; editItem?: any }>({ open: false });
    const [certModal, setCertModal] = useState<{ open: boolean; editItem?: any }>({ open: false });
    const [activeMessage, setActiveMessage] = useState<any | null>(null);

    // Image Upload previews
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [certLogoPreview, setCertLogoPreview] = useState<string | null>(null);

    // CV Drag and drop state
    const [selectedCVName, setSelectedCVName] = useState<string | null>(null);
    const [isDraggingCV, setIsDraggingCV] = useState(false);

    // Project Screenshot drag state
    const [isDraggingProjectImage, setIsDraggingProjectImage] = useState(false);
    const [selectedProjectImageName, setSelectedProjectImageName] = useState<string | null>(null);

    // Certification Logo drag state
    const [isDraggingCertLogo, setIsDraggingCertLogo] = useState(false);
    const [selectedCertLogoName, setSelectedCertLogoName] = useState<string | null>(null);

    // Unread messages counter
    const unreadCount = messages.filter((m) => !m.is_read).length;

    // Helper trigger alert
    const triggerAlert = (type: "success" | "error", message: string) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 5000);
    };

    // Drag and drop helper for CV PDF
    const handleCVDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingCV(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (file.type !== "application/pdf") {
                triggerAlert("error", "Only PDF files are allowed!");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                triggerAlert("error", "File exceeds 5MB size limit.");
                return;
            }
            const inputEl = document.getElementById("cvFile") as HTMLInputElement;
            if (inputEl) {
                const dt = new DataTransfer();
                dt.items.add(file);
                inputEl.files = dt.files;
                setSelectedCVName(file.name);
                triggerAlert("success", `File selected: ${file.name}`);
            }
        }
    };

    // Drag and drop helper for Project screenshot
    const handleProjectImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingProjectImage(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                triggerAlert("error", "Only image files are allowed!");
                return;
            }
            if (file.size > 20 * 1024 * 1024) {
                triggerAlert("error", "Image exceeds 20MB size limit.");
                return;
            }
            const inputEl = document.getElementById("imageFile") as HTMLInputElement;
            if (inputEl) {
                const dt = new DataTransfer();
                dt.items.add(file);
                inputEl.files = dt.files;
                setSelectedProjectImageName(file.name);
                
                // Read and set preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                triggerAlert("success", `Image selected: ${file.name}`);
            }
        }
    };

    // Drag and drop helper for Certification logo
    const handleCertLogoDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDraggingCertLogo(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                triggerAlert("error", "Only image files are allowed!");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                triggerAlert("error", "Image exceeds 10MB size limit.");
                return;
            }
            const inputEl = document.getElementById("logoFile") as HTMLInputElement;
            if (inputEl) {
                const dt = new DataTransfer();
                dt.items.add(file);
                inputEl.files = dt.files;
                setSelectedCertLogoName(file.name);
                
                // Read and set preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCertLogoPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
                triggerAlert("success", `Logo selected: ${file.name}`);
            }
        }
    };

    // Logout handler
    const handleLogout = async () => {
        await logoutAdmin();
        router.push("/admin");
        router.refresh();
    };

    // Message - toggle read/unread status
    const handleToggleRead = async (id: string, currentRead: boolean) => {
        const nextStatus = !currentRead;
        const res = await toggleMessageReadAction(id, nextStatus);
        if (res.success) {
            setMessages(messages.map((m) => (m.id === id ? { ...m, is_read: nextStatus } : m)));
            if (activeMessage && activeMessage.id === id) {
                setActiveMessage({ ...activeMessage, is_read: nextStatus });
            }
        } else {
            triggerAlert("error", res.error || "Failed to update status.");
        }
    };

    // Message - delete
    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Are you sure you want to delete this inquiry?")) return;
        const res = await deleteMessageAction(id);
        if (res.success) {
            setMessages(messages.filter((m) => m.id !== id));
            setActiveMessage(null);
            triggerAlert("success", "Message deleted successfully.");
        } else {
            triggerAlert("error", res.error || "Failed to delete message.");
        }
    };

    // Project - submit form (Create or Update)
    const handleProjectFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        // Append tech stack JSON
        const selectedTech: any[] = [];
        const techCheckboxes = form.querySelectorAll('input[name="tech"]:checked');
        techCheckboxes.forEach((checkbox: any) => {
            const preset = PRESET_TECH.find((p) => p.name === checkbox.value);
            if (preset) selectedTech.push(preset);
        });
        formData.append("tech_stack", JSON.stringify(selectedTech));

        const isEdit = !!projectModal.editItem;
        
        startTransition(async () => {
            let res;
            if (isEdit) {
                formData.append("existingImageUrl", projectModal.editItem.image);
                res = await updateProjectAction(projectModal.editItem.id, formData);
            } else {
                res = await createProjectAction(formData);
            }

            if (res.success) {
                triggerAlert("success", res.message || "Project saved successfully!");
                setProjectModal({ open: false });
                setImagePreview(null);
                setSelectedProjectImageName(null);
                
                // Fetch fresh lists
                const { supabase } = await import("@/lib/supabase");
                const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
                if (data) setProjects(data);
            } else {
                triggerAlert("error", res.error || "Failed to save project.");
            }
        });
    };

    // Project - delete
    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project permanently?")) return;
        const res = await deleteProjectAction(id);
        if (res.success) {
            setProjects(projects.filter((p) => p.id !== id));
            triggerAlert("success", "Project deleted successfully.");
        } else {
            triggerAlert("error", res.error || "Failed to delete project.");
        }
    };

    // Journey Timeline - submit form (Create or Update)
    const handleJourneyFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const isEdit = !!journeyModal.editItem;

        startTransition(async () => {
            let res;
            if (isEdit) {
                res = await updateJourneyAction(journeyModal.editItem.id, formData);
            } else {
                res = await createJourneyAction(formData);
            }

            if (res.success) {
                triggerAlert("success", res.message || "Journey milestone saved successfully!");
                setJourneyModal({ open: false });
                
                // Fetch fresh lists
                const { supabase } = await import("@/lib/supabase");
                const { data } = await supabase.from("journey").select("*").order("order", { ascending: true });
                if (data) setJourney(data);
            } else {
                triggerAlert("error", res.error || "Failed to save milestone.");
            }
        });
    };

    // Journey Timeline - delete
    const handleDeleteJourney = async (id: string) => {
        if (!confirm("Are you sure you want to delete this milestone permanently?")) return;
        const res = await deleteJourneyAction(id);
        if (res.success) {
            setJourney(journey.filter((j) => j.id !== id));
            triggerAlert("success", "Timeline milestone deleted successfully.");
        } else {
            triggerAlert("error", res.error || "Failed to delete milestone.");
        }
    };

    // Certification - submit form (Create or Update)
    const handleCertFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const isEdit = !!certModal.editItem;

        startTransition(async () => {
            let res;
            if (isEdit) {
                formData.append("existingLogoUrl", certModal.editItem.logo);
                res = await updateCertificationAction(certModal.editItem.id, formData);
            } else {
                res = await createCertificationAction(formData);
            }

            if (res.success) {
                triggerAlert("success", res.message || "Certification saved successfully!");
                setCertModal({ open: false });
                setCertLogoPreview(null);
                setSelectedCertLogoName(null);
                
                // Fetch fresh lists
                const { supabase } = await import("@/lib/supabase");
                const { data } = await supabase.from("certifications").select("*").order("created_at", { ascending: false });
                if (data) setCertifications(data);
            } else {
                triggerAlert("error", res.error || "Failed to save certification.");
            }
        });
    };

    // Certification - delete
    const handleDeleteCert = async (id: string) => {
        if (!confirm("Are you sure you want to delete this certification permanently?")) return;
        const res = await deleteCertificationAction(id);
        if (res.success) {
            setCertifications(certifications.filter((c) => c.id !== id));
            triggerAlert("success", "Certification deleted successfully.");
        } else {
            triggerAlert("error", res.error || "Failed to delete certification.");
        }
    };

    // CV PDF - Upload & Overwrite
    const handleCVFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
            const res = await uploadCVAction(formData);
            if (res.success) {
                triggerAlert("success", res.message || "CV uploaded successfully!");
                form.reset();
                setSelectedCVName(null);
            } else {
                triggerAlert("error", res.error || "Failed to upload CV.");
            }
        });
    };

    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 flex overflow-hidden font-sans">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Alert Banner */}
            <AnimatePresence>
                {alert && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: "-50%" }}
                        animate={{ opacity: 1, y: 20, x: "-50%" }}
                        exit={{ opacity: 0, y: -50, x: "-50%" }}
                        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl border backdrop-blur-xl shadow-2xl ${
                            alert.type === "success"
                                ? "bg-green-500/10 border-green-500/30 text-green-400"
                                : "bg-red-500/10 border-red-500/30 text-red-400"
                        }`}
                    >
                        {alert.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
                        <span className="text-sm font-semibold">{alert.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Hamburger menu */}
            <div className="lg:hidden fixed top-4 right-4 z-40">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-3 bg-slate-900 border border-white/10 text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Sidebar Shell */}
            <aside
                className={`fixed lg:relative inset-y-0 left-0 w-72 bg-slate-950/80 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between z-30 transition-transform duration-300 lg:transform-none ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-0 -translate-x-full lg:translate-x-0"
                }`}
            >
                <div className="flex flex-col gap-8">
                    {/* Sidebar Brand */}
                    <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                            <ShieldCheck className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white leading-none">CMS Portal</h2>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">Control Center</span>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        {/* Inbox */}
                        <button
                            onClick={() => {
                                setActiveTab("inbox");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 ${
                                activeTab === "inbox"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <div className="flex items-center gap-3 font-semibold text-sm">
                                <Inbox size={18} />
                                <span className="whitespace-nowrap">Client Inbox</span>
                            </div>
                            {unreadCount > 0 && (
                                <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500 text-slate-950 rounded-full animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Projects */}
                        <button
                            onClick={() => {
                                setActiveTab("projects");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                                activeTab === "projects"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <LayoutGrid size={18} />
                            <span className="whitespace-nowrap">Manage Projects</span>
                        </button>

                        {/* Certifications */}
                        <button
                            onClick={() => {
                                setActiveTab("certifications");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                                activeTab === "certifications"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <Award size={18} />
                            <span className="whitespace-nowrap">Certifications</span>
                        </button>

                        {/* Journey */}
                        <button
                            onClick={() => {
                                setActiveTab("journey");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                                activeTab === "journey"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <GraduationCap size={18} />
                            <span className="whitespace-nowrap">My Journey</span>
                        </button>

                        {/* CV Settings */}
                        <button
                            onClick={() => {
                                setActiveTab("cv");
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 ${
                                activeTab === "cv"
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <FileText size={18} />
                            <span className="whitespace-nowrap">CV & Resume</span>
                        </button>
                    </nav>
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
                >
                    <LogOut size={16} />
                    <span className="whitespace-nowrap">Log Out securely</span>
                </button>
            </aside>

            {/* Main Area */}
            <main className="flex-grow p-6 lg:p-12 overflow-y-auto max-h-screen relative">
                {/* Header Welcome Title */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/10 mt-6 lg:mt-0">
                    <div>
                        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Workspace</span>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1 capitalize">
                            Welcome back, Lakshan
                        </h1>
                    </div>
                    <a
                        href="/"
                        target="_blank"
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl border border-white/10 text-sm font-semibold flex items-center gap-2 transition-all duration-300"
                    >
                        <span>View Live Website</span>
                        <ExternalLink size={14} />
                    </a>
                </div>

                <div className="min-h-[500px]">
                    {/* 1. INBOX TAB */}
                    {activeTab === "inbox" && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>Client Inquiries Inbox</span>
                                    <span className="px-2 py-0.5 text-xs bg-slate-900 border border-white/10 rounded-full font-mono text-cyan-400">
                                        {messages.length} total
                                    </span>
                                </h2>
                            </div>

                            {messages.length === 0 ? (
                                <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-gray-500">
                                    <Inbox size={48} className="text-gray-600" />
                                    <p className="font-semibold text-lg">Inbox is completely clean!</p>
                                    <p className="text-sm max-w-sm">When clients submit messages via the Contact Me form, they will securely populate here.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            onClick={() => setActiveMessage(msg)}
                                            className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden backdrop-blur-sm text-left ${
                                                !msg.is_read
                                                    ? "bg-cyan-500/5 border-cyan-500/30 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                        >
                                            {!msg.is_read && (
                                                <div className="absolute top-5 left-2 w-2 h-2 rounded-full bg-cyan-400" />
                                            )}

                                            <div className="flex flex-col pl-3 sm:pl-4">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`text-sm font-bold ${!msg.is_read ? "text-cyan-400" : "text-white"}`}>
                                                        {msg.name}
                                                    </span>
                                                    <span className="text-[10px] font-mono text-gray-500">
                                                        {new Date(msg.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className={`text-base font-semibold leading-snug ${!msg.is_read ? "text-white" : "text-slate-300"}`}>
                                                    {msg.subject}
                                                </p>
                                                <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                                    {msg.message}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleRead(msg.id, msg.is_read);
                                                    }}
                                                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-300 ${
                                                        !msg.is_read
                                                            ? "bg-slate-900 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/15"
                                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                                    }`}
                                                >
                                                    {msg.is_read ? "Mark Unread" : "Mark Read"}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteMessage(msg.id);
                                                    }}
                                                    className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                                                    title="Delete Inquiry"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 2. PROJECTS TAB */}
                    {activeTab === "projects" && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>Selected Portfolio Work</span>
                                    <span className="px-2 py-0.5 text-xs bg-slate-900 border border-white/10 rounded-full font-mono text-cyan-400">
                                        {projects.length} items
                                    </span>
                                </h2>
                                <button
                                    onClick={() => {
                                        setImagePreview(null);
                                        setSelectedProjectImageName(null);
                                        setProjectModal({ open: true });
                                    }}
                                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer text-sm font-sans"
                                >
                                    <Plus size={16} />
                                    <span>Add Project</span>
                                </button>
                            </div>

                            {projects.length === 0 ? (
                                <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-500">
                                    <PlusCircle size={48} className="text-gray-600" />
                                    <p className="font-semibold text-lg">No projects added yet.</p>
                                    <button
                                        onClick={() => setProjectModal({ open: true })}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm transition-all duration-300 font-semibold"
                                    >
                                        Create your first project
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[...projects].sort((a, b) => {
                                        if (a.created_at && b.created_at) {
                                            const timeA = new Date(a.created_at).getTime();
                                            const timeB = new Date(b.created_at).getTime();
                                            const diff = Math.abs(timeA - timeB);
                                            if (diff > 60000) {
                                                return timeB - timeA;
                                            }
                                        }

                                        const getFallbackIndex = (p: any) => {
                                            const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
                                            const fallbackProjects = [
                                                "Stay Easy House Booking App",
                                                "Spend Wise – Personal Finance Tracker",
                                                "Spend Wise - Personal Finance Tracker",
                                                "Belleza - Fashion Store",
                                                "Servio - Vehicle Service and Repair Management System",
                                                "NoodleNest – Food Restaurant",
                                                "NoodleNest - Food Restaurant",
                                                "BMW M420 Website UI/UX Design",
                                                "Tasty Food - Food Restaurant",
                                                "Fruity Website Concept UI/UX Design",
                                                "Fruity Animation Website UI/UX Design",
                                                "Planto – Plant Store Website UI/UX Design",
                                                "Planto - Plant Store Website UI/UX Design",
                                                "Fruity Beverage Concept UI/UX Design",
                                                "Sri Lanka Tourism Website",
                                                "Mag City Website Redesign",
                                                "Lakshan Portfolio"
                                            ];
                                            return fallbackProjects.findIndex(
                                                title => clean(p.title) === clean(title) || clean(p.title).includes(clean(title)) || clean(title).includes(clean(p.title))
                                            );
                                        };

                                        const idxA = getFallbackIndex(a);
                                        const idxB = getFallbackIndex(b);

                                        if (idxA !== -1 && idxB !== -1) {
                                            return idxB - idxA;
                                        }

                                        if (idxA === -1 && idxB !== -1) return -1;
                                        if (idxB === -1 && idxA !== -1) return 1;

                                        if (a.created_at && b.created_at) {
                                            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                                        }

                                        return b.id - a.id;
                                    }).map((p) => (
                                        <div
                                            key={p.id}
                                            className="bg-slate-900/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group backdrop-blur-sm"
                                        >
                                            <div className="relative aspect-video bg-slate-950 overflow-hidden">
                                                <Image
                                                    src={p.image}
                                                    alt={p.title}
                                                    fill
                                                    className="object-cover object-top opacity-80"
                                                />
                                                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase font-mono">
                                                    {p.category}
                                                </div>
                                            </div>

                                            <div className="p-5 flex-grow flex flex-col justify-between text-left">
                                                <div>
                                                    <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                                                        {p.title}
                                                    </h3>
                                                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-4">
                                                        {p.description}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setImagePreview(p.image);
                                                                setSelectedProjectImageName(null);
                                                                setProjectModal({ open: true, editItem: p });
                                                            }}
                                                            className="p-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300"
                                                            title="Edit Project"
                                                        >
                                                            <Edit3 size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProject(p.id)}
                                                            className="p-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                                                            title="Delete Project"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-widest font-mono">
                                                        <span>{p.tech_stack?.length || 0} Techs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 3. CERTIFICATIONS TAB */}
                    {activeTab === "certifications" && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>Certifications & Credentials</span>
                                    <span className="px-2 py-0.5 text-xs bg-slate-900 border border-white/10 rounded-full font-mono text-cyan-400">
                                        {certifications.length} items
                                    </span>
                                </h2>
                                <button
                                    onClick={() => {
                                        setCertLogoPreview(null);
                                        setSelectedCertLogoName(null);
                                        setCertModal({ open: true });
                                    }}
                                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer text-sm font-sans"
                                >
                                    <Plus size={16} />
                                    <span>Add Certification</span>
                                </button>
                            </div>

                            {certifications.length === 0 ? (
                                <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-500">
                                    <Award size={48} className="text-gray-600" />
                                    <p className="font-semibold text-lg">No certifications added yet.</p>
                                    <button
                                        onClick={() => setCertModal({ open: true })}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm transition-all duration-300 font-semibold"
                                    >
                                        Create first credential
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {certifications.map((c) => (
                                        <div
                                            key={c.id}
                                            className="bg-slate-900/40 border border-white/10 p-5 rounded-2xl backdrop-blur-sm flex items-center gap-5 justify-between text-left"
                                        >
                                            <div className="flex items-center gap-5">
                                                {/* Logo image preview */}
                                                <div className={`w-20 h-20 rounded-xl relative shrink-0 overflow-hidden flex items-center justify-center bg-slate-900 border border-white/10`}>
                                                    <Image
                                                        src={c.logo}
                                                        alt={`${c.org} logo`}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-base font-bold text-white leading-tight">
                                                        {c.title}
                                                    </h3>
                                                    <p className="text-purple-400 font-semibold text-sm leading-none">{c.org}</p>
                                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mt-0.5">
                                                        <span>{c.date}</span>
                                                        {c.credential_id && (
                                                            <>
                                                                <span>•</span>
                                                                <span>ID: {c.credential_id}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                                                <button
                                                    onClick={() => {
                                                        setCertLogoPreview(c.logo);
                                                        setSelectedCertLogoName(null);
                                                        setCertModal({ open: true, editItem: c });
                                                    }}
                                                    className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300"
                                                    title="Edit Certification"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteCert(c.id)}
                                                    className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                                                    title="Delete Certification"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 4. JOURNEY TIMELINE TAB */}
                    {activeTab === "journey" && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>Experience & Education Timeline</span>
                                    <span className="px-2 py-0.5 text-xs bg-slate-900 border border-white/10 rounded-full font-mono text-cyan-400">
                                        {journey.length} items
                                    </span>
                                </h2>
                                <button
                                    onClick={() => setJourneyModal({ open: true })}
                                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 active:scale-[0.98] text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all duration-300 cursor-pointer text-sm font-sans"
                                >
                                    <Plus size={16} />
                                    <span>Add Milestone</span>
                                </button>
                            </div>

                            {journey.length === 0 ? (
                                <div className="p-12 text-center bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-gray-500">
                                    <GraduationCap size={48} className="text-gray-600" />
                                    <p className="font-semibold text-lg">Timeline is empty.</p>
                                    <button
                                        onClick={() => setJourneyModal({ open: true })}
                                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm transition-all duration-300 font-semibold"
                                    >
                                        Create first milestone
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {journey.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-5 bg-slate-900/40 border border-white/10 rounded-2xl backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left"
                                        >
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-900/30 rounded-full border border-cyan-500/20">
                                                        {item.year}
                                                    </span>
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                                                        item.type === "experience" ? "text-purple-400" : "text-yellow-400"
                                                    }`}>
                                                        {item.type}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-mono">
                                                        Icon: {item.icon_name}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white leading-tight">
                                                    {item.title}
                                                </h3>
                                                <h4 className="text-purple-400 font-semibold text-sm leading-none font-sans">
                                                    {item.subtitle}
                                                </h4>
                                                <p className="text-gray-400 text-xs leading-relaxed max-w-2xl mt-1">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                                <button
                                                    onClick={() => setJourneyModal({ open: true, editItem: item })}
                                                    className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all duration-300"
                                                    title="Edit Milestone"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteJourney(item.id)}
                                                    className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300"
                                                    title="Delete Milestone"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* 5. CV SETTINGS TAB */}
                    {activeTab === "cv" && (
                        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-left">
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span>Dynamic CV PDF Settings</span>
                                </h2>
                                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                                    Upload and overwrite your resume PDF directly in Supabase Storage. The live site's "Download CV" link will automatically serve this updated file.
                                </p>
                            </div>

                            <div className="bg-slate-900/40 border border-white/10 p-6 md:p-8 rounded-2xl backdrop-blur-md">
                                <form onSubmit={handleCVFormSubmit} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                            Upload New Resume PDF
                                        </label>
                                        <div 
                                            onDragOver={(e) => { e.preventDefault(); setIsDraggingCV(true); }}
                                            onDragLeave={() => setIsDraggingCV(false)}
                                            onDrop={handleCVDrop}
                                            className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 transition-all duration-300 bg-slate-950/40 relative cursor-pointer group ${
                                                isDraggingCV 
                                                    ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_20px_rgba(6,182,212,0.25)]" 
                                                    : "border-white/10 hover:border-cyan-500/50"
                                            }`}
                                        >
                                            <UploadCloud className={`w-12 h-12 transition-colors ${
                                                isDraggingCV ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"
                                            }`} />
                                            <div>
                                                <p className="text-sm font-semibold text-white">
                                                    {selectedCVName ? `Selected: ${selectedCVName}` : isDraggingCV ? "Drop the PDF here!" : "Select or drag a .pdf file"}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">Accepts only standard PDF files (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="cvFile"
                                                name="cvFile"
                                                type="file"
                                                required
                                                accept="application/pdf"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const name = e.target.files?.[0]?.name;
                                                    if (name) {
                                                        setSelectedCVName(name);
                                                        triggerAlert("success", `File selected: ${name}`);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer text-sm font-sans"
                                    >
                                        {isPending ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <UploadCloud size={16} />
                                                <span>Upload & Overwrite CV</span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-gray-400">
                                    <div className="flex flex-col">
                                        <span>Active Link Endpoint:</span>
                                        <a href="/Lakshan Ekanayaka.pdf" target="_blank" className="text-cyan-400 hover:underline flex items-center gap-1 mt-0.5">
                                            <span>/Lakshan Ekanayaka.pdf</span>
                                            <ExternalLink size={10} />
                                        </a>
                                    </div>
                                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 max-w-sm">
                                        <AlertCircle size={14} className="text-cyan-400 shrink-0" />
                                        <span className="leading-normal font-sans">Updates reflect live immediately. Refreshing your browser might be needed to bypass local caches.</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </main>

            {/* =========================================================================
                MODAL 1: CLIENT MESSAGE VIEWER (INBOX DRAWER)
                ========================================================================= */}
            <AnimatePresence>
                {activeMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveMessage(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-950 border border-white/10 w-full max-w-lg p-6 rounded-2xl relative shadow-2xl z-10 text-left"
                        >
                            <button
                                onClick={() => setActiveMessage(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base leading-none">Inquiry Details</h3>
                                    <span className="text-[10px] font-mono text-gray-500 mt-1 inline-block">
                                        Received: {new Date(activeMessage.created_at).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-2.5 mb-6 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-gray-500 w-16 font-mono text-xs">Sender:</span>
                                    <span className="text-white font-semibold flex items-center gap-1.5">
                                        <User size={12} className="text-cyan-400" /> {activeMessage.name}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gray-500 w-16 font-mono text-xs">Email:</span>
                                    <a href={`mailto:${activeMessage.email}`} className="text-cyan-400 hover:underline font-mono">
                                        {activeMessage.email}
                                    </a>
                                </div>
                                <div className="flex gap-2 border-t border-white/5 pt-2.5 mt-0.5">
                                    <span className="text-gray-500 w-16 font-mono text-xs">Subject:</span>
                                    <span className="text-white font-bold">{activeMessage.subject}</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5 mb-8">
                                <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Message Inquiry</label>
                                <div className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-4 min-h-[150px] overflow-y-auto text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                    {activeMessage.message}
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-3 border-t border-white/10 pt-4">
                                <button
                                    onClick={() => handleToggleRead(activeMessage.id, activeMessage.is_read)}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg border transition-all duration-300 ${
                                        !activeMessage.is_read
                                            ? "bg-slate-900 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/15"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    {activeMessage.is_read ? "Mark as Unread" : "Mark as Read"}
                                </button>
                                <button
                                    onClick={() => handleDeleteMessage(activeMessage.id)}
                                    className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 font-bold text-xs flex items-center gap-2 transition-all duration-300"
                                >
                                    <Trash2 size={12} />
                                    <span>Delete Message</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL 2: PROJECT CARD ADD / EDIT */}
            <AnimatePresence>
                {projectModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setProjectModal({ open: false });
                                setImagePreview(null);
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-950 border border-white/10 w-full max-w-2xl p-6 rounded-2xl relative shadow-2xl z-10 text-left my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => {
                                    setProjectModal({ open: false });
                                    setImagePreview(null);
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="font-extrabold text-white text-xl mb-6">
                                {projectModal.editItem ? "Edit Project Details" : "Create New Project Card"}
                            </h3>

                            <form onSubmit={handleProjectFormSubmit} className="flex flex-col gap-5 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="title" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Project Title</label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            required
                                            defaultValue={projectModal.editItem?.title || ""}
                                            placeholder="Spend Wise Tracker"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="category" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            required
                                            defaultValue={projectModal.editItem?.category || "UI/UX Design"}
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none text-xs font-medium"
                                        >
                                            <option value="UI/UX Design">UI/UX Design</option>
                                            <option value="Web Projects">Web Projects</option>
                                            <option value="Mobile Projects">Mobile Projects</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="github" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">GitHub Link</label>
                                        <input
                                            id="github"
                                            name="github"
                                            type="url"
                                            defaultValue={projectModal.editItem?.github || ""}
                                            placeholder="https://github.com/..."
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="demo" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Live Demo / Prototype URL</label>
                                        <input
                                            id="demo"
                                            name="demo"
                                            type="url"
                                            defaultValue={projectModal.editItem?.demo || ""}
                                            placeholder="https://figma.com/..."
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="description" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        defaultValue={projectModal.editItem?.description || ""}
                                        placeholder="Detailed description of features, tech, and user experience..."
                                        className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 resize-none text-xs leading-relaxed"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                        Tech Stack Technologies (Select multi)
                                    </label>
                                    <div className="max-h-[130px] overflow-y-auto p-4 border border-white/10 rounded-xl bg-slate-900/40 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                        {PRESET_TECH.map((tech) => {
                                            const isChecked = projectModal.editItem?.techStack?.some((t: any) => t.name === tech.name);
                                            return (
                                                <label key={tech.name} className="flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        name="tech"
                                                        value={tech.name}
                                                        defaultChecked={isChecked}
                                                        className="rounded bg-slate-950 border-white/10 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                                                    />
                                                    <span>{tech.name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                        Project Screenshot image
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                                        <div className="w-full sm:w-1/2 aspect-video rounded-xl border border-white/10 bg-slate-900/60 relative overflow-hidden flex items-center justify-center text-gray-500 text-xs">
                                            {imagePreview ? (
                                                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                            ) : (
                                                <span>No image selected</span>
                                            )}
                                        </div>
                                        <div 
                                            onDragOver={(e) => { e.preventDefault(); setIsDraggingProjectImage(true); }}
                                            onDragLeave={() => setIsDraggingProjectImage(false)}
                                            onDrop={handleProjectImageDrop}
                                            className={`w-full sm:w-1/2 flex flex-col gap-3 relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 bg-slate-950/20 text-center justify-center items-center cursor-pointer group ${
                                                isDraggingProjectImage
                                                    ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                                                    : "border-white/10 hover:border-cyan-500/50"
                                            }`}
                                        >
                                            <UploadCloud className={`w-8 h-8 transition-colors ${
                                                isDraggingProjectImage ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"
                                            }`} />
                                            <div className="text-xs font-semibold text-slate-300 group-hover:text-white">
                                                {selectedProjectImageName ? `Selected: ${selectedProjectImageName}` : isDraggingProjectImage ? "Drop image here!" : "Select or drag screenshot"}
                                            </div>
                                            <input
                                                id="imageFile"
                                                name="imageFile"
                                                type="file"
                                                required={!projectModal.editItem}
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setSelectedProjectImageName(file.name);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setImagePreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                        triggerAlert("success", `Image selected: ${file.name}`);
                                                    }
                                                }}
                                            />
                                            <span className="text-[9px] text-gray-500 leading-none">
                                                PNG, JPG, or WEBP up to 20MB.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-white/10 pt-5 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setProjectModal({ open: false });
                                            setImagePreview(null);
                                        }}
                                        className="px-5 py-2.5 bg-transparent border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-gray-500 text-slate-950 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                                    >
                                        {isPending ? "Saving..." : projectModal.editItem ? "Save Changes" : "Create Project"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL 3: CERTIFICATION ADD / EDIT */}
            <AnimatePresence>
                {certModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setCertModal({ open: false });
                                setCertLogoPreview(null);
                            }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-950 border border-white/10 w-full max-w-xl p-6 rounded-2xl relative shadow-2xl z-10 text-left my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => {
                                    setCertModal({ open: false });
                                    setCertLogoPreview(null);
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="font-extrabold text-white text-xl mb-6">
                                {certModal.editItem ? "Edit Certification Details" : "Add Certification / Credential"}
                            </h3>

                            <form onSubmit={handleCertFormSubmit} className="flex flex-col gap-5 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="certTitle" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Certification Title</label>
                                        <input
                                            id="certTitle"
                                            name="title"
                                            type="text"
                                            required
                                            defaultValue={certModal.editItem?.title || ""}
                                            placeholder="Introduction to Figma"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="org" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Issuing Organization</label>
                                        <input
                                            id="org"
                                            name="org"
                                            type="text"
                                            required
                                            defaultValue={certModal.editItem?.org || ""}
                                            placeholder="Simplilearn / SLIIT / UoM"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="date" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Date Issued</label>
                                        <input
                                            id="date"
                                            name="date"
                                            type="text"
                                            required
                                            defaultValue={certModal.editItem?.date || ""}
                                            placeholder="Issued January 2026"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="credentialID" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Credential ID (Optional)</label>
                                        <input
                                            id="credentialID"
                                            name="credentialID"
                                            type="text"
                                            defaultValue={certModal.editItem?.credentialID || ""}
                                            placeholder="7Wf2MWI1MH"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="certLink" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Verification URL</label>
                                        <input
                                            id="certLink"
                                            name="link"
                                            type="url"
                                            defaultValue={certModal.editItem?.link || ""}
                                            placeholder="https://..."
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="color" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Logo Card Color (class)</label>
                                        <select
                                            id="color"
                                            name="color"
                                            defaultValue={certModal.editItem?.color || "bg-white"}
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none text-xs font-medium"
                                        >
                                            <option value="bg-white">White background (UoM/SLIIT)</option>
                                            <option value="bg-gray-500/10">Glass Transparent background (Simplilearn)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono text-cyan-400 uppercase tracking-widest pl-1">
                                        Issuer Logo image
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                                        <div className="w-24 h-24 rounded-xl border border-white/10 bg-slate-900/60 relative overflow-hidden flex items-center justify-center text-gray-500 text-xs shrink-0">
                                            {certLogoPreview ? (
                                                <Image src={certLogoPreview} alt="Preview" fill className="object-contain" />
                                            ) : (
                                                <span>No logo</span>
                                            )}
                                        </div>
                                        <div 
                                            onDragOver={(e) => { e.preventDefault(); setIsDraggingCertLogo(true); }}
                                            onDragLeave={() => setIsDraggingCertLogo(false)}
                                            onDrop={handleCertLogoDrop}
                                            className={`w-full flex flex-col gap-3 relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 bg-slate-950/20 text-center justify-center items-center cursor-pointer group ${
                                                isDraggingCertLogo
                                                    ? "border-cyan-500 bg-cyan-950/20 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                                                    : "border-white/10 hover:border-cyan-500/50"
                                            }`}
                                        >
                                            <UploadCloud className={`w-8 h-8 transition-colors ${
                                                isDraggingCertLogo ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"
                                            }`} />
                                            <div className="text-xs font-semibold text-slate-300 group-hover:text-white">
                                                {selectedCertLogoName ? `Selected: ${selectedCertLogoName}` : isDraggingCertLogo ? "Drop logo here!" : "Select or drag logo"}
                                            </div>
                                            <input
                                                id="logoFile"
                                                name="logoFile"
                                                type="file"
                                                required={!certModal.editItem}
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setSelectedCertLogoName(file.name);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setCertLogoPreview(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                        triggerAlert("success", `Logo selected: ${file.name}`);
                                                    }
                                                }}
                                            />
                                            <span className="text-[9px] text-gray-500 leading-none">
                                                PNG, JPG, or WEBP up to 10MB.
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 border-t border-white/10 pt-5 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCertModal({ open: false });
                                            setCertLogoPreview(null);
                                        }}
                                        className="px-5 py-2.5 bg-transparent border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-gray-500 text-slate-950 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                                    >
                                        {isPending ? "Saving..." : certModal.editItem ? "Save Changes" : "Add Credential"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL 4: JOURNEY TIMELINE ADD / EDIT */}
            <AnimatePresence>
                {journeyModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setJourneyModal({ open: false })}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-950 border border-white/10 w-full max-w-xl p-6 rounded-2xl relative shadow-2xl z-10 text-left my-8 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setJourneyModal({ open: false })}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="font-extrabold text-white text-xl mb-6">
                                {journeyModal.editItem ? "Edit Timeline Milestone" : "Add Journey Timeline Milestone"}
                            </h3>

                            <form onSubmit={handleJourneyFormSubmit} className="flex flex-col gap-5 text-sm">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="year" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Year range</label>
                                        <input
                                            id="year"
                                            name="year"
                                            type="text"
                                            required
                                            defaultValue={journeyModal.editItem?.year || ""}
                                            placeholder="2025 - Present"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="type" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Milestone type</label>
                                        <select
                                            id="type"
                                            name="type"
                                            required
                                            defaultValue={journeyModal.editItem?.type || "experience"}
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none text-xs font-medium"
                                        >
                                            <option value="experience">Professional Experience</option>
                                            <option value="education">Academic Education</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="title" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Milestone Title</label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            required
                                            defaultValue={journeyModal.editItem?.title || ""}
                                            placeholder="UI/UX Designer"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="subtitle" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Organization/School</label>
                                        <input
                                            id="subtitle"
                                            name="subtitle"
                                            type="text"
                                            required
                                            defaultValue={journeyModal.editItem?.subtitle || ""}
                                            placeholder="All In One Holding"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="iconName" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Timeline icon</label>
                                        <select
                                            id="iconName"
                                            name="iconName"
                                            required
                                            defaultValue={journeyModal.editItem?.icon_name || "Briefcase"}
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none text-xs font-medium"
                                        >
                                            {TIMELINE_ICONS.map((i) => (
                                                <option key={i} value={i}>
                                                    {i}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="order" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Order index (Ascending)</label>
                                        <input
                                            id="order"
                                            name="order"
                                            type="number"
                                            defaultValue={journeyModal.editItem?.order !== undefined ? journeyModal.editItem.order : "0"}
                                            placeholder="0"
                                            className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none text-xs font-medium font-mono"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="tags" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Milestone tags (Comma separated)</label>
                                    <input
                                        id="tags"
                                        name="tags"
                                        type="text"
                                        defaultValue={journeyModal.editItem?.tags?.join(", ") || ""}
                                        placeholder="UI/UX, Figma, Web Design"
                                        className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 text-xs font-medium"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="description" className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        required
                                        rows={4}
                                        defaultValue={journeyModal.editItem?.description || ""}
                                        placeholder="Milestone achievements, responsibilities, research, software libraries learned..."
                                        className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 rounded-xl text-white outline-none placeholder:text-gray-600 resize-none text-xs leading-relaxed"
                                    />
                                </div>

                                <div className="flex justify-end gap-3 border-t border-white/10 pt-5 mt-3">
                                    <button
                                        type="button"
                                        onClick={() => setJourneyModal({ open: false })}
                                        className="px-5 py-2.5 bg-transparent border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 disabled:text-gray-500 text-slate-950 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                                    >
                                        {isPending ? "Saving..." : journeyModal.editItem ? "Save Changes" : "Create Milestone"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
