//Variables
const searchBtn=document.querySelector(".search-btn");
const search=document.querySelector(".search-value");
const searchResult=document.querySelector(".search-result");
const lyricsDiv=document.querySelector(".single-lyrics ");
const message=document.querySelector(".message");


//API URL
const apiURL='https://api.lyrics.ovh';

//Get Lyrics
async function  getLyrics(artist,songTitle){
    const res= await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data=await res.json();
    const lyrics=data.lyrics;
    if(lyrics!=undefined){
        message.innerHTML="";
        lyricsDiv.innerHTML=`<h2 class="text-success mb-4">${songTitle}</h2>
        <h4 class="author lead"><span>${artist}</span></h4><br>
        <pre class="lyric text-white">${lyrics}</pre>`;
    }else{
        lyricsDiv.innerHTML="";
        message.innerHTML="<h1 class='text-center'>Sorry! We can't find the lyrics</h1>";
    }
}

searchResult.addEventListener("click",e=>{
    const clickedButton=e.target;
    if(clickedButton.tagName==="BUTTON"){
        const artist=clickedButton.getAttribute('data-artist');
        const songTitle=clickedButton.getAttribute('data-songTitle');
        getLyrics(artist,songTitle);
    }
    
});

//Search Song
searchBtn.addEventListener('click',()=>{
    lyricsDiv.innerHTML="";
    message.innerHTML="";
    searchResult.innerHTML="";
    const searchValue=search.value.trim();
    search.value="";
    if(!searchValue){
        message.innerHTML="<h1 class='text-center'>Please type in the search box</h1>";
    }else{
        searchSongs(searchValue);
    }
});

//Show Songs
async function searchSongs(songs){
    const result=await fetch(`${apiURL}/suggest/${songs}`);
    const data=await result.json();
    showSongs(data);
}

let count=0;
function showSongs(data){
    let output='';
    let count=0;
    console.log(data.data);
    data.data.forEach(song=>{
        count++;
        //More than 10 songs won't be displayed
        if(count<=10){
            output+=`<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album: <span>${song.album.title}</span> by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
            <button class="btn btn-success" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
            </div></div>`;
        }else{
            return 0;
        }
    });
    searchResult.innerHTML=`${output}`;
}





