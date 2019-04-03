var crypto = require('crypto');

if(typeof window !== 'undefined') throw new Error("This module is not safe for client execution");

// crypto above 4 bytes is unreliable
const getRandomSample = () => crypto.randomBytes(4).readUInt32LE();

// ensure the value is between 0 and 2^32
const isInExtendedRange = (sample, range) =>
  sample < (Math.floor(Math.pow(2, 32) / range) * range);

// unsafeCoerce should be removed, preferring safety to success
const unsafeCoerce = (sample, range) => sample % range;

const sample = (range, rangeCheck, coerce) => {
  let sample;
  let i = 0;
  do {
    sample = getRandomSample();
  } while (100 > ++i && !rangeCheck(sample, range));
  // note that if i is exceeded, the sample may be biased
  return coerce(sample, range);
}

// get rand in range could easily invoke sample directly
const randIntBelow = val => sample(val, isInExtendedRange, unsafeCoerce);

const getRandInRange = (min, max) => {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return lo + randIntBelow(hi - lo + 1);
};

const getString = validCharsString => {
  const opts = validCharsString.split("");

  const genStringOfLen = (curr, len) => {
    if(len <= 0) return curr;
    return genStringOfLen(curr + opts[getRandInRange(0, opts.length - 1)], len - 1);
  };

  return len => genStringOfLen("", len);
};

function* stringGenerator(validCharString, len) {
  const opts = validCharString.split("");

  const genStringOfLen = (curr, len) => {
    if(len <= 0) return curr;
    return genStringOfLen(curr + opts[getRandInRange(0, opts.length - 1)], len - 1);
  };

  while(true) {
    yield genStringOfLen("", len);
  }
}

// console.log(getString("abc")(5));

module.exports = {getRandInRange, getString};
