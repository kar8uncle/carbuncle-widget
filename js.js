jQuery(function($) {
    let animations = ['raise-hands', 'flap-ears', 'turn-around', 'open-mouth', 'compress', 'dance-open-mouth', 'swing-butt', 'dance', 'yawn', 'lick', 'sleep', 'doze-off', 'kick', 'walk-right'];
    // animations = ['walk-right'];
    let animationBehaviors = {
    };

    let maxDelayMs = 4e3;
    let $carby = $('.carby');

    (function animate() {
        let animation = animations[Math.floor(animations.length * Math.random())];
        $carby.addClass(animation)
              .one('animationend', function() {
                  $(this).removeClass(animation);
                  this.offsetWidth;
                  setTimeout(animate, Math.floor(maxDelayMs * Math.random()));
              });
        (animationBehaviors[animation] || function(){})();
    })();
});
