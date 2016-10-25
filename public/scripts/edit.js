$(document).ready(function() {
    if (i) {
        var next = i;
    } else {
        var next = 0;
    }
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#ch" + next;
        var addRemove = "#ch" + (next);
        next = next + 1;
        var newIn = '<hr id="hr'+next+'"><div id="ch'+next+'">Chapter Title: <input type="text" name="ch_title"><br><br><textarea rows="10" cols="50" name="ch_body" style="width: 100%;"></textarea>';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me">Remove Chapter</button></div><div id="ch">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));

        $('.remove-me').click(function(e){
            e.preventDefault();
            var fieldNum = this.id.charAt(this.id.length-1);
            var fieldID = "#ch" + fieldNum;
            var HRID = "#hr" + fieldNum;
            $(this).remove();
            $(fieldID).remove();
            $(HRID).remove();
        });
    })
});