"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ContributionGraph } from "@/components/site/contribution-graph";
import { EASE_OUT } from "@/lib/motion";
import { site } from "@/lib/site";


const SVG_NS = "http://www.w3.org/2000/svg";


const stages = [
    {
        years: "Foundation",
        title: "BS Information Technology",
        blurb:
            "Bachelor of Science in Information Technology specialized in Web and Mobile Application Development at National University - MOA. Building a strong foundation in software development, databases, systems, and emerging technologies.",
    },
    {
        years: "4 yrs",
        title: "Software Development",
        blurb:
            "Designing and developing modern web applications with responsive interfaces, scalable solutions, and user-focused experiences using current web technologies.",
    },
    {
        years: "3 yrs",
        title: "Mobile Development",
        blurb:
            "Creating mobile applications with intuitive interfaces and reliable functionality, focusing on delivering practical solutions for users across different platforms.",
    },
    {
        years: "2 yrs · Now",
        title: "AI Engineering",
        blurb:
            "Exploring artificial intelligence by integrating AI technologies, automation, and intelligent solutions into modern software applications.",
    },
];



function JourneyProfileArt(){

    const ref = React.useRef(null);

    const [svg,setSvg] = React.useState(null);



    React.useEffect(()=>{

        fetch("/images/JM_About.svg")
            .then(res=>res.text())
            .then(text=>setSvg(text));

    },[]);




    React.useEffect(()=>{


        if(!svg) return;



        const host = ref.current;

        const element =
            host?.querySelector("svg");



        if(!element) return;




        element.setAttribute(
            "width",
            "100%"
        );


        element.setAttribute(
            "height",
            "100%"
        );



        element.style.display="block";



        /*
            SOFT GRAY LINE ART
        */

        const drawable =
            Array.from(
                element.querySelectorAll(
                    "path,line,polyline,polygon,circle,ellipse"
                )
            );



        drawable.forEach((item)=>{

    item.style.setProperty(
        "stroke",
        "rgba(95,100,110,1.5)",
        "important"
    );


    item.style.setProperty(
        "stroke-width",
        "1",
        "important"
    );


    item.style.setProperty(
        "stroke-linecap",
        "round",
        "important"
    );


    item.style.setProperty(
        "stroke-linejoin",
        "round",
        "important"
    );


    item.style.setProperty(
        "fill",
        "rgba(95,100,110,0.50)",
        "important"
    );


});


        const paths =
            drawable.filter((item)=>{

                try{

                    return (
                        item.getTotalLength &&
                        item.getTotalLength()>40
                    );

                }
                catch{

                    return false;

                }

            });



        console.log(
            "Journey SVG paths:",
            paths.length
        );



        if(!paths.length){

            return;

        }



        let destroyed=false;




        function createEffect(){


            if(destroyed) return;



            const source =
                paths[
                    Math.floor(
                        Math.random()*paths.length
                    )
                ];



            const total =
                source.getTotalLength();



            const start =
                Math.random()*total;



            const strokeLength =
    120 +
    Math.random()*250;



            const points=[];



            for(
    let i=0;
    i<strokeLength;
    i+=6
){

                const point =
                    source.getPointAtLength(
                        Math.min(
                            start+i,
                            total
                        )
                    );


                points.push(
                    `${points.length?"L":"M"}${point.x},${point.y}`
                );

            }




            const glow =
                document.createElementNS(
                    SVG_NS,
                    "path"
                );



            glow.setAttribute(
                "d",
                points.join(" ")
            );


            glow.setAttribute(
                "fill",
                "none"
            );


            glow.setAttribute(
                "stroke",
                "var(--primary)"
            );


            glow.setAttribute(
    "stroke-width",
    "4"
);


            glow.setAttribute(
                "stroke-linecap",
                "round"
            );



            glow.style.opacity="0";


            glow.style.pointerEvents = "none";

glow.style.zIndex = "999";

glow.style.position = "relative";



            element.appendChild(glow);


            const lengthValue =
                glow.getTotalLength();



            glow.style.strokeDasharray =
                `${lengthValue} ${lengthValue}`;



            glow.style.strokeDashoffset =
                lengthValue;



            requestAnimationFrame(()=>{

                glow.style.transition =
                    "all .8s ease";


                glow.style.opacity="1";


                glow.style.strokeDashoffset="0";

            });



            setTimeout(()=>{


                glow.style.opacity="0";


                setTimeout(()=>{

                    glow.remove();

                },500);


            },1500);



            setTimeout(
                createEffect,
                250+
                Math.random()*500
            );


        }



        function loop(){

    if(destroyed){
        return;
    }

    createEffect();

    setTimeout(
        loop,
        300 + Math.random()*600
    );

}


loop();



        return ()=>{

            destroyed=true;

        };


    },[svg]);




    return (

        <div
            ref={ref}
            className="aspect-[2106/2286] w-full"
            dangerouslySetInnerHTML={
                svg
                ?
                {
                    __html:svg
                }
                :
                undefined
            }
        />

    );

}






export function Journey(){


    const [
        contributions,
        setContributions
    ] =
    React.useState(null);




    React.useEffect(()=>{


        async function loadGithubContributions(){

            try{


                const response =
                    await fetch(
                        `https://github-contributions-api.jogruber.de/v4/${site.github.username}?y=last`
                    );



                const data =
                    await response.json();



                const contributionDays =
                    data.contributions || [];



                const total =
                    contributionDays.reduce(
                        (sum,day)=>
                            sum+(day.count||0),
                        0
                    );



                const weeks=[];

                let currentWeek=[];



                contributionDays.forEach(
                    (day,index)=>{


                        const date =
                            new Date(
                                `${day.date}T00:00:00Z`
                            );


                        currentWeek.push({

                            date:day.date,

                            count:day.count,

                            level:day.level

                        });



                        if(
                            date.getUTCDay()===6 ||
                            index===contributionDays.length-1
                        ){

                            weeks.push(currentWeek);

                            currentWeek=[];

                        }

                    }
                );



                setContributions({

                    total,

                    weeks

                });



            }
            catch(error){

                console.error(error);

            }


        }



        loadGithubContributions();


    },[]);





    return (

        <section
            id="journey"
            className="scroll-mt-24"
        >

            <div className="mx-auto max-w-7xl px-6 py-24 md:py-36">


                <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">


                    <div className="min-w-0">


                        <Reveal>


                            <div className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">


                                <JourneyProfileArt />


                            </div>


                        </Reveal>


                        <Reveal delay={0.1}>


                            <p className="eyebrow mt-10">
                                THE JOURNEY
                            </p>


                            <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl">
                                A DEVELOPER
WHO BUILDS
INTELLIGENT EXPERIENCES
                            </h2>


                            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
                                From software systems to mobile applications and AI solutions, my journey is driven by creating technology that is functional, scalable, and designed around businesses.
                            </p>


                        </Reveal>


                    </div>





                    <div className="min-w-0 lg:pt-4">


                        <RevealGroup
                            as="ol"
                            staggerChildren={0.16}
                        >

                            {stages.map((stage,i)=>(


                                <RevealItem
                                    key={stage.title}
                                    as="li"
                                    className="relative pl-10 pb-12 last:pb-0"
                                >


                                    {i < stages.length-1 && (

                                        <motion.span

                                            aria-hidden

                                            className="absolute bottom-0 left-[3.5px] top-4 w-0.5 origin-top bg-border"

                                        />

                                    )}



                                    <motion.span

                                        aria-hidden

                                        className={`absolute left-0 top-1.5 size-2 rounded-full ${
                                            i===stages.length-1
                                            ?"bg-primary"
                                            :"bg-border"
                                        }`}

                                    />



                                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                                        {stage.years}
                                    </p>



                                    <h3 className="mt-3 font-sans text-xl font-semibold tracking-tight">
                                        {stage.title}
                                    </h3>



                                    {stage.stat && (

                                        <p className="mt-1 font-display text-3xl text-primary md:text-4xl">
                                            {stage.stat}
                                        </p>

                                    )}



                                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                                        {stage.blurb}
                                    </p>


                                </RevealItem>


                            ))}


                        </RevealGroup>




                        {contributions && (

                            <Reveal
                                delay={0.15}
                                className="mt-12"
                            >

                                <ContributionGraph
                                    contributions={contributions}
                                />

                            </Reveal>

                        )}


                    </div>


                </div>


            </div>


        </section>

    );

}