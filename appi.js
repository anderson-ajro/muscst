const d=document,
  $form= d.getElementById("artista-br"),
  $loader= d.querySelector(".loader"),
  $error= d.querySelector(".error"),
  $main= d.querySelector("main"),

  $artist = d.querySelector(".artist");

  $form.addEventListener("submit", async e=>{
    e.preventDefault();

    try{
      $loader.style.display="block";

      let artist= e.target.artist.value.toLowerCase(),
    
      $artistTemplate="",
      artistAPI=`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist}`,
   

      artistFetch= fetch(artistAPI),
    

      [artistRes] = await Promise.all([artistFetch]),
      
      artistData = await artistRes.json();
    


      console.log(artistRes);
      console.log(artistData);

      if(artistData.artists=== null){
        $artistTemplate = `<h2>No existe el interprete ${artist}</h2>`
      }else{
        let artist= artistData.artists[0];
        $artistTemplate=`  
        <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-12 order-lg-1">
            <div class="p-5">
            <img src="${artist.strArtistThumb}" alt="${artist.strArtist}" class="img-fluid rounded-circle">
            </div>
          </div>
          <div class="col-lg-12 order-md-1">
            <div class="p-5">
            <h2 class="display-4 "> ${artist.strArtist}</h2>
            <h3>Genero Musical:</h3><p>${artist.strStyle}</p>
          <h3>Sitio Web:</h3><p>www.${artist.strWebsite}</p>
          <h3>RRSS:</h3><p>www.${artist.strTwitter}</p>
          <h3>Biografia:</h3><p>${artist.strBiographyES}</p>
            </div>
          </div>
        </div>
      </div>`;  }

     
      $loader.style.display="none";
      $artist.innerHTML=$artistTemplate;


    } catch(err){
     console.log(err);
      let message =err.statusText||"Ocurrió un error";
      $error.innerHTML=`<p>${message}</p>`;
      $loader.style.display ="none";
    }
  })
