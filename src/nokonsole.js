(function() 
{
    //---------------------------------------------------
    //
    //  Constructor / Initialization
    //
    //---------------------------------------------------
    
    var Konsole = { version: "1.2.0" },
    p = Konsole.prototype = {};
    //---------------------------------------------------
    //
    //  Variables / Private Properties
    //
    //---------------------------------------------------

    //---------------------------------------------------
    //
    //  Public Properties
    //
    //---------------------------------------------------
    Konsole.key = '§';
    Konsole.originalEnabled = false;
    Konsole.visibile = false;
    Konsole.enabled = false;
    Konsole.maxLogDepth = 0;
    Konsole.snap = 'top';
    Konsole.reportingEnabled = false;
    Konsole.reportingUrl = './konsolereport/log.php';
    Konsole.showErrors = false;
    Konsole.takeOver = false;
    //---------------------------------------------------
    //
    //  API / Public Methods
    //
    //---------------------------------------------------

    Konsole.log = function(v){if (typeof _console != 'undefined'){_console.log(v);}};
    Konsole.info = function(v){if (typeof _console != 'undefined'){_console.info(v);}};
    Konsole.event = function(v){if (typeof _console != 'undefined'){_console.log(v);}};
    Konsole.error = function(v){if (typeof _console != 'undefined'){_console.error(v);}};
    Konsole.warn = function(v){if (typeof _console != 'undefined'){_console.warn(v);}};
    Konsole.system = function(v){if (typeof _console != 'undefined'){_console.log(v);}};

    Konsole.observe = function(m,n){};
    Konsole.monitor = function(v,n){};

    Konsole.sep = function(){if (typeof _console != 'undefined'){_console.log('――――――――――――――――――――');}};
    Konsole.separator = function(){if (typeof _console != 'undefined'){_console.log('――――――――――――――――――――');}};

    Konsole.show = function(){};
    Konsole.hide = function(){};
    Konsole.clear = function(){if (typeof _console != 'undefined'){_console.clear();}};
    Konsole.resize = function(prcent){};
    Konsole.createCommand = function(n,f){};
    Konsole.getStackLine = function(i){};
    Konsole.report = function(data) {
        if (Konsole.reportingEnabled) {
            try {
                data = data || {};
                data.client = {'agent': navigator.userAgent, 'language': navigator.language || navigator.userLanguage, 'platform': navigator.platform, 'version': navigator.appVersion};
                $.post(Konsole.reportingUrl, {'data': JSON.stringify(data)}, null, 'json');
            } catch (err){}
        }
    };

    //---------------------------------------------------
    //
    //  Private Methods
    //
    //---------------------------------------------------

    //---------------------------------------------------
    //
    //  Event Handling
    //
    //---------------------------------------------------

    //---------------------------------------------------
    // init
    //---------------------------------------------------
    if (typeof window.console != 'undefined')
    {
        window._console = window.console;
        window.console = Konsole;
    }
    if (typeof window.console == 'undefined')
        window.console = Konsole;
}());