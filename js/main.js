//  cacher et montrer l'element after du side menu au scroll.......
let progress_state;
$(document).ready(function () {
  totalheight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function () {
    progress = (window.pageYOffset / totalheight) * 100;
    progress = Math.round(Number(progress));
    progress = progress + "%";
    header = $(".header");

    if (progress_state < progress) {
      header.addClass("header_active");
      header.addClass("header_disapear");
      console.log("scroll to bottom");
    } else if (window.pageYOffset == 0) {
      
      header.removeClass("header_active");
      if(window.innerWidth>1000){
        $('.scroll_indice').css('display','flex');
      }
      
    }else if(progress_state > progress){
      header.removeClass("header_disapear");
        if(window.innerWidth>1000){
          $('.scroll_indice').css('display','none');
        }
    }



    progress_state = progress;
  };
});








$(".banner").css("height", window.innerHeight + "px");

particlesJS("particles-js", {
  particles: {
    number: { value: 600, density: { enable: false, value_area: 10000 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.4,
      random: false,
      anim: { enable: false, speed: 0.5, opacity_min: 0.1, sync: true },
    },
    size: {
      value: 1.2,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 0,
      color: "#ffffff",
      opacity: 0.03204820049354232,
      width: 10.896388167804387,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
var count_particles, stats, update;
stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = "absolute";
stats.domElement.style.left = "0px";
stats.domElement.style.top = "0px";
stats.domElement.style.display = "none";
document.body.appendChild(stats.domElement);
count_particles = document.querySelector(".js-count-particles");
update = function () {
  stats.begin();
  stats.end();
  if (
    window.pJSDom[0].pJS.particles &&
    window.pJSDom[0].pJS.particles.array
  ) {
    // count_particles.innerText =
    //   window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);



function fn_owl_projet(){
    owl_projet = $(".owl_projet");
    owl_projet.owlCarousel({
      items: 1,
      loop: false,
      center: false,
      nav: false,
      autoplay: false,
      margin: 20,
      responsive: {
        642: {
          items: 2,
          center: true,
          margin: 5,
        },
        673: {
          items: 2,
          center: true,
          margin: 5,
        },
        1063: {
          items: 3,
        },
        1370: {
          items: 4,
        },
      },
    });
  

    $(".btn_owl_projet_left").click(function () {
        owl_projet.trigger("prev.owl.carousel");
    });
  
    $(".btn_owl_projet_right").click(function () {
        owl_projet.trigger("next.owl.carousel");
    });
   
  
}

$(document).ready(function () {
    fn_owl_projet();
   
  });




  // /////////////////////////
  //matter js animations


        //*************
      //matterjs univers
      //*************

// Matter.js - http://brm.io/matter-js/

var Example = Example || {};

Matter.use(
    'matter-wrap'
);

function avalanche() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;


    // create renderer
    var render = Render.create({
          element: document.getElementById("matter_univers"),
          engine: engine,
          options: {
            wireframes: false,
            background: "#212121",
           
          },
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 25), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });
    
    World.add(world, stack);
    
    World.add(world, [
        Bodies.rectangle(200, 150, 700, 20, { isStatic: true , angle: Math.PI * 0.06 ,render: { fillStyle: '#BDBDBD' } }),
        Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06,render: { fillStyle: '#BDBDBD' }  }),
        Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04 ,render: { fillStyle: '#BDBDBD' } })
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, Composite.allBodies(world));

    // wrapping using matter-wrap plugin
    for (var i = 0; i < stack.bodies.length; i += 1) {
        stack.bodies[i].plugin.wrap = {
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    }

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

// create demo interface
// not required to use Matter.js

// MatterTools.Demo.create({
//   toolbar: {
//     title: 'matter-js',
//     url: 'https://github.com/liabru/matter-js',
//     reset: true,
//     source: true,
//     fullscreen: true,
//     exampleSelect: true
//   },
//   preventZoom: true,
//   resetOnOrientation: true,
//   examples: [
//     {
//       name: 'Avalanche',
//       id: 'avalanche',
//       init: Example.avalanche,
//       sourceLink: 'https://github.com/liabru/matter-js/blob/master/examples/avalanche.js'
//     }
//   ]
// });


avalanche();

$(document).ready(function () {
  $('.btn_menu').on('click',function(){
    $('.mob').toggleClass('mob_active');
  })
  $('.close_menu').on('click',function(){
    $('.mob').toggleClass('mob_active');
  })
});



function selected_item(item,cb){
  $('body').on('click',item,function(){
      $(item).removeClass('active');
      $(this).addClass('active');
  });
}

$(document).ready(function () {
  selected_item('.menu_container .item');
});

$(document).ready(function () {
  selected_item('.tool_menu .lang .item');
});
