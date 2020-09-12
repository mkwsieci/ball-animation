const c = document.querySelector('canvas');
const ctx = c.getContext('2d');
c.width = window.innerWidth;
c.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize', () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    init();
})

//Funkcja generowania losowego koloru (generate random color)

function color(){
    let color, hex;
    hex = "#";
    for(let i=0; i<6; i++){
        color = Math.floor(Math.random()*15);
        switch(color){
            case 10:
                color = "A";
                break;
            case 11:
                color = "B";
                break;
            case 12:
                color = "C";
                break;
            case 13:
                color = "D";
                break;
            case 14:
                color = "E";
                break;
            case 15:
                color = "F";
                break;
        }
        hex += color; 
    }
    return hex;
}

// Dodanie wygenerowanego koloru do tablicy (Add generated color to array)

let colorArray = [];

for(let i = 0; i < 10; i++){
    colorArray.push(color());
}


function Circle(x, y, dx, dy, radius, color, minRadius, maxRadius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = () => {
        this.draw();
        this.x += this.dx;
        this.y += this.dy;
        if(this.x + radius > innerWidth || this.x-radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + radius > innerHeight || this.y - radius < 0)
        {
            this.dy = -this.dy;
        }

        //Interakcja z myszką (mouse event)
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < this.maxRadius){
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }
    }
}


let circleArray;
function init() {
    circleArray = [];
    for(let i = 0; i < 600; i++){
        let radius = (Math.random() * 20) +5;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;
        let minRadius = (Math.random() * 20) + 3;
        let maxRadius = (Math.random() * 70) + 3;
        let color = colorArray[Math.floor(Math.random()*colorArray.length)];
        circleArray.push(new Circle(x,y,dx,dy,radius,color, minRadius, maxRadius));
    }
}



function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => {
        circle.update();
    });
}
init();
animation();