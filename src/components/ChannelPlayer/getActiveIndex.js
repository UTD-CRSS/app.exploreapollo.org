export default function getActiveIndex(transcripts, currentMissionTime) {
  if (transcripts == null || transcripts.length < 1 || currentMissionTime == 0) {
    return -1;
  }
  let i;
  for(i = 0; i < transcripts.length; i++)
  {
    const metStart = transcripts[i].startTime;
    if(currentMissionTime < metStart)
    {
      if(i == 0)
        return i;
      return i-1;
    }
  }
  return i-1;
}
