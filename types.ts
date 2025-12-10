import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface HighlightItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface ResumeItem {
  title: string;
  organization: string;
  date: string;
  points?: string[];
  subInfo?: string;
}

export interface AchievementItem {
  text: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  image: string;
  bio: string;
  details: string;
  tags: string[];
  link?: string;
}

export type CertificateCategory = 'Awards' | 'Machine Learning' | 'Data Science' | 'Matlab' | 'Programming' | `Entrepreneurship` | 'Leadership' | 'Other';

export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category:  CertificateCategory | CertificateCategory[];
  image: string;
  credentialUrl?: string;
}