const input = '168630-718098'.split('-');

const isDoubleDigit = (digit, number) => {
  const auxStrNum = number
    .toString()
    .replace(digit.toString() + digit.toString(), digit.toString());

  if (auxStrNum !== number.toString()) {
    return true;
  }
  return false;
};

const isDoubleDigitOnly = (digit, number) => {
  const arrayStrNum = number.toString().split('');
  const count = arrayStrNum.reduce((acc, num) => {
    if (Number(num) === digit) {
      acc++;
    }
    return acc;
  }, 0);

  return count === 2;
};

const isValidPass = (pass, passIni, passFin, isPart2 = false) => {
  let hasDoubleDigit = false;

  //pass has 6 digits and must be in range
  if (pass > 999999 || pass < passIni || pass > passFin) {
    return false;
  }

  const strPass = pass.toString();
  let minDigit = Number(strPass[0].toString());

  for (let i = 0; i < 6; i++) {
    const auxDigit = Number(strPass[i].toString());

    //tests if digits increase
    if (auxDigit < minDigit) {
      return false;
    } else {
      if (isPart2) {
        if (isDoubleDigitOnly(auxDigit, pass)) {
          hasDoubleDigit = true;
        }
      } else {
        if (isDoubleDigit(auxDigit, pass)) {
          hasDoubleDigit = true;
        }
      }
    }
    minDigit = auxDigit;
  }
  return hasDoubleDigit;
};

const countDifPasswords = (arrayRange, isPart2 = false) => {
  const passIni = Number(arrayRange[0]);
  const passFin = Number(arrayRange[1]);
  let count = 0;

  for (let pass = passIni; pass <= passFin; pass++) {
    if (isValidPass(pass, passIni, passFin, isPart2)) {
      count++;
    }
  }

  return count;
};

console.time('Part1');
console.log(countDifPasswords(input));
console.timeEnd('Part1');
console.time('Part2');
console.log(countDifPasswords(input, true));
console.timeEnd('Part2');
