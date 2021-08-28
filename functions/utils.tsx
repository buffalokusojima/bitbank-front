export const handleNumericInput = (callback:void, text:string) => {
    if (/\d+(?:\.\d+)?/.test(text) || text==='') {
      callback(text);
    }
  }