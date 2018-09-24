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

    let $carbyBox = $('.carby-box');
    let $carby = $('.carby', $carbyBox);

    // defines extra mutating animations(e.g. translations) that plays with the css animations
    let animationBehaviors = (function() {
        let px2em = function(px) {
            // assuming 'font-size' return a pixel value, e.g. '10px'
            let pxPerEm = + window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
            return px / pxPerEm;
        };

        let stepFn = function(emPerMovement, clampTo) {
            return function(_, tween) {
                tween.now = Math.floor(tween.now.clamp(0, clampTo) / emPerMovement) * emPerMovement;
            };
        };
        let maxX = () => px2em(window.innerWidth - $carbyBox.width());
        let maxY = () => px2em(window.innerHeight - $carbyBox.height());

        return {
            'walk-right': function() {
                $carbyBox
                    .delay(0.15e3)
                    .animate({ 'left' : '+=16em' },
                             { 'duration' : 1.5e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : stepFn(1, maxX()),
                             });
            }, 'walk-left': function() {
                $carbyBox
                    .delay(0.15e3)
                    .animate({ 'left' : '-=16em' },
                             { 'duration' : 1.5e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : stepFn(1, maxX()),
                             });
            }, 'slide-right': function() {
                $carbyBox
                    .delay(0.15e3)
                    .animate({ 'left' : '+=18em' },
                             { 'duration' : 1.8e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : stepFn(4, maxX()),
                             });
            }, 'slide-left': function() {
                $carbyBox
                    .delay(0.15e3)
                    .animate({ 'left' : '-=18em' },
                             { 'duration' : 1.8e3 - 0.15e3,
                               'easing'   : 'linear',
                               'step'     : stepFn(4, maxX()),
                             });
            }, 'high-jump': function() {
                $carbyBox
                    .delay(0.375e3)
                    .animate({ 'top' : '-=' + Math.floor(Math.random() * 100) + 'em' },
                             { 'duration' : 0.45e3,
                               'easing'   : 'easeOutSine',
                               'step'     : stepFn(1, maxY()),
                             })
                    .animate({ 'top' : '+=' + Math.floor(Math.random() * 100) + 'em' },
                             { 'duration' : 0.45e3,
                               'easing'   : 'easeInSine',
                               'step'     : stepFn(1, maxY()),
                             });
            }, 'low-jump': function() {
                $carbyBox
                    .delay(0.9e3)
                    .animate({ 'top' : '-=' + Math.floor(Math.random() * 70) + 'em' },
                             { 'duration' : 0.3e3,
                               'easing'   : 'easeOutSine',
                               'step'     : stepFn(1, maxY()),
                             })
                    .animate({ 'top' : '+=' + Math.floor(Math.random() * 70) + 'em' },
                             { 'duration' : 0.3e3,
                               'easing'   : 'easeInSine',
                               'step'     : stepFn(1, maxY()),
                             });
            }
        };
    })();

    let minDelayMs = 0.3e3;
    let maxDelayMs = 4e3;

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
        (animationBehaviors[animation] || function() {})();
    })();
});
