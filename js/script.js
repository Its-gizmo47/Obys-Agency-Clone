function mouseFollower(){
    document.addEventListener("mousemove",(e)=>{
        gsap.from("#crsr-circle",{
            opacity: 0,
        });
        gsap.to("#crsr-circle",{
            x: e.x,
            y: e.y,
            duration: .1,
        });
    });
}
function loaderAnimation(){

    let loadingTime = document.querySelector("#line1 span");
    let count = 0;
    let loading = setInterval(()=>{
            count++;
            loadingTime.innerHTML = count;
            if(count > 99){
                clearInterval(loading);
            }
        },30)

    let tl =  gsap.timeline();

    tl.to("body",{
        overflow: "hidden"
    });
    tl.from("#loader .lines h1",{
        y:100,
        duration:.6,
        stagger:0.3
    });
    tl.from("#line4 p",{
        opacity:0,
    });
    tl.to("#loader #line2 h1",{
        delay:1,
        duration:.4,
        opacity:0,
    });
    tl.to("#loader .lines h1",{
        opacity:0,
        stagger:.1
    });
    tl.to("#loader .lines",{
        duration: 0.3,
        opacity:0
    });
    tl.to("#loader",{
        delay:.2,
        y:"-100%",
        duration: 0.5
    });
    tl.to("body",{
        duration:0.1,
        overflow: "visible"
    });
    tl.from("nav",{
        opacity: 0,
        y:-50,
        duration: 0.4,
    }, "-=.2");
    tl.from("#page1-hero h1",{
        y:120,
        stagger:0.2,
        duration: 0.5,
        opacity:0,
    },"-=.3");
    tl.to("#loader",{
        display: "none",
        duration: 0.1
    },"-=1");
    tl.from("#page2",{
        opacity: 0,
        duration: 0.4,
    },"-=.5");
}
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    const scroll = new LocomotiveScroll({
        el: document.querySelector('main'),
        smooth: true
    });

}
function videoCircleAnimation(){

    let page2Vid = document.querySelector("#page2-video");
    let vid = document.querySelector("#page2-video video");

    function videoCntrl(){
        let videoCircleIcon = document.querySelector("#video-circle i");

        videoCircleIcon.classList.toggle("fa-play");
        videoCircleIcon.classList.toggle("fa-pause");
    }


    // video Click event handler

    page2Vid.addEventListener("click",(e)=>{
        // const onEvent = e.target.matches(page2Vid)
        
        function playVid(scl){
            if(!vid.paused){  
                videoCntrl();
                vid.pause();
                gsap.to("#page2 #video-circle",{
                    scale: 1,
                    duration: 0.3,
                    ease: Back.easeInOut,
                });
                gsap.to("#video-overlay-img",{
                    opacity:1,
                    duration: .2,
                });
            } 
            else if(vid.paused){
                videoCntrl();
                vid.play();
                gsap.to("#page2 #video-circle",{
                    scale: scl,
                    duration: 0.3,
                    ease: Back.easeInOut,
                },);
                gsap.to("#video-overlay-img",{
                    opacity:0,
                    duration: .2,
                });
                
            }
        }
        function chk(){
            if(e.target.matches("#video-overlay-img")){
                playVid(0.6)
            }
        }
        chk();

        function width(){
            var width = window.innerWidth;
            if(width <= 768){
                playVid(0);
                }
             }
         width();
        });

    function vidCircle(){
            // video Mouse Leave event handler

        page2Vid.addEventListener("mouseleave", (e)=>{
            gsap.to("#crsr-circle",{
                opacity: 1,
                scale:1,
            });
            gsap.to("#video-circle",{
                left : "80%",
                top: "0%",
                duration: .4,
        });
    });

        // video Mouse Enter / Mouse Move event handler
        page2Vid.addEventListener("mouseenter", ()=>{
            page2Vid.addEventListener("mousemove",(evt) =>{
                    gsap.to("#crsr-circle",{
                        opacity: 0,
                        scale:0,
                    });
                    gsap.to("#video-circle",{
                        left : evt.x - 450,
                        top : evt.y - 200,
                        duration: .4,
                });
            });
        });
    }
    function width(){
        var width = window.innerWidth;
        if(width >= 768){
            vidCircle();
        }
    }
    width();
}

function imgEffect(){
    Shery.imageEffect(".img-box", {
      style: 1,
      gooey: true,
      config:{
          "a":{"value":0,"range":[0,30]},"b":{"value":0.69,"range":[-1,1]},"zindex":{"value":"99","range":[-9999999,9999999]},"aspect":{"value":0.7414320193081255},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":true},"growSize":{"value":3.89,"range":[1,15]},"durationOut":{"value":0.96,"range":[0.1,5]},"durationIn":{"value":1.45,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.92,"range":[0,10]},"metaball":{"value":0.46,"range":[0,2]},"discard_threshold":{"value":0.51,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":6.87,"range":[0,100]}
      },
    });
    Shery.makeMagnet("#sticky-nav #menu", {
    });
    Shery.makeMagnet("#nav-part2 h2", {
    });
}
function flagEffect(){

    let flagContainer = document.querySelector("#page1 #page1-hero #hero3 h1");
    let entered = false;
    document.addEventListener("mousemove",(e)=>{
        gsap.to(".flag-effect",{
            x: e.x,
            y: e.y,
            duration: .1,
            zIndex: 1,
        });
    });

    flagContainer.addEventListener("mouseenter",()=>{
        entered = true;
        if(entered === true){
            gsap.to(".flag-effect",{
                opacity: 1,
                duration: .6,
            });
        }
        
     });
     flagContainer.addEventListener("mouseleave",()=>{
        entered = false;
        if(entered === false){
            gsap.to(".flag-effect",{
                opacity: 0,
                duration: .1,
            });
        }

     });
    
}


mouseFollower();
loaderAnimation();
videoCircleAnimation();
locomotiveAnimation();

function width(){
    var width = window.innerWidth;
    if(width >= 768){
        imgEffect();
        flagEffect();
    }
}
width();
