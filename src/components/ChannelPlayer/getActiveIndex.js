/**
 * Return array of 2 elements [i, k], if the second element is true, the transcript at index i is active,
 * if the second element is false, no one is talking at  currentMissionTime, the return index is index of the last transcript,
 * this is used to have smooth transition between each talk and silence
 * @param {*} transcripts 
 * @param {*} currentMissionTime 
 * @returns array of 2 elements, first element indicates transcript item index, second element is either true or false,
 * indicating if the index should be used to set the transcript to active
 */
export default function getActiveIndex(transcripts, currentMissionTime) {
  if (
    transcripts == null ||
    transcripts.length < 1 ||
    currentMissionTime == 0
  ) {
    return -1;
  }
  let i;
  for (i = 0; i < transcripts.length; i++) {
    const metStart = transcripts[i].startTime;
    const metEnd = transcripts[i].endTime;
    if (currentMissionTime < metEnd && currentMissionTime > metStart) {
      return [i, true];
    } else if (currentMissionTime < metStart) {
      return [i - 1, false];
    }
  }
  return [transcripts.length - 1, true];
}
