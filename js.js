jQuery(function($) {

    Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };

    // a list of available css animations
    let animations = ['raise-hands', 
                      'flap-ears', 
                      'turn-around', 
                      'open-mouth', 
                      'compress', 'compress-stretch', 
                      'dance-open-mouth-fast', 'dance-open-mouth-slow',
                      'swing-butt', 
                      'dance', 
                      'yawn',
                      'lick',
                      'sleep',
                      'doze-off',
                      'kick-right', 'kick-left',
                      'walk-right', 'walk-left', 
                      'slide-right', 'slide-left',
                      'stretch-legs',
                      'squat',
                      'low-jump', 'high-jump',
                     ];

    // defines extra mutating animations(e.g. translations) that plays with the css animations
    let animationBehaviors = (function() {
        let maxX = 0;
        let maxY = 0;

        let updateMaxX = function(tween) {
            if (tween.elem.getBoundingClientRect().right <= window.innerWidth) {
                maxX = Math.max(0, Math.floor(tween.now));
            }
        };
        let updateMaxY = function(tween) {
            if (tween.elem.getBoundingClientRect().height <= window.innerHeight) {
                maxY = Math.max(0, Math.floor(tween.now));
            }
        };
        return {
            'walk-right': function($carby) {
                $carby
                    .delay(0.15e3)
                    .animate({ 'left' : '+=16em' },
                             { 'duration' : 1.5e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : function(left, tween) {
                                                updateMaxX(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxX));
                                            }
                             });
            }, 'walk-left': function($carby) {
                $carby
                    .delay(0.15e3)
                    .animate({ 'left' : '-=16em' },
                             { 'duration' : 1.5e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : function(left, tween) {
                                                updateMaxX(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxX));
                                            }
                             });
            }, 'slide-right': function($carby) {
                $carby
                    .delay(0.15e3)
                    .animate({ 'left' : '+=18em' },
                             { 'duration' : 1.8e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : function(left, tween) {
                                                updateMaxX(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxX) / 4) * 4;
                                            }
                             });
            }, 'slide-left': function($carby) {
                $carby
                    .delay(0.15e3)
                    .animate({ 'left' : '-=18em' },
                             { 'duration' : 1.8e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : function(left, tween) {
                                                updateMaxX(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxX) / 4) * 4;
                                            }
                             });
            }, 'high-jump': function($carby) {
                $carby
                    .delay(0.375e3)
                    .animate({ 'top' : '-=64em' },
                             { 'duration' : 0.45e3,
                               'easing'   : 'easeOutSine',
                               'step'     : function(top, tween) {
                                                updateMaxY(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxY));
                                            }
                             })
                    .animate({ 'top' : '+=64em' },
                             { 'duration' : 0.45e3,
                               'easing'   : 'easeInSine',
                               'step'     : function(top, tween) {
                                                updateMaxY(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxY));
                                            }
                             });
            }, 'low-jump': function($carby) {
                $carby
                    .delay(0.9e3)
                    .animate({ 'top' : '-=48em' },
                             { 'duration' : 0.3e3,
                               'easing'   : 'easeOutSine',
                               'step'     : function(top, tween) {
                                                updateMaxY(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxY));
                                            }
                             })
                    .animate({ 'top' : '+=48em' },
                             { 'duration' : 0.3e3,
                               'easing'   : 'easeInSine',
                               'step'     : function(top, tween) {
                                                updateMaxY(tween);
                                                tween.now = Math.floor(tween.now.clamp(0, maxY));
                                            }
                             });
            }
        };
    })();

    let minDelayMs = 0.3e3;
    let maxDelayMs = 4e3;
    let $carbyBox = $('.carby-box');
    let $carby = $('.carby', $carbyBox);

    // spawn Carbuncle to start at random position on the page
    $carbyBox.css({
        'left': Math.random() * ($(document).width() - $carbyBox.width()),
        'top': Math.random() * ($(document).height() - $carbyBox.height()),
    });

    // like an animation thread, by recursion and setTimeout
    (function animate() {
        let animation = animations[Math.floor(animations.length * Math.random())];
        $carby.addClass(animation)
              .one('animationend', function() {
                  $(this).removeClass(animation);
                  this.offsetWidth;
                  setTimeout(animate, minDelayMs + Math.floor((maxDelayMs - minDelayMs) * Math.random()));
              });
        (animationBehaviors[animation] || function() {})($carbyBox);
    })();
});
