console.log("Spotify")

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem')); 

let songs = [
     {songName : "Surah Qadr", filePath: 'song/1.mp3', coverPath: 'covers/1.jfif'},
     {songName : "Surah Ikhlas", filePath: 'song/2.mp3', coverPath: 'covers/1.jfif'},
     {songName : "Surah Qiyamah", filePath: 'song/3.mp3', coverPath: 'covers/1.jfif'},
     {songName : "Surah Mulk", filePath: 'song/4.mp3', coverPath: 'covers/1.jfif'},
     {songName : "Surah Falak", filePath: 'song/5.mp3', coverPath: 'covers/1.jfif'},
     {songName : "Surah Fajr", filePath: 'song/6.mp3', coverPath: 'covers/1.jfif'},

]

songItems.forEach((element, i) => {
     console.log(element,i);
     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
     element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();

// Play or Pause the song
masterPlay.addEventListener('click', ()=> {
     if(audioElement.paused || audioElement.currentTime<= 0){
          audioElement.play();
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
     }
     else{
          audioElement.pause();
          masterPlay.classList.remove('fa-pause');
          masterPlay.classList.add('fa-play');
          gif.style.opacity = 0;
     }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
     console.log("Time update");
     // Update the progress bar
     progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
     myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
     audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

const makeAllPLays = () => {
     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
          element.classList.add('fa-play');
          element.classList.remove('fa-pause');

     }
)}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
     element.addEventListener('click', (e) => {
          makeAllPLays();
          songIndex = parseInt(e.target.id);
          e.target.classList.remove('fa-play');
          e.target.classList.add('fa-pause');
          audioElement.src = `song/${songIndex+1}.mp3`;
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.play();
          audioElement.currentTime = 0;
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
     })
})        

document.getElementById('previous').addEventListener('click', () => {
     if(songIndex>0){
          songIndex -= 1;
     }
     else{
          songIndex = songs.length-1;
     }
     audioElement.src = `song/${songIndex+1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.play();
     audioElement.currentTime = 0;
     makeAllPLays();
     document.getElementById(songIndex).classList.remove('fa-play');
     document.getElementById(songIndex).classList.add('fa-pause');
     gif.style.opacity = 1;
})

document.getElementById('next').addEventListener('click', () => {
     if(songIndex<songs.length-1){
          songIndex += 1;
     }
     else{
          songIndex = 0;
     }
     audioElement.src = `song/${songIndex+1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.play();
     audioElement.currentTime = 0;
     makeAllPLays();
     document.getElementById(songIndex).classList.remove('fa-play');
     document.getElementById(songIndex).classList.add('fa-pause');
     gif.style.opacity = 1;
})

