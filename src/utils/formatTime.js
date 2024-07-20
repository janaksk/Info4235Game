 export function formatTime(milliSec){
    let totalMilliseconds = milliSec;
    let minutes = Math.floor(totalMilliseconds / 60000);
    totalMilliseconds %= 60000;
    let seconds = Math.floor(totalMilliseconds / 1000);
    let remainingMilliseconds = totalMilliseconds % 1000;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}:${String(remainingMilliseconds).padStart(3, "0")}`;

}