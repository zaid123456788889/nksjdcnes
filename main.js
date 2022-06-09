song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;


function setup(){
    canvas = createCanvas(600 , 500)
    canvas.center();

    video = createCapture(VIDEO);
    video.hide;

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.onpose('poses' , gotPoses);
}

function modelLoaded(){
    console.log("PoseNet initialised !")
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;

    console.log("Score Right Wrist =" + scoreRightWrist+ ",Score Left Wrist ="+scoreLeftWrist);


    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist X ="+rightWristX+", right wrist y = "+rightWristY);

leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
console.log("left wrist X ="+leftWristX+", left wrist y = "+leftWristY);

}
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000")
    stroke("#FF0000")
if(scoreRightWrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);

    if(rightWristX >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "The speed is 0.5x";
        play.rate(0.5);
    }
   else  if(rightWristX >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "The speed is 1x";
        play.rate(1);
    }
   else if(rightWristX >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "The speed is 1.5x";
        play.rate(1.5);
    }
    else if(rightWristX >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "The speed is 2x";
        play.rate(2);
    }
   else if(rightWristY > 400)
    {
        document.getElementById("speed").innerHTML = "The speed is 2.5x";
        play.rate(2.5);
    }
}
if(scoreLeftWrist > 0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberLeftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberLeftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume ="+volume ;
    song.setVolume(volume);
}
}
function play(){
    play.song();
    play.setVolume(1);
    play.rate(1);
}