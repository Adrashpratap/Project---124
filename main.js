song1 = "";
song2 = "";

leftwristX = "";
leftwristY = "";

rightwristX  = "";
rightwristY = "";

songplay = "";

score_leftwrist = "";

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded()
{
    console.log("Model is loaded");
}

function gotPoses(results){
  if (results.length > 0) {
      console.log(results);
       
      score_leftwrist = results[0].pose.keypoints[9].score;
      console.log("Score_leftwrist = "+ score_leftwrist);

      leftwristX = results[0].pose.leftWrist.x;
      leftwristY = results[0].pose.leftWrist.y;
      console.log("leftwristX = "+ leftwristX + "leftwristY = "+ leftwristY);

      rightwristX = results[0].pose.rightWrist.x;
      rightwristY = results[0].pose.rightWrist.y;
      console.log("rightwristX = "+ rightwristX + "rightwristY = "+ rightwristY);
  }

}

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function draw(){
    image(video,0,0,600,500);
    songplay = song1.isPlaying();
    console.log("Song status = "+ songplay);
    fill("FF000");
    stroke("FF000")
   
    if (score_leftwrist > 0.2) {
        circle(leftwristX,leftwristY,20);
        song2.stop();

     if (songplay = false) {
            song1.play();
            document.getElementById("play").innerHTML = "song1";
        }
    }
}

function playthesong(){
    song1.play();
}
