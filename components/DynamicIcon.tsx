import React from "react";
import {
    Code2, Figma, Smartphone, Globe, Layers, Layout,
    LayoutDashboard, GraduationCap, Briefcase, School, Sparkles,
    ArrowUpRight, Github, Award, BookOpen, ShieldCheck, Mail, Phone, Calendar
} from "lucide-react";
import {
    FaBehance, FaReact, FaNodeJs, FaJava, FaPython, FaPhp,
    FaGitAlt, FaGithub, FaAndroid, FaHtml5, FaFigma, FaChartBar,
    FaLinkedin, FaInstagram, FaFacebook, FaWhatsapp
} from "react-icons/fa";
import {
    SiJavascript, SiCss3, SiTailwindcss, SiVite, SiExpress, SiMongodb,
    SiMysql, SiFirebase, SiKotlin, SiPostman, SiAdobexd, SiSketch,
    SiAdobephotoshop, SiAdobeillustrator, SiNextdotjs, SiTypescript, SiFramer, SiJupyter
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Direct explicit map of required icons to save bundle size
const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
    // Lucide Icons
    Code2,
    Figma,
    Smartphone,
    Globe,
    Layers,
    Layout,
    LayoutDashboard,
    GraduationCap,
    Briefcase,
    School,
    Sparkles,
    ArrowUpRight,
    Github,
    Award,
    BookOpen,
    ShieldCheck,
    Mail,
    Phone,
    Calendar,

    // FontAwesome Icons (Fa)
    FaBehance,
    FaReact,
    FaNodeJs,
    FaJava,
    FaPython,
    FaPhp,
    FaGitAlt,
    FaGithub,
    FaAndroid,
    FaHtml5,
    FaFigma,
    FaChartBar,
    FaLinkedin,
    FaInstagram,
    FaFacebook,
    FaWhatsapp,

    // SimpleIcons (Si)
    SiJavascript,
    SiCss3,
    SiTailwindcss,
    SiVite,
    SiExpress,
    SiMongodb,
    SiMysql,
    SiFirebase,
    SiKotlin,
    SiPostman,
    SiAdobexd,
    SiSketch,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiNextdotjs,
    SiTypescript,
    SiFramer,
    SiJupyter,

    // VS Code (Vsc)
    VscVscode,
};

interface DynamicIconProps {
    name: string;
    className?: string;
    size?: number;
    fallback?: React.ComponentType<{ className?: string; size?: number }>;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
    name,
    className = "",
    size,
    fallback: FallbackIcon = Code2,
}) => {
    // Lookup the icon from our map
    const IconComponent = iconMap[name];

    if (!IconComponent) {
        // Return fallback icon if not found
        return <FallbackIcon className={className} size={size} />;
    }

    return <IconComponent className={className} size={size} />;
};

// Expose the keys for the admin panel dropdown choices
export const availableIconNames = Object.keys(iconMap);
