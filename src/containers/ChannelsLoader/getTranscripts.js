
var convert = require('xml-js');

var xml="";

/**
 * Extract transcripts with their timestamps from a transcriber file stored on server
 * @param {string} url url of a transcriber file
 */
export default async function getTranscripts(url) {
    var rawTranscriber
    var transcripts = [];
    await fetch(url)
    .then(response =>      response.text())
    .then(data => rawTranscriber = data.split('\n'))

    var xml="";
    for (var i in rawTranscriber) {
        var trimmed = rawTranscriber[i].trim();
        if (trimmed.length !== 0) {
            xml+=trimmed;
        }

    }
    var result = convert.xml2json(xml, {compact: false , spaces: 2});
    var trasncriberJson = JSON.parse(result);
    var transcriberContent = trasncriberJson['elements'][1]['elements'][0]['elements'][0]['elements'][0]['elements'];

    for (var i=0; i< transcriberContent.length; i+=2){
        var newItem = {}
        newItem['startTime']=transcriberContent[i]['attributes']['time']
        newItem['text'] = transcriberContent[i+1]['text']
        transcripts.push(newItem)
    }
    return transcripts
}