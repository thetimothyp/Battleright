$(document).ready(function() {
    if (i) {
        var next = i;
    } else {
        var next = 0;
    }
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#ch" + next;
        next = next + 1;
        var newIn = '<hr><div id="ch'+next+'">Chapter Title: <input type="text" name="ch_title"><br><br><textarea rows="10" cols="50" name="ch_body" style="width: 100%;"></textarea></div>';
        var newInput = $(newIn);
        $(addto).after(newInput);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
    })
});