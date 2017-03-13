/**
 * Created by azad on 2017-03-12.
 */
$(document).ready(function () {
    // get_collections();
    $("#search_btn").click(search_click);

    // For handling Enter key

    $('#title').keypress(function(e){
      if(e.keyCode==13)
      $('#search_btn').click();
    });
});

function divMaker (thumb_path,classname,full_path) {
    var tag_a = $(document.createElement("a"));
    if(full_path !== ''){
        tag_a.attr('href',full_path);
        tag_a.attr('target','blank');
    }
    var img = $(document.createElement("img"));
    img.attr('src', thumb_path);
    img.addClass(' center-block');
    var div = $(document.createElement("div"));
    div.addClass('panel panel-success ');
    tag_a.append(img);
    div.append(tag_a);
    var div1 = $(document.createElement("div"));
    div1.addClass(classname);
    div1.append(div);
    console.log(div1);
    return div1;
}
function search_click() {
        $("#results").empty();
        var filter_type = $("#filter-type").val();
        var url = "https://api.unsplash.com";
        var client_id = '85a1a366e1b9993d8d9db5908f887c3c84f242ec61cfea7d8fe86fdf7ec805db';
        var filter_value = $("#title").val();
        var category = $("#category").val();
        $.ajax(
            {
                url: url + "/" + filter_type + "/" + filter_value + "/photos/",
                method: "GET",
                data: {
                    'client_id': client_id,
                    'page': 1,
                    'per_page': 20,
                },
                success: render_results,

                error: function (data) {
                    if (data.status == 404) {
                        path = window.location.pathname.split('/');
                        path.pop();
                        path.push('img','404.png');
                        path = path.join('/'); 
                        $("#results").append(divMaker(path,'col-md-12',''));
                    }
                    // in the case of limited request is happening
                    else if(data.status == 403){
                        $("#results").html("<h1>Your 50 limitation of requests is finished. Pleas try in next hour!</h1>")
                    }
                    else{
                        console.log(data);
                    }
                }
            });
}
function render_results(data){
    console.log(data);
    if(data.length) {
        data.forEach(function (obj) {
            $("#results").append(divMaker(obj.urls.thumb,'col-md-3',obj.urls.full));
        });
    }
    else{
        path = window.location.pathname.split('/');
        path.pop();
        path.push('img','No_image_available.png');
        path = path.join('/'); 
        $("#results").append(divMaker(path,'col-md-12','' ));
    }
}

function get_collections(){
    var url = "https://api.unsplash.com";
        var client_id = '85a1a366e1b9993d8d9db5908f887c3c84f242ec61cfea7d8fe86fdf7ec805db';
        $.ajax(
            {
                url: url + "/collections/",
                method: "GET",
                data: {
                    'client_id': client_id,
                    'page': 1,
                    'per_page': 10,
                },
                success: function(data){
                    var ul = $(document.createElement("ul"));
                    data.forEach(function(collection){
                        console.log(collection)
                        ul.append("<li>"+collection.id+"</li>");
                    })
                    $("#results").append(ul);
                },
                error: function (data) {
                    console.log(data);
                }
            });
}