export default function getActiveIndex(transcripts, currentMissionTime) {
  if (transcripts == null || transcripts.length < 1) {
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
}
