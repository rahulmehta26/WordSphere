import {API_KEY} from '@env'

const fetchRandomWordData = async () => {
  try {
    const randomWordResponse = await fetch("https://api.api-ninjas.com/v1/randomword", {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY, 
      },
    });

    if (!randomWordResponse.ok) {
      throw new Error("Word not found in dictionary");
    }

    const randomWordData = await randomWordResponse.json();
    const randomWord = randomWordData.word[0]; 


    const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
    if (!dictionaryResponse.ok) {
      throw new Error("Failed to fetch word data from dictionary API");
    }

    const wordData = await dictionaryResponse.json();

    if (wordData.length === 0) { 
      throw new Error("Word data is empty");
    }

    const wordDetails = wordData[0]; 

  
    const wordInfo = {
      word: wordDetails.word,
      definition: wordDetails.meanings?.[0]?.definitions?.[0]?.definition || "No definition available.",
      example: wordDetails.meanings?.[0]?.definitions?.[0]?.example || "No example available.",
      phonetic: wordDetails.phonetics?.[0]?.text || "No phonetic transcription available.",
    };

    return wordInfo;
  } catch (error) {
    return {
      word: "Word not found in dictionary",
      definition: "Please try again later.",
      example: "Please try again later.",
    };
  }
};

export default fetchRandomWordData;


