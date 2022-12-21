function truncate(str, maxlength) {
   if (str.length > maxlength) {
    return console.log(`${str.slice(0, maxlength)}…`);
  }
  return console.log(str);
}
