"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

const DEFAULT_SVG_URL = "/images/JM_Hero.svg";
const SVG_NS = "http://www.w3.org/2000/svg";

const MIN_PATH_LENGTH = 90;

const RANDOM_DELAY_MIN = 120;
const RANDOM_DELAY_MAX = 500;

const EFFECT_DURATION = 700;
const FADE_DURATION = 500;


const NOOP_CONTROLLER = {
    pause() {},
    resume() {},
    destroy() {},
};



/* =========================================
   JOURNEY ONLY STYLE
========================================= */

function styleJourneyArtwork(svg){

    const elements =
        svg.querySelectorAll(
            "path,line,polyline,polygon,circle,ellipse"
        );


    elements.forEach((el)=>{


        if(
            el.hasAttribute(
                "data-profile-effect"
            )
        ){
            return;
        }



        el.style.setProperty(
            "stroke",
            "rgba(75,80,90,0.75)",
            "important"
        );



        el.style.setProperty(
            "stroke-width",
            "1.05",
            "important"
        );



        el.style.setProperty(
            "stroke-linecap",
            "round",
            "important"
        );



        el.style.setProperty(
            "stroke-linejoin",
            "round",
            "important"
        );


        /*
          KEEP ORIGINAL VECTOR FILLS
          DO NOT REMOVE THEM
        */
        el.style.setProperty(
    "opacity",
    "0.85",
    "important"
);


    });

}



/* =========================================
   RANDOM LINE EFFECT
   (same engine for both)
========================================= */

function startComet(svg, variant="hero"){


const originalPaths =
    Array.from(
        svg.querySelectorAll(
            variant === "journey"
                ? "path,polygon,polyline,line,circle,ellipse"
                : "path:not([data-profile-effect])"
        )
    );



    originalPaths.forEach((path)=>{

        path.setAttribute(
            "data-profile-base",
            "true"
        );

    });



    const artPaths =
        originalPaths.filter((path)=>{

            try{

                return (
                    path.getTotalLength()
                    >
                    MIN_PATH_LENGTH
                );

            }
            catch{

                return false;

            }

        });



    if(!artPaths.length){

        return NOOP_CONTROLLER;

    }




    let cancelled=false;

    let paused=false;

    let timer=null;




    function createRandomStroke(){


        if(cancelled || paused){

            return;

        }



        const source =
            artPaths[
                Math.floor(
                    Math.random()
                    *
                    artPaths.length
                )
            ];



        let totalLength;



        try{

            totalLength =
                source.getTotalLength();

        }
        catch{

            return;

        }





        const start =
            Math.random()
            *
            totalLength;



        const strokeLength =
            35
            +
            Math.random()
            *
            120;



        const points=[];



        for(
            let i=0;
            i<=strokeLength;
            i+=8
        ){

            const point =
                source.getPointAtLength(
                    Math.min(
                        start+i,
                        totalLength
                    )
                );


            points.push(
                `${points.length ? "L":"M"}${point.x},${point.y}`
            );

        }



        if(points.length<2){

            return;

        }



        const glow =
            document.createElementNS(
                SVG_NS,
                "path"
            );



        glow.setAttribute(
            "data-profile-effect",
            "true"
        );


        glow.setAttribute(
            "class",
            "profile-random-glow"
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
            "2"
        );


        glow.setAttribute(
            "stroke-linecap",
            "round"
        );



        glow.style.setProperty(
            "stroke",
            "var(--primary)",
            "important"
        );


        glow.style.opacity="0";


        glow.style.pointerEvents =
            "none";


        glow.style.filter =
            "drop-shadow(0 0 5px var(--primary))";



        svg.appendChild(glow);

glow.style.zIndex = "10";




        let length;


        try{

            length =
                glow.getTotalLength();

        }
        catch{

            glow.remove();

            return;

        }



        glow.style.strokeDasharray =
            `${length} ${length}`;


        glow.style.strokeDashoffset =
            length;



        requestAnimationFrame(()=>{


            glow.style.transition =
            `
            stroke-dashoffset ${EFFECT_DURATION}ms ease,
            opacity 200ms ease
            `;



            glow.style.opacity =
                "0.75";



            glow.style.strokeDashoffset =
                "0";


        });




        setTimeout(()=>{


            glow.style.transition =
            `
            opacity ${FADE_DURATION}ms ease
            `;



            glow.style.opacity =
                "0";



            setTimeout(()=>{

                glow.remove();

            },FADE_DURATION);



        },EFFECT_DURATION);


    }






    function loop(){


        if(cancelled){

            return;

        }



        if(!paused){

            createRandomStroke();

        }



        timer =
            setTimeout(
                loop,
                RANDOM_DELAY_MIN
                +
                Math.random()
                *
                RANDOM_DELAY_MAX
            );

    }




    loop();




    return {


        pause(){

            paused=true;

        },



        resume(){

            paused=false;

        },



        destroy(){


            cancelled=true;



            if(timer){

                clearTimeout(timer);

            }



            svg
            .querySelectorAll(
                "[data-profile-effect]"
            )
            .forEach(
                (el)=>el.remove()
            );


        }


    };


}





export function ProfileArt({

    className,

    label="Profile illustration",

    src=DEFAULT_SVG_URL,

    variant="hero",

}){


    const hostRef =
        React.useRef(null);



    const reduceMotion =
        useReducedMotion();



    const [
        markup,
        setMarkup
    ] =
    React.useState(null);





    React.useEffect(()=>{


        let alive=true;



        fetch(src)

        .then((response)=>{


            if(!response.ok){

                throw new Error(
                    `Could not load ${src}`
                );

            }


            return response.text();


        })

        .then((text)=>{


            if(alive){

                setMarkup(text);

            }


        })

        .catch((error)=>{


            console.error(
                "ProfileArt error:",
                error
            );


        });



        return ()=>{

            alive=false;

        };


    },[src]);






    React.useEffect(()=>{


        if(!markup){

            return;

        }



        const host =
            hostRef.current;



        const svg =
            host?.querySelector("svg");



        if(!host || !svg){

            return;

        }



        svg.removeAttribute("width");

        svg.removeAttribute("height");



        svg.setAttribute(
            "width",
            "100%"
        );


        svg.setAttribute(
            "height",
            "100%"
        );



        svg.style.display="block";

        svg.style.width="100%";

        svg.style.height="100%";



        svg.querySelector(
            "title"
        )?.remove();





        /*
          ONLY JOURNEY GETS THIS
        */

        if(
            variant==="journey"
        ){

            styleJourneyArtwork(svg);

        }





        if(reduceMotion){

            return;

        }





const controller =
    startComet(svg, variant);





        const observer =
            new IntersectionObserver(

                ([entry])=>{


                    if(entry.isIntersecting){

                        controller.resume();

                    }
                    else{

                        controller.pause();

                    }


                },

                {
                    threshold:0.05
                }

            );



        observer.observe(host);





        return ()=>{


            observer.disconnect();



            controller.destroy();


        };



    },[
        markup,
        reduceMotion,
        variant
    ]);





    return (

        <div

            ref={hostRef}

            role="img"

            aria-label={label}

            className={
                `profile-art ${
                    className ?? ""
                }`
            }


            dangerouslySetInnerHTML={

                markup

                ?

                {
                    __html:markup
                }

                :

                undefined

            }

        />

    );

}