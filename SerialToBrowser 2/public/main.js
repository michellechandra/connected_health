window.onload = function onLoad() {
    
    var circle = new ProgressBar.Circle('#progress', {
        color: '#674172',
        duration: 3000,
   	    strokeWidth: 3,
        trailWidth: 1,
        easing: 'easeInOut'
    });

    var circleIndoor = new ProgressBar.Circle('#progressIndoor', {
        color: '#1BA29B',
        duration: 3000,
   	    strokeWidth: 3,
        trailWidth: 1,
        easing: 'easeInOut'
    });

    circle.animate(1);
    circleIndoor.animate(1);
};