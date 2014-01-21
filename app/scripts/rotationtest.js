// $( document ).ready(function() {
//     $("#slider").slider();
// });


// alert("hid")
// var dragging = false;

// $(function() {
//     var target = $('#target')
//     target.mousedown(function() {
//         dragging = true;
//     })
//     $(document).mouseup(function() {
//         dragging = false;
//     })
//     $(document).mousemove(function(e) {
//         if (dragging) {
//             var mouse_x = e.pageX;
//             var mouse_y = e.pageY;
//             var radians = Math.atan2(mouse_x - 10, mouse_y - 10);
//             var degree = (radians * (180 / Math.PI) * -1) + 90;
//             target.css('-moz-transform', 'rotate(' + degree + 'deg)');
//             target.css('-webkit-transform', 'rotate(' + degree + 'deg)');
//             target.css('-o-transform', 'rotate(' + degree + 'deg)');
//             target.css('-ms-transform', 'rotate(' + degree + 'deg)');
//         }
//     });
// });

var target = $("#target");
var testMenuItemWidthHalf = 52.0/2;
var fillMe = $("#fillMe");
var blueDot = $("#blueDot");
var rotationAmount;
var blueDotPosition;
var marginTopVal, marginLeftVal;
var actualRotAm;
setInterval(function() {
    roationAmount = getRotationDegrees(target);
    blueDotPosition = calculateConnectorPlacement(roationAmount, 0);

    marginTopVal = testMenuItemWidthHalf + blueDotPosition.y;
    marginLeftVal = testMenuItemWidthHalf + blueDotPosition.x;
    blueDot.css({
        'margin-left': blueDotPosition.x + "px",
        'margin-top': blueDotPosition.y + "px"
    });
    
    if($("#amount").val().match(/\d*/)[0].length > 0) {
        actualRotAm = -1 * parseInt($("#amount").val().match(/\d*/)[0]);
        // actualRotAm = 0;
    }
    else {
        actualRotAm = 0;
    }
    $(".gridBox").css({
        "-webkit-transform": "rotate(" + actualRotAm + "deg)"
    });

    fillMe.val(blueDotPosition.x.toFixed(2) + "px\n" + blueDotPosition.y.toFixed(2) + "px");
    // fillMe.val($.type(marginTopVal));
    // Now we're going to send this to 
}, 1);



function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle +=360 : angle;
}







setTimeout(function() {
 $(function() {
    $( "#slider" ).slider({
      range: "max",
      // min: 0,
      // max: 359,
      min: 250,
      max: 380,      
      value: 1,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
      }
    });
    $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
  });
  $( "#slider" ).css({
    "width": "200px",
    "margin-left": "20px"
  });

}, 1000);