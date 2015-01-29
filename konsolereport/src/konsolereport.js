this.kr = this.kr || {};
/**
 * @author Sandro Ducceschi [eatcodeplay.ch, Switzerland]
 */
(function() {
    'use strict';
    //---------------------------------------------------
    //
    //  Constructor / Initialization
    //
    //---------------------------------------------------
    var KonsoleReport = function() {
        throw 'kr.KonsoleReport cannot be instantiated';
    };
    var p = KonsoleReport.prototype = {};

    p.init = function()
    {
        $(document).ready(function(){

            // retrieve the templates and kill them afterwards
            p._template = $('.template.entry').html();
            $('.templates').remove();

            var $h2 = $('h2');
            $h2.on('click', function(){
                $(this).attr('contenteditable', true);
                $(this).focus();
            });
            $h2.on('keydown', function(evt){
                if (evt.keyCode == 13) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    p._loadData($(this).text(), function(data){
                        p._updateEntries(data);
                    });
                }
            });

            p._loadData(null, function(data){
                p._updateEntries(data);
            });
        });
    };

    //---------------------------------------------------
    //
    //  Variables
    //
    //---------------------------------------------------
    p._template = null;
    //---------------------------------------------------
    //
    //  Private Methods
    //
    //---------------------------------------------------

    p._loadData = function(date, onSuccess)
    {
        var now = new Date(),
            day = p._zerofy(now.getDate()),
            month = p._zerofy(now.getMonth()+ 1),
            year = now.getFullYear();
        
        date = date || year+''+month+''+day;
        if (date.indexOf('.') != -1) {
            var dateText = date.split('.');
            day = dateText[0];
            month = dateText[1];
            year = dateText[2];
            date = dateText.reverse().join('');
        }
        var xhrReq = $.get('./log.php?d='+date, function(data) {
            if (!p._isEmpty(data))
                onSuccess(data);
        }, 'json').error(function() {
            console.error(xhrReq, this.url);
        });
    };

    p._updateEntries = function(entries)
    {
        var out = '', n = entries.length;
        for (var i = 0; i < n; i++) {
            var data = p._processEntry(entries[i]);
            out += Mustache.to_html(p._template, data);
        }
        if (n > 0)
            $('h2').text(p._getDate(entries[0].time));
        $('.entries').html(out);
        $('.entry').off('click').on('click', function(){
            $('.entry .full').hide();
            $(this).find('.full').show();
        });
    };

    p._processEntry = function(entry)
    {
        var data = {
            time: (entry.hasOwnProperty('time')) ? p._getTime(entry.time) : '--:--:--',
            type: (entry.hasOwnProperty('type')) ? entry.type : 'log',
            msg: (entry.hasOwnProperty('msg')) ? entry.msg : '--',
            callee: (entry.hasOwnProperty('callee')) ? entry.callee : '',
            full: []
        };
        data = p._processEntryObjects(entry, data);
        return data;
    };

    p._processEntryObjects = function(entry, data)
    {
        for (var prop in entry) {
            if (prop != 'type' && prop != 'callee' && prop != 'time' && prop != 'msg') {
                if (entry.hasOwnProperty(prop) && typeof entry[prop] === 'object') {
                    var innerData = {isObject: true, name: prop, properties: []};
                    for (var innerProp in entry[prop]){
                        if (entry[prop].hasOwnProperty(innerProp))
                            innerData.properties.push({name: innerProp, value: entry[prop][innerProp]});
                    }
                    data.full.push(innerData);
                }
                else {
                    data.full.push({isObject: false, name: prop, value: entry[prop]});
                }
            }
        }
        return data;
    };

    //----------------------------------
    // Helper Methods
    //----------------------------------

    p._isEmpty = function(value){
        return !!(typeof value === 'undefined' || value == null || (typeof value === 'string' && value == ''));
    };

    p._zerofy = function(num)
    {
        return (num < 10) ? '0'+num : num;
    };

    p._getTime = function(unix_timestamp)
    {
        var time = new Date(unix_timestamp * 1000),
            h = p._zerofy(time.getHours()),
            m = p._zerofy(time.getMinutes()),
            s = p._zerofy(time.getSeconds());
        return h + ':' + m + ':' + s;
    };

    p._getDate = function(unix_timestamp)
    {
        var time = new Date(unix_timestamp * 1000),
            y = p._zerofy(time.getFullYear()),
            m = p._zerofy((time.getMonth()+1)),
            d = p._zerofy(time.getDate());
        return d + '.' + m + '.' + y;
    }

    //---------------------------------------------------
    // Namespace Assignment
    //---------------------------------------------------
    kr.KonsoleReport = KonsoleReport;
    p.init(); // self-invoking
}());