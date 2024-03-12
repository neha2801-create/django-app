import anime from "animejs";
import React, { useEffect } from "react";

const MorphingTest = () => {
    useEffect(() => {
        const morphingAnimation = anime({
            targets: ".morphing-demo",
            scale: [
                1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
            ],
            // opacity: [1, 0., 1],
            rotate: [0, 60, 120, 180, 240, 300, 360, 300, 240, 180, 120, 60, 0],
            easing: "easeOutQuad",
            duration: 5000,
            loop: true,
        });

        // Clean up the animation when the component unmounts
        return () => {
            morphingAnimation.pause();
        };
    }, []);
    return (
        <svg
            // scale={1}
            // opacity={1}
            // rotate={"20%"}
            className="morphing-demo"
            width="715"
            height="560"
            viewBox="0 0 715 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="path"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M93.6012 49.997C158.883 -3.6877 249.023 28.5906 333.521 27.5206C447.329 26.0794 580.276 -40.5464 657.693 42.8537C740.665 132.236 723.283 280.494 670.405 390.437C623.337 488.302 517.244 541.191 409.958 557.942C323.886 571.381 251.989 514.367 178.772 467.199C107.218 421.103 22.4493 380.738 5.42229 297.333C-12.9937 207.123 22.4699 108.492 93.6012 49.997Z"
                fill="#FF5300"
            />
        </svg>

        // <svg className="morphing-demo">
        //     {/* Your SVG content with the 'polymorph' element */}
        //     <polygon
        //         className="polymorph"
        //         points="70 10 110 30 90 90 50 90 10 50 70 10 110 30 90 90 50 90 10 50"
        //     />
        // </svg>
    );
};

export default MorphingTest;
