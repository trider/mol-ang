
Parse.initialize("cumLBO8rBloI9peNr7TuU2q6TOJdqL7mMz5faNFi", "YSfUfo6hXUwYPbPelzhO1v78i7C4pBv1RTFVSWJW");

$(document).ready(function ()
{

    L_PREFER_CANVAS = true;
    L_DISABLE_3D = true;

    var Note = Parse.Object.extend("NoteObject");

    setMapSize();
    var marker;
    var timer;
    var map;
    var rides;
    var interval = 60;
    var count = 0;
    var val;


    $('#map, #ctrls, #btnStart, #btnStop, #btnShow, #btnHide, #txt, #aboutPage, #settings').hide();
    $('#maps').show();


    $('#bar').val(1);
    $('#slider').slider().on('slide', function (ev)
    {
        $('#bar').val(ev.value);
    });

    $(".ride").click(function ()
    {
        $("#prependedRide").val(this.id);
    });

    $(".day").click(function ()
    {
        $("#prependedDay").val(this.id);
    });

    $("#btnChoose").click(function ()
    {
        $('#maps').hide();
        $('#map, #ctrls, #btnStart, #btnShow').show();
        val = $('#prependedRide').val() + '_' + $('#prependedDay').val();
        $.get('ride_data.csv', function (csv)
        {
            var rides = $.csv.toObjects(csv);
            $.each(rides, function (i, json)
            {
                
                if (json.name === val)
                {
                    map = createMap(map, json);
                }
            });
        });
    });

    $("#btnAbout").click(function ()
    {
        $('#maps').hide();
        $('#aboutPage, #aboutTxt').show();
        $('#donateTxt').hide();
    });

    $("#btnDonate").click(function ()
    {
        $('#maps').hide();
        $('#aboutPage, #donateTxt').show();
        $('#aboutTxt').hide();
    });

    $("#btnBack").click(function ()
    {
        $('#aboutPage, #aboutTxt, #donateTxt').hide();
        $('#maps').show();
    });


    $("#btnChange").click(function ()
    {
        location.reload();
    });


    $("#btnShow").click(function ()
    {
        $("#txt, #btnHide").show();
        $("#map, #btnShow, .controls-row").hide();

    });
    $("#btnHide").click(function ()
    {
        $("#txt, #btnHide").hide();
        $("#map, #btnShow, .controls-row").show();
    });
    $("#btnSettings").click(function ()
    {
        $("#settings, #btnClose").show();
        $("#map, #btnShow, .controls-row, #counter, #counter2").hide();
    });
    $("#btnSet").click(function ()
    {
        $("#settings, #btnClose").hide();
        interval = $('#bar').val() * 60;
        $("#map, #btnShow, .controls-row, #counter, #counter2").show();
    });


    $("#btnStart").click(function ()
    {

        $('#btnStart').hide();
        $('#btnStop').show();
        var prevLatLng;


        timer = $.timer(function ()
        {
            count++;
            $('#counter').html('<b>Elapsed time:</b> ' + getTime(count));
            if (count % interval == 0 || count == 1)
            {
                console.log(count);
                map.on("locationfound", function (location)
                {
                    if (!marker)
                        marker = L.userMarker(location.latlng, { pulsing: true, accuracy: 500, smallIcon: true
                        }).addTo(map);
                    marker.setLatLng(location.latlng);
                    marker.setAccuracy(location.accuracy);
                    marker.addTo(map);

                    if (location.latlng != prevLatLng)
                    {
                        var note = new Note();
                        var point = new Parse.GeoPoint({ latitude: location.latlng.lat, longitude: location.latlng.lng });
                        note.save({ count: count, title: val, body: 'tracker', location: point },
                        {
                            success: function (note)
                            {
                                $('#counter2').html('Saved the object at: ' + getTime(count));
                                //getLine(Note, map, val);
                            },
                            error: function (note, error)
                            {
                                $('#counter2').html('Could not save object at: ' + getTime(count));
                            }
                        });

                        prevLatLng = location.latlng;
                    }

                });

                var zm = map.getZoom();
                map.locate({ watch: false,
                    locate: true, setView: true, enableHighAccuracy: true,
                    maxZoom: zm, maximumAge: 10000, timeout: 10000
                });

            }

        });
        timer.set({ time: 1000, autostart: true });
    });

    $("#btnStop").click(function ()
    {
        $('#counter, #counter2').html('<br>');
        $('#btnStop').hide();
        $('#btnStart').show();
        timer.stop();
    });

});

function SavePosition(val, count, txt, latlng, Note)
{
    
    var note = new Note();
    var point = new Parse.GeoPoint({latitude: latlng.lat, longitude: latlng.lng});
    note.save({
            count: count,
            title:val, 
            body:txt,
            location:point }, 
        {
        success:function(note) {
            $('#counter2').html('Saved the object at: ' + count + ' seconds');
            console.log("Saved the object!");
        }, 
        error:function(note,error) {
            $('#counter2').html('Sorry, I could not save it: ');
           
        }
    });        
  
}

function getLine(NoteObject, map, val) {
    
    var latlng = new Array;
    var query = new Parse.Query(NoteObject);
    query.equalTo("title", val);

    query.find({
        success: function (results)
        {
           
            for (var i = 0, len = results.length; i < len; i++)
            {
                var note = results[i];
                var point = new L.LatLng(note.attributes.location.latitude, note.attributes.location.longitude);
                latlng.push(point);
            }

            query.count({
            success: function(count) {
               if(count>1)
               {
                   var polyline = L.polyline(latlng, { color: 'red', smoothFactor: 2.0, "weight": 5,
                        "opacity": 0.65 }).addTo(map);
                    map.fitBounds(polyline.getBounds());
               }
            }
        }); 
             
        },
        error: function (note, error)
        {
            console.log(error.description);
        }
    });
  }
  

function createMap(map, json)
{
    
    var map = new L.map('map', 
    {
        center: [json.lng, json.lat],
        zoom: 13
    });

    var osmTile = "";
    var osmCopyright = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap contributors</a>';
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/"></a>CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>'; 
    var osmLayer = new L.TileLayer(osmTile, { maxZoom: 17, attribution: osmCopyright });  
    map.addLayer(osmLayer);
    //addLocateControl(map);
    showElevation(map, json.gpx_file);
    //$.get(json.html_file, function (data){$("#txt").html(data)});
    return map;
}

function addPath(map,path)
{
    new L.GPX(path, {
        async: true,
        marker_options: {
            startIconUrl: 'pin-icon-start.png',
            endIconUrl: 'pin-icon-end.png',
            shadowUrl: 'pin-shadow.png'
        }
    }).on('loaded', function (e)
    {
        getTitle(e)
    }).addTo(map);

}

function addLocateControl(map)
{
    
    L.control.locate({
        position: 'topleft',  
        drawCircle: true,  
        metric: true,  
        setView: true,
        maxZoom: 16, 
        strings: {
            title: "Show me where I am",  
            popup: "You are within {distance} {unit} from this point",  
            outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
        }
    }).addTo(map);
}

function showElevation(map, path)
{
    
    var el = L.control.elevation({
        position: "topright",
        theme: "lime-theme", 
        width: 125,
        height: 100,
        margins: { top: 10, right: 10, bottom: 20, left: 10 },
        useHeightIndicator: true, 
        interpolation: "linear", 
        hoverNumber: { decimalsX: 3, decimalsY: 0 },
        xTicks: undefined,
        yTicks: undefined
    });

    var g=new L.GPX(path, {async: true});
    g.on("addline", function (e)
    {
        getTitle(e);
        el.addData(e.line);
    });
    g.addTo(map);
    el.addTo(map);

}

function getTitle(e)
{
    $('.brand').text(e.target.get_name() + ' ('
            + Math.round(e.target.get_distance() / 1000) + 'km)');
}

function addPopup(latlng, map)
{
  var popup = L.popup();
    popup
        .setLatLng(latlng)
        .setContent(latlng.toString())
        .openOn(map);
    var ltlng = latlng.toString();
    var marker = L.marker(latlng).addTo(map); 
}


function setMapSize(){
    var res =  screen.availHeight;
          
    if(res <= 320){
      $("#map").height('150');
    }
    else if(res > 320 && res < 400){
      $("#map").height('175');
    } 
    else if(res >= 400 && res < 480 ){
      $("#map").height('200');
    }
    else if(res >= 480 && res < 540 ){
      $("#map").height('300');
    }
    else if(res > 540 ){
      $("#map").height('400');
    }
     
}

function getTime(count)
{ 
    var sec_num = parseInt(count, 10); // don't forget the second parm
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}

function connExists() {
    
    var networkState = navigator.network.connection.type;

    if (networkState == 'unkown' || networkState == 'none')
    {
        return false;
    }
    else
    {
       return true;
    }
          
        
}