let link = "https://cataas.com/cat/says/";
let btn = document.getElementById("get");
let input = document.getElementById("input");
let catImage = document.getElementById("cat-image");
let download = document.querySelector("a");
alert("Welcome to the cat meme generator! Enter some text and click the button to see a cat say it!");

btn.addEventListener("click", async function() {
  let text = input.value;
  if (text.trim() === "") {
    alert("Please enter some text!");
    return;
  }
  api_return = await fetchCatImage(text);
  catImage.src = api_return;
  catImage.style.display = "block";
  download.style.display = "block";
  input.value = "";
 download.href = api_return;
 download.setAttribute("download", "api_return");
});

 async function fetchCatImage(text) {
   try {
      let response = await axios.get(link + encodeURIComponent(text));
      console.log(response.data.url);
      return response.data.url;
   }
    catch (error) {
      console.error("Error fetching cat image:", error);
      return null;
    }
  }

  download.addEventListener("click", async function (e) {
    e.preventDefault(); // stop default opening in new tab

    try {
        let response = await fetch(catImage.src);
        let blob = await response.blob();

        let blobURL = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = blobURL;
        a.download = "cat-meme.jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(blobURL);

    } catch (error) {
        console.log("Download failed", error);
    }
});
  