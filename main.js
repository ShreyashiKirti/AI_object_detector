object=[];
status='';

function preload(){

}

function setup(){
canvas= createCanvas(500,300);
video=createCapture(VIDEO);
video.hide();
}

function start(){
objectDetector= ml5.objectDetector('cocossd', modelLoaded);
document.getElementById('status').innerHTML='Status: Detecting Objects';
object_name=document.getElementById('object_name').value;
}

function modelLoaded(){
console.log('Model is loaded');
status=true;

}

function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
object=results;
}

function draw(){
image(video,0,0,500,300);
if(status!=''){
objectDetector.detect(video,gotResults);
document.getElementById('status').innerHTML='Status: Objects detected';

for(i=0;i<object.length;i++){
fill('black');
percent=floor(object[i].confidence*100);
text(object[i].label+' '+percent+'%',object[i].x+17,object[i].y+17);
noFill();
stroke('black');
rect(object[i].x,object[i].y,object[i].width,object[i].height);

if(object[i].label==object_name){
    video.stop();
    objectDetector.detect(gotResults);
document.getElementById('object_status').innerHTML=object_name+'Found';
synth=window.speechSynthesis;
utterThis=new SpeechSynthesisUtterance(object_name+'Found');
synth.speak(utterThis);
}
else{
document.getElementById('object_status').innerHTML=object_name+'Not found';
}
}
}
}