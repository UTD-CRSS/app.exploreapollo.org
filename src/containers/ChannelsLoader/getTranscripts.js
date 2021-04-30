var convert = require("xml-js");

async function getTranscriptsJson(url) {
  var transcripts;
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cannot fetch transcripts");
      } else return response.json();
    })
    .then((data) => {
      if (data) transcripts = data;
    })
    .catch((error) => console.log(error));

  return transcripts;
}

async function getTranscriptsTrs(url) {
  var rawTranscriber;
  var transcripts = [];
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Cannot fetch transcripts");
      } else return response.text();
    })
    .then((data) => {
      if (data) rawTranscriber = data.split("\n");
    })
    .catch((error) => console.log(error));
  var xml = "";
  for (var i in rawTranscriber) {
    var trimmed = rawTranscriber[i].trim();
    if (trimmed.length !== 0) {
      xml += trimmed;
    }
  }

  if (xml.length === 0) return [];

  // refer to https://github.com/nashwaan/xml-js for structure of xml2json

  var result = convert.xml2json(xml, { compact: false, spaces: 2 });

  var trasncriberJson = JSON.parse(result);

  var transcriberContent =
    trasncriberJson["elements"][1]["elements"][0]["elements"][0]["elements"][0][
      "elements"
    ];
  for (var i = 0; i < transcriberContent.length; i += 2) {
    var newItem = {};
    newItem["startTime"] = transcriberContent[i]["attributes"]["time"];
    if (i / 2 > 0) {
      transcripts[i / 2 - 1]["endTime"] =
        transcriberContent[i]["attributes"]["time"];
    }
    // last transcript
    if (i == transcriberContent.length - 2) {
      // approximately set it to 300 (to the end of 5 minute), if this is the last transcript
      newItem["endTime"] = 300;
    }
    newItem["words"] = transcriberContent[i + 1]["text"];
    transcripts.push(newItem);
  }

  return transcripts;
}
/**
 * Extract transcripts with their timestamps from a transcriber file stored on server
 * @param {string} url url of a transcriber file
 */
export default async function getTranscripts(url) {
  var transcripts;

  if (url.substring(url.length - 4) === "json") {
    await getTranscriptsJson(url).then((response) => (transcripts = response));
    return transcripts;
  } else if (url.substring(url.length - 3) === "trs") {
    await getTranscriptsTrs(url).then((response) => (transcripts = response));
    return transcripts;
  } else return [];
}
