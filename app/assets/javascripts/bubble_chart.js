
/*
 * TODO

 * x axis not replotting
 * animation broken, because can't distinguish between first plot and subsequent
 * we are now calling update when click the button
 * then it goes to show
 * we should just pass a stateful var that knows first plot or not, and have javascript conditionalize off of that.
 * 'show' should make web service call
 */
padding=80;
var h = 400;
var w = 700;
var svg;
var dataset_index = 0;
var x_axis = d3.svg.axis();
var y_axis = d3.svg.axis();
var circles;
initialized = false;

function init(dataset){

    if (!initialized){
        initialized=true;
        create_svg()
        draw_init(dataset)
    }
    else{
        redraw(dataset)
    }
}

function create_svg(){
    svg = d3.select("body")
        .append("svg")
        .attr("width", w  )
        .attr("height", h  );
}

function redraw(dataset){
    $( "#dataset_display" ).text( dataset_index )
    // set the x scale between the width of the svg minus padding
    var x_scale = x_scale_fcn(dataset);
    // now y
    var y_scale = y_scale_fcn(dataset);

    //set the size of the area of the circles to a scale between 10 and 75
    var size_scale = size_scale_fcn(dataset);

    circles = svg.selectAll("circle")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr({
            "cx":function(d) {
                return x_scale(d[0]);  //Returns scaled value
            },
            "cy":function(d) {
                return y_scale(d[1]);  //Returns scaled value
            },
            "r":function (d){
                area = Math.sqrt(d[1]/3.14)
                return size_scale(area);
            }
        })

    //create the circles to get larger for y value, and place them along x axis based on x value,
    // and along y axis based on y value

    // create some text and label the circles with the value from the dataset
    var text_boxes=	svg.selectAll("text")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr({

            "x":function(d) {
                return x_scale(d[0]);  //Returns scaled value
            },
            "y":function(d) {
                return y_scale(d[1]);  //Returns scaled value
            }
        })
        .text(function (d,i){
            return (d[0] + "," + d[1])
        });

    var x = d3.select(".xAxis")
        .transition()
        .duration(1000)
        .call(x_axis)
        .attr("transform", "translate(0," + (h/2) + ")");

    /*
     var x_axis = d3.svg.axis();
     x_axis.scale(x_scale);
     svg
     .append("g")
     .attr("class","xAxis")
     .call(x_axis)
     .attr("transform", "translate(0," + (h - padding) + ")")


     set_x_axis(x_scale, h, padding, svg);
     */
    set_y_axis(y_scale, h, padding, svg);
}


function draw_init(dataset){

    //document.getElementById('dataset_display').innerHTML= "asfd"

    $( "#dataset_display" ).text( dataset_index )

    //append one circle for each sub-array
    circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");

    // set the x scale between the width of the svg minus padding
    var x_scale = x_scale_fcn(dataset);
    // now y
    var y_scale = y_scale_fcn(dataset);

    //set the size of the area of the circles to a scale between 10 and 75
    var size_scale = size_scale_fcn(dataset);

    //create the circles to get larger for y value, and place them along x axis based on x value,
    // and along y axis based on y value
    circles
        .attr({
        "r":
            function (d){
                area = Math.sqrt(d[1]/3.14)
                return size_scale(area);
            },
        "fill":"rgba(20,128,117,.5)",
        "cx":function(d) {
            return x_scale(d[0]);  //Returns scaled value
        },
        "cy":function(d) {
            return y_scale(d[1]);  //Returns scaled value
        }
    })

    // create some text and label the circles with the value from the dataset
    var text_boxes=	svg.selectAll("text")
        .data(dataset)
        .enter()

        .append("text")
        .text(function (d,i){
            return (d[0] + "," + d[1])
        });

    text_boxes
        .attr({

        "x":function(d) {
            return x_scale(d[0]);  //Returns scaled value
        },
        "y":function(d) {
            return y_scale(d[1]);  //Returns scaled value
        },
        "text-anchor":"middle"
    });
    set_x_axis(x_scale, h, padding, svg);
    set_y_axis(y_scale, h, padding, svg);
}



