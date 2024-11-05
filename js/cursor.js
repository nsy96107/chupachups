document.addEventListener('mousemove', (e) => {
  let mouseX = e.pageX + 10; // document의 x좌표값
  let mouseY = e.pageY + 10; // document의 y좌표값

  let cursor = document.querySelector('.cursor');
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
})
출처: https://uiweb.tistory.com/68 [찐망고'S 퍼블리싱그리고디자인:티스토리]

// Inspiration & some copy paste From 
// https://codepen.io/Gthibaud/pen/pyeNKj -- great execution!
// https://modernweb.com/creating-particles-in-html5-canvas/ -- awesome particles!
// https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/ -- gettin fast!
// general js code wrapper for scope maintainance
(function() {
  window.onload = function() {

    // Initialise an empty canvas and place it on the page
    var canvas = document.createElement("canvas");
    canvas.classList.add("overlay-canvas");
    var context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Set up object to contain particles axnd set some default values
    var particles = {},
        particleIndex = 0,
        settings = {
          density: 1,
          minParticleSize: 0.001,
          maxParticleSize: 30 + (canvas.width / 200),
          maxVelocity: 0.1,
          gravity: 1,
          maxLife: 500,
          colors: ["#ffffff","#f7323f","#ffc600","#58c5cb"]
        };

    function resetSettings(){
      settings.maxParticleSize =  30 + (canvas.width / 200);
    }

    // To optimise the previous script, generate some pseudo-random angles
    var seedsX = [];
    var seedsY = [];
    var maxAngles = 100;
    var currentAngle = 0;

    function seedAngles() {
      seedsX = [];
      seedsY = [];
      for (var i = 0; i < maxAngles; i++) {
        seedsX.push(Math.random() * (2 * settings.maxVelocity) - settings.maxVelocity);
        seedsY.push(Math.random() * (2 * settings.maxVelocity) - settings.maxVelocity);
      }
    }

    // Start off with 100 angles ready to go
    seedAngles();

    // Set up a function to create multiple particles
    function Particle(x, y, static) {
      if (currentAngle !== maxAngles) {
        // Establish starting positions and velocities
        this.id = particleIndex;
        particleIndex ++;
        this.vx = seedsX[currentAngle];
        this.vy = seedsY[currentAngle];
        this.x = x + this.vx * 200;
        this.y = y + this.vy * 200;
        this.size = Math.random() * (settings.maxParticleSize - settings.minParticleSize) + settings.minParticleSize;
        var colorIndex = Math.floor(Math.random() * settings.colors.length);
        this.color = hexToRgb(settings.colors[colorIndex]);
        currentAngle++;

        this.life = 0;
        this.maxLife = settings.maxLife;

      } else {
        seedAngles();
        currentAngle = 0;
      }
    }

    // Some prototype methods for the particle's "draw" function
    Particle.prototype.draw = function() {
      // If Particle is old, it goes in the chamber for renewal
      if (this.life >= this.maxLife || !this.color || this.y > canvas.height || this.y < 0 || this.x < 0 || this.x > canvas.width) {
        delete particles[this.id];
        return false;
      }

      // Age the particle
      this.life++;
      // Adjust for gravity
      // this.vy += settings.gravity * (1 - (this.life / settings.maxLife));
      this.x += this.vx;
      this.y += this.vy + settings.gravity * (1 - (this.life / settings.maxLife));;

      context.fillStyle= "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (1 - (this.life / this.maxLife)) + ")";
      context.strokeStyle = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (1 - (this.life / this.maxLife)) + ")";

      // Create the particles
      context.beginPath();
      // // Draws a circle in the center
      context.arc(this.x + 0.5, this.y + 0.5, (this.size / 20) * (1 - (this.life / this.maxLife)), 0, Math.PI*2, true); 

      // Draws a cross of random height and width
      let starWidth = Math.random() * this.size * (1 - (this.life / this.maxLife));
      let starHeight = Math.random() * this.size * (1 - (this.life / this.maxLife));
      context.moveTo(this.x - (starWidth / 2), this.y);
      context.lineTo(this.x + (starWidth / 2), this.y);
      context.moveTo(this.x, this.y - (starHeight / 2))
      context.lineTo(this.x, this.y + (starWidth / 2));

      context.closePath();
      context.fill();
      context.stroke();
    }

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
    })();
    (function animloop(){
      requestAnimFrame(animloop);
      render();
    })();

    function render(){
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the particles
      for (var i in particles) {
        particles[i].draw();
      }    
    }

    var resizeTimeout = false;
    // window.resize event listener
    window.onresize = function(){
      // clear the timeout
      clearTimeout(resizeTimeout);
      // start timing for event "completion"
      resizeTimeout = setTimeout(function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        resetSettings();
      }, 250);
    }

    // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    function hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    window.onclick = function(event){
      for(var i = 0; i < 50; i++){
        particles[particleIndex] = new Particle(event.clientX, event.clientY, false);
        particles[particleIndex - 1].vx *= 100;
        particles[particleIndex - 1].vy *= 100;
      }
    }

    window.onmousemove = function(event){
      particleActionCheck(event.clientX, event.clientY);
    }

    window.ontouchmove = function(event){
      particleActionCheck(event.touches[0].clientX, event.touches[0].clientY);
    }

    function particleActionCheck(x, y){
      // create new particles
      if(settings.density < 1 && settings.density > 0){
        if(Math.random() < settings.density){
          particles[particleIndex] = new Particle(x, y, false);
        }
      } else {
        for (var i = 0; i < settings.density; i++) {
          particles[particleIndex] = new Particle(x, y, false);
        }
      }
    }
  };
})();