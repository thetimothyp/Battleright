$(document).ready(function() {
    var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#ch" + next;
        next = next + 1;
        var newIn = '<hr><li class="chapter" id="ch'+next+'"><form action="/preview" method="post" id="chapter'+name+'">Chapter Title: <input type="text" name="title"><br><br><textarea rows="10" cols="50" name="content" style="width: 100%;"></textarea></form></li>';
        var newInput = $(newIn);
        $(addto).after(newInput);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
    })
});