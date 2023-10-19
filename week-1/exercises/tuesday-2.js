function convertArrayStringsToCapitalized(arr) {
    const result = arr.map((str) => {
      // Convert the first character to uppercase and the rest to lowercase
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    });
  
    return result;
  }
  
  const data = [
    "robert",
    "vincent",
    "lAuRa",
    "Cas",
    "wIMER",
    "rOOs"
  ];
  
  const convertedData = convertArrayStringsToCapitalized(data);
  console.log(convertedData);