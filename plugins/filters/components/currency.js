export default function (num) {
  const n = Number(num)
  return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
    const currency =
      i && c !== '.' && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, '')
        : c
    return currency
  })}`
}
// 將數字格式化為3位一個逗點並補上錢字號
