let video;
let poseNet;
let pose;
let speed = 30;
let scores = 0;


class Fruit{
    
    constructor(x,y,model, colorR, colorG, colorB){
        this.x = x;
        this.y = y;
        this.model = model
        this.colorR = colorR
        this.colorG = colorG
        this.colorB = colorB
    }
    show(){
        noFill();
        noStroke(); 
        ellipse(this.x+(this.x)*-1,10,50,50);
        noStroke();
        scale(.5);
        fill(this.colorR, this.colorG, this.colorB);
        model(this.model)
    }
    move(){
        translate(this.x, this.y, 100);
        return this.x, this.y;
    }
    rerun(){
        this.y += speed/10;
        if (this.y > 500){
            this.y = -300 ;
            this.x = random(-275,275);
        }
    } 
    hide(){
        noFill();
    }  
}
class score{
    show(){
        fill(255);
        noStroke();
        textAlign(LEFT, TOP);
        text('score :'+' '+ scores,-300,-200);
    }
}

function preload(){
    Avenir = loadFont('AvenirNextLTPro-Regular.otf');
    banana = loadModel('banana.obj', true);
    pineapple = loadModel('Pineapple.obj', true);
    //apple = loadModel('apple2.obj', true);
}

function setup(){
    createCanvas(1440, 1000, WEBGL);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
    banana = new Fruit(random(-275,275),-300,banana,255,255,0);
    pineapple = new Fruit(random(-275,275),-500,pineapple,255,200,0);
    Scores = new score();
    img = loadImage('fruit-ninja.jpg');
    textFont(Avenir);
    //apple = new Fruit(apple,255,0,0);

}
function gotPoses(poses){
    if(poses.length > 0){
        pose = poses[0].pose;
    }
}
function modelLoded(){
    console.log('poseNet ready')
}
function draw(){
    directionalLight(255, 255, 255, 0, 0, -1);
    scale(2,2);
    
    background(0);
    image(img,-360,-300, img.width/2.5, img.height/2.5);

    push();
    Scores.show();
    pop();


    /*
    push();
    pineapple.move();
    pineapple.rerun();
    pineapple.show();
    pop();
    */
   if(banana.y >= 400){
    scores = 0;
    }


    
    translate(-320,-300);
    
 


    if (pose){
        noStroke();
        fill(255,250,250);
        ellipse(pose.nose.x, pose.nose.y, 50, 5 );

        push();
        banana.move();
        banana.rerun();

        f = dist(banana.x, banana.y, pose.nose.x, pose.nose.y);
        console.log(banana.y);
        if (f/2 < 25){
            banana.hide(); 
            scores += 10; 
            banana.x = random(400);
            banana.y = -500;
        }
        banana.show();
        pop();
        //ellipse(pose.leftWrist.x, pose.leftWrist.y,20);
    }

}