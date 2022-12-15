const query = "hello";

function sizeTheWords() {
  const variableSizeResults = document.querySelectorAll(".result.imperfect");
  variableSizeResults.forEach((result) => {
    const resultScore = parseInt(result.dataset.score, 10);
    result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
  });
}

// assuming you already have rhyme results somewhere, for each of the first 10 results, query the word info api for the rhyming words' info and display them in a dl with that rhyming word

async function getWords(wordToRhyme) {
  const rhymeResults = await fetch(`https://rhymebrain.com/talk?function=getRhymes&word=${wordToRhyme}`);
  const rhymeResultsJson = await rhymeResults.json();
  console.log(rhymeResultsJson);
  
  let rhymeResultsElems = rhymeResultsJson.map((rhymeWord) => {
    const resultElem = document.createElement("div");
    resultElem.classList.add("result");
    if (rhymeWord.score >= 300) {
      resultElem.classList.add("perfect");
    } else {
      resultElem.classList.add("imperfect");
    } 
    resultElem.dataset.score = rhymeWord.score;
    // resultElem.innerText = rhymeWord.word;
    resultElem.append(rhymeWord.word);
    return resultElem;
  });
  const resultsContainer = document.getElementById("results");
  // console.log(Array.from(resultsContainer.childNodes));

  resultsContainer.replaceChildren();
  rhymeResultsElems = rhymeResultsElems.slice(0, 10);

  let dlist = document.createElement('dl');

  rhymeResultsElems.forEach((rhyme) => {
    console.log(rhyme);
    let wordInfo = fetch(`https://rhymebrain.com/talk?function=getWordInfo&word=${rhyme}`);
    let wordInfoJson = wordInfo.json()
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    let text1 = document.createTextNode(`${rhyme.word}`);
    let text2 = document.createTextNode(`${wordInfoJson}`);
    console.log(wordInfoJson);
    dt.appendChild(text1);
    dd.appendChild(text2);
    dlist.appendChild(dt);
    dlist.appendChild(dd);
  });


  resultsContainer.appendChild(dlist);
  sizeTheWords();
}

const form = document.getElementById("vestigial")

form.addEventListener("submit", (event) => {
  event.preventDefault();
  
  console.log("word submitted");
  var input = document.querySelector('#word');

  console.log(input.value);
  getWords(input.value);
})
