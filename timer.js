var defaults = {
    length: 600000,
    decrement: true,
    interval: 1000,
    callback: null
};

var timer = {

    create: function(options) {
        var intervalId, opts = defaults,
            currentTime, tickFn, startFn = function() {
                intervalId = setInterval(tickFn, opts.interval);
            }, stopFn = function() {
                if (intervalId)
                    clearInterval(intervalId);            
            }, resetFn = function() {
                stopFn();
                currentTime = opts.length;    
            }, statusFn = function() {
                return {
                    running: intervalId ? 1:0,
                    time: currentTime
                }
            };
            
        for (var setting in options) {
            opts[setting] = options[setting];
        }
        currentTime = opts.length;
        tickFn = function() { 
            currentTime += (opts.decrement ? -1:1) * opts.interval;
            if (typeof opts.callback == 'function') 
                opts.callback(currentTime);
            if (currentTime <= 0)
                stopFn();           
        };
        
        return {
            start: startFn,
            stop: stopFn,
            reset: resetFn,
            status: statusFn
        };
    }   
};

exports.create = timer.create;