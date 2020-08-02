class RandomStuff { 
  static getString = (length : number) : string => {
    let s = Math.random().toString(36).substring(2);
    while (s.length < length) {
        s += Math.random().toString(36).substring(2);
    }
    return s.substring(0, length);
  }
}

export default RandomStuff;