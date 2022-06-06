export const normalizeText = text => {
  return text
    .replace(/[^a-zA-Z\d\s:]/gi, ' ')
    .toLowerCase()
    .split(' ')
    .reduce(
      (output, current) =>
        output + current.split('').reduce((out, cur, i) => (i == 0 ? cur.toUpperCase() : out + cur), '') + ' ',
      ''
    )
}
