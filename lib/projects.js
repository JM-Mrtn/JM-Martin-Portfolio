export const projects = [

    {
        slug: "lumispire",

        title: "LUMISPIRE",

        category: "Web Development",

        image: "/images/lumispire.png",

        description:
            "A polished corporate website for LTC Group of Companies with a clear, responsive presentation across devices.",

        year: "2026",

        featured: true,

        role:
            "Frontend Developer",

        technologies: [
            "React",
            "Vite",
            "Tailwind CSS"
        ],

        problem:
            "The company needed a professional digital presence that could clearly communicate their services.",

        solution:
            "Designed and developed a responsive corporate website with modern layouts and user-focused interactions.",

        outcome:
            "Created a cleaner online experience with improved accessibility and brand presentation."

    },


    {
        slug: "silingan-lifestyle-solutions",

        title: "SILINGAN LIFESTYLE SOLUTIONS",

        category: "Web Development",

        image: "/images/silingan.png",

        description:
            "A modern lifestyle platform designed with an elegant interface and responsive experience.",

        year: "2026",

        featured: true,

        role:
            "Full Stack Developer",

        technologies: [
            "React",
            "Node.js",
            "Tailwind CSS"
        ],

        problem:
            "The business needed an online platform that represents their services professionally.",

        solution:
            "Built a responsive website focusing on usability, clean design, and performance.",

        outcome:
            "Delivered a modern platform that improves customer interaction."

    },


    {
        slug: "lumispire-manpower-services",

        title: "MANPOWER SERVICES",

        category: "Web Development",

        image: "/images/manpower.png",

        description:
            "A professional website created for manpower and recruitment services.",

        year: "2026",

        featured: true,

        role:
            "Web Developer",

        technologies: [
            "React",
            "Vite",
            "Tailwind CSS"
        ],

        problem:
            "The company required a digital solution to showcase their manpower services.",

        solution:
            "Developed a structured website with clear service information.",

        outcome:
            "Provided a professional online presence for their business."

    },


    {
        slug: "lumispire-resort-venue",

        title: "RESORT AND VENUE",

        category: "Web Development",

        image: "/images/resort.png",

        description:
            "A booking-focused website designed for resort and venue services.",

        year: "2026",

        featured: false,

        role:
            "Frontend Developer",

        technologies: [
            "React",
            "Tailwind CSS"
        ]

    },


    {
        slug: "lumispire-training-assessment",

        title: "TRAINING AND ASSESSMENT",

        category: "Web Development",

        image: "/images/training.png",

        description:
            "A digital platform for training and assessment services.",

        year: "2026",

        featured: false,

        role:
            "Frontend Developer",

        technologies: [
            "React",
            "Vite"
        ]

    }

];



export const categories = [

    {
        key: "Web Development",

        blurb:
            "Websites and digital platforms built with modern technologies."
    },


    {
        key: "Mobile Development",

        blurb:
            "Mobile applications designed for performance and usability."
    },


    {
        key: "AI Projects",

        blurb:
            "AI-powered solutions and intelligent digital experiences."
    }

];



/*
    Used by Work page
    Sorts projects from newest to oldest.
*/

export function sortForDisplay(projects) {

    return [...projects].sort((a, b) => {

        // Featured projects appear first
        if (a.featured && !b.featured) {
            return -1;
        }

        if (!a.featured && b.featured) {
            return 1;
        }


        // Then sort by year
        return (
            Number(b.year) -
            Number(a.year)
        );

    });

}