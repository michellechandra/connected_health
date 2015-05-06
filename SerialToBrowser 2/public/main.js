window.onload = function onLoad() {
    
    circle = new ProgressBar.Circle('#progress', {
        color: '#674172',
        duration: 300,
   	    strokeWidth: 3,
        trailWidth: 1,
        easing: 'easeInOut'
    });

    circleIndoor = new ProgressBar.Circle('#progressIndoor', {
        color: '#1BA29B',
        duration: 300,
   	    strokeWidth: 3,
        trailWidth: 1,
        easing: 'easeInOut'
    });

    //circle.animate(1, function() {
        //circle.setText(second);
    //});
    //circleIndoor.animate(1);
};

var circle;
var circleIndoor;

function updateIndoorRating(number) {
    circle.animate(number, function() {
        //console.log('here');
        document.getElementById('thingy').innerHTML = number;
    });
}

function updateOutdoorRating(number) {
circleIndoor.animate(number, function(){
        //circleIndoor.setText(number);
        document.getElementById('thing').innerHTML = number;
    });
}