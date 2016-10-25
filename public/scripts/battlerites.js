var champion = $('select option:selected').text();
    getBattlerites(champion);
    getAbilities(champion);
    $('select').on('change', function(e) {
        champion = $('select option:selected').text();
        getBattlerites(champion);
        getAbilities(champion);
    })

    function getBattlerites(champion) {
        var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var path = loc + "/api/champions/" + champion + "/battlerites";
        httpGetAsync(path, function(data) {
            $.each(JSON.parse(data), function(i, br) {
                $("#" + br.tier + " .br-title").text(br.name);
                $("#" + br.tier + " .br-desc").text(br.desc);
                $("#" + br.tier + " .br-type").text(br.type);
                $("#" + br.tier + " .br-img").attr("src", br.portrait_url);
            })
        })
    }

    function getAbilities(champion) {
        var loc = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
        var path = loc + "/api/champions/" + champion + "/abilities";
        httpGetAsync(path, function(data) {
            $.each(JSON.parse(data), function(i, ab) {
                console.log(ab);
                $("#" + ab.key_binding + " .ab-title").text(ab.name);
                $("#" + ab.key_binding + " .ab-desc").text(ab.desc);
                $("#" + ab.key_binding + " .ab-type").text(ab.type);
                $("#" + ab.key_binding + " .ab-cooldown").text(ab.cooldown);
                $("#" + ab.key_binding + " .ab-img").attr("src", ab.portrait_url);
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

    function httpPostAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("POST", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }