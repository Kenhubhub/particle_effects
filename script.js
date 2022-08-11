var canvas = document.querySelector("canvas");


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const distance = (point1,point2) =>{
   return Math.sqrt( (point1.x - point2.x)**2 + (point1.y - point2.y)**2);
}
var c = canvas.getContext("2d"); //returning drawing context
const colors = {
    0:"rgba(255,205,200,0.5)",
    1:"rgba(255,0,0,0.5)",
    2:"rgba(0,255,0,0.5)",
    3:"rgba(0,0,255,0.5)"
}
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", e =>{
    mouse.x = e.x;
    mouse.y = e.y;
})
class Circle {
    constructor(x,y,vx,vy){
        this.x = x;
        this.y = y;
        this.size = 20;
        this.vx = vx;
        this.vy = vy;
        this.color = colors[Math.round(Math.random()*4)];
    }
    update(){
        if(this.x >= innerWidth){
            
            this.vx*= -1;
        }else if(this.x <= 0){
            
            this.vx*= -1;
        }
        if(this.y >= innerHeight){ 
            
            this.vy*= -1;
        }else if(this.y <= 0){
            
            this.vy *= -1;
        }
 
        this.x += this.vx;
        this.y += this.vy;
        
        let d = distance(mouse,{x:this.x,y:this.y});
        c.beginPath(); //Begins the process
        c.moveTo(this.x,this.y); //This sets the start point of the line
        c.lineTo(mouse.x,mouse.y) // This sets the end point of the line ! The context point
        //remains at this location.
        //Now it goes from previous positon to this new position
        c.stroke();
        if(d < 40){
            console.log("hit")
            let limit = 70;
            if(this.size < limit){
                this.size++;
            }
            console.log(this.size)
        }else{
            let limit = 20;
            if(this.size > limit){
                this.size--;

            }
        }
        

    }
    draw(){
        c.strokeStyle=this.color;
        c.fillStyle=this.color;
        c.beginPath(); 
        c.arc(this.x,this.y,this.size,0,2*Math.PI);
        c.stroke(); 
        c.fill()
    }
}
//Create lots of circles
const drawCircles = (numberCircles) =>{
    for(let i = 0 ; i <numberCircles; i++){
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = Math.random() * 200;
        
        let color = colors[Math.round(Math.random()*4)];
        c.strokeStyle=color;
        c.beginPath(); 
        c.arc(x,y,size,0,2*Math.PI);
        c.stroke(); 
         
    }
}

const drawRandomCircle = () =>{
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 200;
    let color = colors[Math.round(Math.random()*4)];
    c.strokeStyle=color;
    c.beginPath(); 
    c.arc(x,y,size,0,2*Math.PI);
    c.stroke(); 
}
const drawCircle = (x,y)=>{
    
    let color = colors[Math.round(Math.random()*4)];
    c.strokeStyle=color;
    
    c.beginPath(); 
    c.arc(x,y,40,0,2*Math.PI);
    
    c.stroke(); 
}
//create array of circle objects
const circles = [];
let initial_height = Math.random() * innerHeight/2;
let initial_width = Math.random() * innerWidth/2;
let vx= (Math.random() - 0.5)*3;
let vy = (Math.random() - 0.5)*4;   
for(let i = 0 ; i<100; i++){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let circle =  new Circle(x,y,vx,vy);
    circles.push(circle);
}
console.log(circles);
const animate = () =>{
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
     
    // if(initial_width >= innerWidth){
    //     vx*= -1;
    // }else if(initial_width <= 0){
    //     vx *= -1;
    // }
    // if(initial_height >= innerHeight){ 
    //     vy*= -1;
    // }else if(initial_height <= 0){
    //     vy *= -1;
    // } 
   
    // drawCircle(initial_width+=vx,initial_height+=vy);
    circles.forEach(circle =>{

        circle.update(vx,vy);
        circle.draw();
    }) 
    
}

animate();
