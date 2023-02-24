export function followConventor(num) {
  if (num.toString().length >= 7) {
    return (num / 1000000).toFixed(1) + "M";
  }

  if (num.toString().length >= 5) {
    return Math.round(num / 1000) + "K";
  }

  if (num.toString().length < 5) {
    return num;
  }
}

export function TrendConvenor(num) {
  if (num.toString().length >= 7) {
    return (num / 1000000).toFixed(1) + "M";
  }

  if (num.toString().length > 4) {
    return Math.round(num / 1000) + "K";
  }

  if (num.toString().length <= 3) {
    return num;
  }
}

export function fileSorter(file) {
  const sorter = file.split(".").pop();
  if (sorter === "mp4" && "webm") {
    return {
      type: "video",
      url: file,
    };
  } else if (sorter === "mp3" && "wav") {
    return {
      type: "audio",
      url: file,
    };
  } else {
    return {
      type: "file",
      url: file,
    };
  }
}
