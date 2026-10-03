// lib/projects.ts

const PLACEHOLDER = (title) =>
    `https://placehold.co/800x500/F1F5F9/0F172A?text=${encodeURIComponent(title)}`;


export const projects = [
    {
        slug: "lumispire",
        title: "LUMISPIRE",
        category: "Web Development",
        description:
            "A polished corporate website for LTC Group of Companies with a clean, responsive presentation across devices.",
        image: PLACEHOLDER("LUMISPIRE"),
        link: "https://www.lumispire.online",
    },

    {
        slug: "silingan-lifestyle-solutions",
        title: "Silingan Lifestyle Solutions",
        category: "Web Development",
        description:
            "A modern lifestyle solutions website focused on branding, usability, and responsive digital experiences.",
        image: PLACEHOLDER("Silingan Lifestyle Solutions"),
        link: "https://dev.silinganlifestylesolutions.com",
    },

    {
        slug: "lumispire-manpower-services",
        title: "Manpower Services",
        category: "Web Development",
        description:
            "A professional service website designed to present manpower solutions and company information clearly.",
        image: PLACEHOLDER("Manpower Services"),
        link: "https://www.lumispire.online/manpower-services",
    },

    {
        slug: "lumispire-resort-venue",
        title: "Resort and Venue",
        category: "Web Development",
        description:
            "A modern resort venue platform designed to showcase facilities, services, and booking experiences through a responsive interface.",
        image: PLACEHOLDER("Resort and Venue"),
        link: "https://www.lumispire.online/resort-venue",
    },

    {
        slug: "lumispire-training-assessment",
        title: "Training and Assessment",
        category: "Web Development",
        description:
            "A digital assessment platform created to simplify training evaluation and improve learning workflows.",
        image: PLACEHOLDER("Training and Assessment"),
        link: "https://www.lumispire.online/training-assessment",
    },
];


// Keeps the same order as defined above
export function sortForDisplay(list = projects) {
    return [...list];
}


export function getProject(slug) {
    return projects.find(
        (project) => project.slug === slug
    );
}