import { FaUserMd } from "react-icons/fa";

import { FaAward } from "react-icons/fa";

import { FaBriefcaseMedical, FaHeart } from "react-icons/fa";

export const CONSTANTS = {
  PHONE: "+1 (800) 123-4567",
  EMAIL: "info@example.com",
  ADDRESS: "123 Medical Center Blvd, Suite 200",
  INSTAGRAM: "https://www.instagram.com/example",
  FACEBOOK: "https://www.facebook.com/example",
  TWITTER: "https://www.twitter.com/example",
  LINKEDIN: "https://www.linkedin.com/company/example",
} as const;

export const STATS = [
  { number: "500+", label: "Healthcare Providers", icon: FaUserMd },
  { number: "8+", label: "Years in Healthcare", icon: FaAward },
  {
    number: "30+",
    label: "Medical Specialties",
    icon: FaBriefcaseMedical,
  },
  { number: "98%", label: "Client Satisfaction", icon: FaHeart },
] as const;

export const MILESTONES = [
  {
    year: "2015",
    title: "Founded",
    description:
      "Established with a mission to improve healthcare delivery through innovative solutions.",
  },
  {
    year: "2017",
    title: "EHR Integration",
    description:
      "Developed our first electronic health record integration system for small practices.",
  },
  {
    year: "2019",
    title: "Telehealth Platform",
    description:
      "Launched our telehealth platform to help providers reach patients remotely.",
  },
  {
    year: "2021",
    title: "100th Healthcare Client",
    description:
      "Celebrated helping our 100th healthcare provider improve patient care.",
  },
  {
    year: "2023",
    title: "Healthcare Innovation Award",
    description:
      "Recognized for excellence in healthcare technology solutions.",
  },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Dr. Jane Smith",
    position: "Chief Medical Officer",
    bio: "Board-certified physician with 15+ years of experience in healthcare management and clinical excellence.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Dr. Michael Chen",
    position: "Medical Director",
    bio: "Specialist in healthcare systems optimization with a focus on improving patient outcomes and clinical workflows.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Sarah Johnson",
    position: "Healthcare IT Specialist",
    bio: "Expert in medical software implementation and electronic health record systems for modern practices.",
    image: "/placeholder.jpg",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Robert Williams",
    position: "Patient Experience Consultant",
    bio: "Dedicated to enhancing patient satisfaction and streamlining healthcare delivery processes.",
    image: "/placeholder.jpg",
  },
] as const;
