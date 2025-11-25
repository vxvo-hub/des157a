(function () {
     "use strict";
     console.log("reading js");
     // your code starts here

     const images = document.querySelectorAll('.imagecontainer img');

     const observer = new IntersectionObserver((entries, observer) => {
     entries.forEach(entry => {
          if (entry.isIntersecting) {
               entry.target.classList.add('show'); 
               observer.unobserve(entry.target);  
          }
     });
     }, {
     threshold: 0.5 
     });

     images.forEach(img => observer.observe(img));

     const bikeImage = document.querySelector('#biking img')

     function changeBike(){
          setTimeout(function(){
                bikeImage.src = 'images/bike1.jpg';
                setTimeout(function(){
                    bikeImage.src = 'images/bike2.jpg';
                    setTimeout(function(){
                        bikeImage.src = 'images/bike3.jpg';
                        setTimeout(function(){
                            changeBike(); 
                        }, 500);
                    }, 500);
                }, 500); 
            }, 500 ); 
        }

     changeBike();

     const pencil = document.querySelector('#pencil');

     let angle = 0;
     let direction = 1;
     const maxAngle = 20; 
     const speed = 0.5;  

     function rotatePencil() {
     angle += direction * speed;

     if (angle > maxAngle || angle < -maxAngle) {
          direction *= -1;
     }

     pencil.style.transform = `rotate(${angle}deg)`;
     requestAnimationFrame(rotatePencil);
     }

     rotatePencil();
     
})();