//초단위로 숫자를 받아서 MM:SS 으로 돌려준다
export const prettyTime = (secondsTime: number): string => {
  const minutes = Math.floor(secondsTime / 60);
  const seconds = secondsTime - minutes * 60;
  const timeString = `${
    String(minutes).length === 1 ? "0" + String(minutes) : String(minutes)
  } : ${
    String(seconds).length === 1 ? "0" + String(seconds) : String(seconds)
  }`;

  return timeString;
};

export default prettyTime;
