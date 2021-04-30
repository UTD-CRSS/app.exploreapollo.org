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
      return i;
    } else if (currentMissionTime < metStart) {
      return -1;
    }
  }
}
