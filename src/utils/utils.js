
export function rand(min, max, tail = 0) {
  return (min + Math.random() * (max - min)).toFixed(tail);
}

export function get_random_color() {
  var h = rand(1, 360);
  var s = rand(35, 100);
  var l = rand(50, 85);
  return `hsla(${h}, ${s}%, ${l}%, 0.35)`
}

export function increase_alpha(c, a) {
  if (!c) return '';
  const _split = c.split(', ')
  _split[3] = `${a})`
  return _split.join(', ')
}

// export function add_alpha(c, a) {
//   return c
//     .replace('hsl(', 'hsla(')
//     .replace(')',`, ${a})`)
// }
