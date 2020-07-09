$(document).ready(function() {

     let search = document.getElementById("search");
     let submit = document.getElementById("submit");

    submit.addEventListener("click", results);

    function results() {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + search.value,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": apikeyValue,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response)
            displayResults(response)
        })

    } // <--- results


    function displayResults(music) {

        //search results
        for(let i = 0; i < 10; i++) {

            let list = document.getElementById("list");
            if (list.style.display === "none") {
                list.style.display = "block";
            } else {
                list.style.display = "none";
            }

            let results = document.createElement("div");
            results.innerHTML = music.data[i].artist.name + " — " + music.data[i].album.title  + " — " + music.data[i].title;
            results.style.width = "680px"
            list.appendChild(results);
            results.addEventListener("click", load);

            function load() {
                audio.src = music.data[i].preview;
                title.textContent = music.data[i].title + " — " + music.data[i].artist.name;
                $("#album").css({
                    "background-image": "url(" + music.data[i].album.cover_big + ")",
                    "background-size": "100% 100%",
                });
                audio.play();
            }
        }

        //audioplayer
        let audio = new Audio;
        let i = 0;
        audio.src = music.data[i].preview;


        //time update & duration
        audio.addEventListener("timeupdate", function() {

            let current = audio.currentTime;
            let duration = audio.duration;

            function format(s, format) {
                var h  = Math.floor(s / 3600);
                var m = Math.floor((s - (h * 3600))/60);
                var s = Math.floor(s - (h * 3600) -  (m * 60));

                if (m < 10){ 
                  m = "0" + m; 
                }
                if (s < 10){ 
                  s  = "0" + s;
                }

                return m + ':' + s;
              }

            if(isNaN(duration)) {
                time.textContent = '00:00';
            } else
                time.textContent = format(current) + " - " + format(duration);
            });


        //play & pause
        let play = document.getElementById('play')
        let pause = document.getElementById('pause')
        let title = document.getElementById('title')
        let time = document.getElementById('time')

        play.addEventListener("click", playSong)
        pause.addEventListener("click", pauseSong)

        function playSong() {
            audio.play();
        }

        function pauseSong() {
            audio.pause();
        }


        //next & previous
        let forward = document.getElementById('forward')
        let backward = document.getElementById('backward')

        forward.addEventListener("click", next)
        backward.addEventListener("click", previous)
        audio.addEventListener("ended", next)

        function next() {
            i = i + 1
            if (i > music.data.length - 1) {
                i = 0
            }
            audio.src = music.data[i].preview;
            title.textContent = music.data[i].title + " — " + music.data[i].artist.name;
            $("#album").css({
                "background-image": "url(" + music.data[i].album.cover_big + ")",
                "background-size": "100% 100%",
            });
            audio.play();
        }

        function previous() {
            i = i - 1
            if (i < 0) {
                i = music.data.length-1
            }
            audio.src = music.data[i].preview;
            title.textContent = music.data[i].title + " — " + music.data[i].artist.name;
            $("#album").css({
                "background-image": "url(" + music.data[i].album.cover_big + ")",
                "background-size": "100% 100%",
            });
            audio.play();
        }


        //random & shuffle
        let shuffle = document.getElementById('shuffle')
        shuffle.addEventListener("click", randomize)

        function randomize() {
            let random = Math.floor(Math.random() * music.data.length);
            audio.src = music.data[random].preview;
            title.textContent = music.data[random].title + " — " + music.data[random].artist.name;
            $("#album").css({
                "background-image": "url(" + music.data[random].album.cover_big + ")",
                "background-size": "100% 100%",
            });
            audio.play();
        }


        //fast forward & rewind
        let ff = document.getElementById('fastforward')
        let rewind = document.getElementById('rewind')

        fastforward.addEventListener("click", skip)
        rewind.addEventListener("click", back)

        function skip() {
            audio.currentTime += 10.0;
            audio.play();
        }

        function back() {
            audio.currentTime -= 10.0;
            audio.play();
        }

    } // <--- displayResults
}) // <--- jquery