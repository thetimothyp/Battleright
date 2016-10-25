var champion = $('select option:selected').text();
    getBattlerites(champion);
    $('select').on('change', function(e) {
        champion = $('select option:selected').text();
        getBattlerites(champion);
    })

    function getBattlerites(champion) {
        var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var path = loc + "/api/champions/" + champion + "/battlerites";
        httpGetAsync(path, function(data) {
            $.each(JSON.parse(data), function(i, br) {
                console.log(br);
                $("#" + br.tier + " .br-title").text(br.name);
                $("#" + br.tier + " .br-desc").text(br.desc);
                $("#" + br.tier + " .br-type").text(br.type);
                $("#" + br.tier + " .br-img").attr("src", br.portrait_url);
            })
        })
    }

    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }