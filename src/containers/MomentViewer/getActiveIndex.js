import {List} from "immutable";

export default function getActiveIndex(transcripts, currentMissionTime) {
  if (!List.isList(transcripts) || transcripts.size < 1) {
    return -1;
  }

  return transcripts.findLastIndex((value) => {
    const metStart = value.get("metStart");
    return currentMissionTime >= metStart;
  });
}
