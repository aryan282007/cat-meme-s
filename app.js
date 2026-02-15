let link = "https://cataas.com/cat/says/";
let btn = document.getElementById("get");
let input = document.getElementById("input");
let catImage = document.getElementById("cat-image");

alert("Welcome to the cat meme generator! Enter some text and click the button to see a cat say it!");

btn.addEventListener("click", async function() {
  let text = input.value;
  if (text.trim() === "") {
    alert("Please enter some text!");
    return;
  }
  catImage.src = await fetchCatImage(text);
  catImage.style.display = "block";
  input.value = "";
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
