"use client";

import * as React from "react";
import Link from "@/components/compat/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { projects, sortForDisplay } from "@/lib/projects";

import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/site/project-cards";
import { WorkTabs } from "@/components/site/work-tabs";
import { EASE_OUT } from "@/lib/motion";


const MAX_PER_CATEGORY = 3;
const ALL = "All";


export function Work() {

    const [active, setActive] = React.useState(ALL);


    const categories = React.useMemo(() => {

        const unique = [
            ...new Set(
                projects.map((project) => project.category)
            ),
        ];

        return unique.map((key) => ({
            key,
            count: projects.filter(
                (project) => project.category === key
            ).length,
        }));

    }, []);



    const category = categories.find(
        (c) => c.key === active
    );


    const pool =
        active === ALL
            ? projects
            : projects.filter(
                (project) =>
                    project.category === category?.key
            );


    const all = sortForDisplay(pool);


    const items = all.slice(
        0,
        MAX_PER_CATEGORY
    );


    const hiddenCount =
        all.length - items.length;



    const tabs = [
        {
            key: ALL,
            count: projects.length,
        },

        ...categories,
    ];



    return (
        <section
            id="work"
            className="scroll-mt-24 bg-secondary/40"
        >

            <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">


                <Reveal>

                    <p className="eyebrow">
                        Featured work
                    </p>


                    <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
                        Digital products,
                        <br />
                        built with purpose
                    </h2>


                    <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                        Projects built through thoughtful design,
                        modern development, and technology that
                        creates meaningful digital experiences.
                    </p>

                </Reveal>



                <Reveal
                    delay={0.1}
                    className="mt-12"
                >

                    <WorkTabs
                        tabs={tabs}
                        active={active}
                        onChange={setActive}
                        idPrefix="work"
                    />

                </Reveal>




                <div
                    id="work-panel"
                    role="tabpanel"
                    aria-labelledby={`work-tab-${active.replace(/\s/g, "-")}`}
                    className="mt-8"
                >

                    <AnimatePresence
                        mode="wait"
                        initial={false}
                    >

                        <motion.div

                            key={active}

                            initial={{
                                opacity: 0,
                                y: 14,
                            }}

                            animate={{
                                opacity: 1,
                                y: 0,
                            }}

                            exit={{
                                opacity: 0,
                                y: -8,
                            }}

                            transition={{
                                duration: 0.35,
                                ease: EASE_OUT,
                            }}

                        >


                            <RevealGroup

                                className="
                                    grid
                                    gap-4
                                    md:grid-cols-2
                                    md:gap-6
                                    lg:grid-cols-3
                                "

                                staggerChildren={0.07}

                            >

                                {items.map((project) => (

                                    <ProjectCard

                                        key={project.slug}

                                        project={project}

                                    />

                                ))}


                            </RevealGroup>



                            


                        </motion.div>


                    </AnimatePresence>


                </div>





                <Reveal
                    className="
                        mt-12
                        flex
                        justify-center
                    "
                >

                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="group"
                    >

                        <Link href="/work">

                            View all work ({projects.length})

                            <ArrowRight
                                className="
                                    size-4
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                "
                                aria-hidden
                            />

                        </Link>

                    </Button>


                </Reveal>



            </div>

        </section>
    );
}