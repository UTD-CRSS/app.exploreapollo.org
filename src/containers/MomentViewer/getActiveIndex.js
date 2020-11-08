import {List} from "immutable";

export default function getActiveIndex(transcripts, currentMissionTime) {
  //console.log(List.isList(transcripts))
  if (transcripts == null || transcripts.length < 1) {
    console.log("returning -1")
    return -1;
  }

  for(let i = 0; i < transcripts.length; i++)
  {
    const metStart = transcripts[i].metStart;
    if(currentMissionTime < metStart)
    {
      if(i == 0)
        return i;
      return i-1;
    }
  }
  return -1;

  // return transcripts.findLastIndex((value) => {
  //   const metStart = value["metStart"];
  //   return currentMissionTime >= metStart;
  // });
}