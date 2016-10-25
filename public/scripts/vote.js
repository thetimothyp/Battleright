function attachVoteHandlers(champion, id) {
    $('.upvote').on('click', function(e) {
        var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var path = loc + "/guides/"+champion+"/"+id+"/upvote";
        httpPostAsync(path, function() {
            console.log('hi');
        });
        this.disabled = true;
        $('.downvote').prop('disabled', true);
    });

    $('.downvote').on('click', function(e) {
        var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var path = loc + "/guides/"+champion+"/"+id+"/downvote";
        httpPostAsync(path, function() {
            console.log('hi');
        });
        this.disabled = true;
        $('.upvote').prop('disabled', true);
    })
}