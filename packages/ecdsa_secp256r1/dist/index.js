"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// ../../node_modules/bignumber.js/bignumber.js
var require_bignumber = __commonJS({
  "../../node_modules/bignumber.js/bignumber.js"(exports, module2) {
    (function(globalObject) {
      "use strict";
      var BigNumber, isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
      function clone(configObject) {
        var div, convertBase, parseNumeric, P2 = BigNumber2.prototype = { constructor: BigNumber2, toString: null, valueOf: null }, ONE = new BigNumber2(1), DECIMAL_PLACES = 20, ROUNDING_MODE = 4, TO_EXP_NEG = -7, TO_EXP_POS = 21, MIN_EXP = -1e7, MAX_EXP = 1e7, CRYPTO = false, MODULO_MODE = 1, POW_PRECISION = 0, FORMAT = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: "\xA0",
          // non-breaking space
          suffix: ""
        }, ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz", alphabetHasNormalDecimalDigits = true;
        function BigNumber2(v2, b2) {
          var alphabet, c2, caseChanged, e2, i2, isNum, len, str, x2 = this;
          if (!(x2 instanceof BigNumber2))
            return new BigNumber2(v2, b2);
          if (b2 == null) {
            if (v2 && v2._isBigNumber === true) {
              x2.s = v2.s;
              if (!v2.c || v2.e > MAX_EXP) {
                x2.c = x2.e = null;
              } else if (v2.e < MIN_EXP) {
                x2.c = [x2.e = 0];
              } else {
                x2.e = v2.e;
                x2.c = v2.c.slice();
              }
              return;
            }
            if ((isNum = typeof v2 == "number") && v2 * 0 == 0) {
              x2.s = 1 / v2 < 0 ? (v2 = -v2, -1) : 1;
              if (v2 === ~~v2) {
                for (e2 = 0, i2 = v2; i2 >= 10; i2 /= 10, e2++)
                  ;
                if (e2 > MAX_EXP) {
                  x2.c = x2.e = null;
                } else {
                  x2.e = e2;
                  x2.c = [v2];
                }
                return;
              }
              str = String(v2);
            } else {
              if (!isNumeric.test(str = String(v2)))
                return parseNumeric(x2, str, isNum);
              x2.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
            }
            if ((e2 = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            if ((i2 = str.search(/e/i)) > 0) {
              if (e2 < 0)
                e2 = i2;
              e2 += +str.slice(i2 + 1);
              str = str.substring(0, i2);
            } else if (e2 < 0) {
              e2 = str.length;
            }
          } else {
            intCheck(b2, 2, ALPHABET.length, "Base");
            if (b2 == 10 && alphabetHasNormalDecimalDigits) {
              x2 = new BigNumber2(v2);
              return round(x2, DECIMAL_PLACES + x2.e + 1, ROUNDING_MODE);
            }
            str = String(v2);
            if (isNum = typeof v2 == "number") {
              if (v2 * 0 != 0)
                return parseNumeric(x2, str, isNum, b2);
              x2.s = 1 / v2 < 0 ? (str = str.slice(1), -1) : 1;
              if (BigNumber2.DEBUG && str.replace(/^0\.0*|\./, "").length > 15) {
                throw Error(tooManyDigits + v2);
              }
            } else {
              x2.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
            }
            alphabet = ALPHABET.slice(0, b2);
            e2 = i2 = 0;
            for (len = str.length; i2 < len; i2++) {
              if (alphabet.indexOf(c2 = str.charAt(i2)) < 0) {
                if (c2 == ".") {
                  if (i2 > e2) {
                    e2 = len;
                    continue;
                  }
                } else if (!caseChanged) {
                  if (str == str.toUpperCase() && (str = str.toLowerCase()) || str == str.toLowerCase() && (str = str.toUpperCase())) {
                    caseChanged = true;
                    i2 = -1;
                    e2 = 0;
                    continue;
                  }
                }
                return parseNumeric(x2, String(v2), isNum, b2);
              }
            }
            isNum = false;
            str = convertBase(str, b2, 10, x2.s);
            if ((e2 = str.indexOf(".")) > -1)
              str = str.replace(".", "");
            else
              e2 = str.length;
          }
          for (i2 = 0; str.charCodeAt(i2) === 48; i2++)
            ;
          for (len = str.length; str.charCodeAt(--len) === 48; )
            ;
          if (str = str.slice(i2, ++len)) {
            len -= i2;
            if (isNum && BigNumber2.DEBUG && len > 15 && (v2 > MAX_SAFE_INTEGER || v2 !== mathfloor(v2))) {
              throw Error(tooManyDigits + x2.s * v2);
            }
            if ((e2 = e2 - i2 - 1) > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (e2 < MIN_EXP) {
              x2.c = [x2.e = 0];
            } else {
              x2.e = e2;
              x2.c = [];
              i2 = (e2 + 1) % LOG_BASE;
              if (e2 < 0)
                i2 += LOG_BASE;
              if (i2 < len) {
                if (i2)
                  x2.c.push(+str.slice(0, i2));
                for (len -= LOG_BASE; i2 < len; ) {
                  x2.c.push(+str.slice(i2, i2 += LOG_BASE));
                }
                i2 = LOG_BASE - (str = str.slice(i2)).length;
              } else {
                i2 -= len;
              }
              for (; i2--; str += "0")
                ;
              x2.c.push(+str);
            }
          } else {
            x2.c = [x2.e = 0];
          }
        }
        BigNumber2.clone = clone;
        BigNumber2.ROUND_UP = 0;
        BigNumber2.ROUND_DOWN = 1;
        BigNumber2.ROUND_CEIL = 2;
        BigNumber2.ROUND_FLOOR = 3;
        BigNumber2.ROUND_HALF_UP = 4;
        BigNumber2.ROUND_HALF_DOWN = 5;
        BigNumber2.ROUND_HALF_EVEN = 6;
        BigNumber2.ROUND_HALF_CEIL = 7;
        BigNumber2.ROUND_HALF_FLOOR = 8;
        BigNumber2.EUCLID = 9;
        BigNumber2.config = BigNumber2.set = function(obj) {
          var p, v2;
          if (obj != null) {
            if (typeof obj == "object") {
              if (obj.hasOwnProperty(p = "DECIMAL_PLACES")) {
                v2 = obj[p];
                intCheck(v2, 0, MAX, p);
                DECIMAL_PLACES = v2;
              }
              if (obj.hasOwnProperty(p = "ROUNDING_MODE")) {
                v2 = obj[p];
                intCheck(v2, 0, 8, p);
                ROUNDING_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "EXPONENTIAL_AT")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck(v2[0], -MAX, 0, p);
                  intCheck(v2[1], 0, MAX, p);
                  TO_EXP_NEG = v2[0];
                  TO_EXP_POS = v2[1];
                } else {
                  intCheck(v2, -MAX, MAX, p);
                  TO_EXP_NEG = -(TO_EXP_POS = v2 < 0 ? -v2 : v2);
                }
              }
              if (obj.hasOwnProperty(p = "RANGE")) {
                v2 = obj[p];
                if (v2 && v2.pop) {
                  intCheck(v2[0], -MAX, -1, p);
                  intCheck(v2[1], 1, MAX, p);
                  MIN_EXP = v2[0];
                  MAX_EXP = v2[1];
                } else {
                  intCheck(v2, -MAX, MAX, p);
                  if (v2) {
                    MIN_EXP = -(MAX_EXP = v2 < 0 ? -v2 : v2);
                  } else {
                    throw Error(bignumberError + p + " cannot be zero: " + v2);
                  }
                }
              }
              if (obj.hasOwnProperty(p = "CRYPTO")) {
                v2 = obj[p];
                if (v2 === !!v2) {
                  if (v2) {
                    if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                      CRYPTO = v2;
                    } else {
                      CRYPTO = !v2;
                      throw Error(bignumberError + "crypto unavailable");
                    }
                  } else {
                    CRYPTO = v2;
                  }
                } else {
                  throw Error(bignumberError + p + " not true or false: " + v2);
                }
              }
              if (obj.hasOwnProperty(p = "MODULO_MODE")) {
                v2 = obj[p];
                intCheck(v2, 0, 9, p);
                MODULO_MODE = v2;
              }
              if (obj.hasOwnProperty(p = "POW_PRECISION")) {
                v2 = obj[p];
                intCheck(v2, 0, MAX, p);
                POW_PRECISION = v2;
              }
              if (obj.hasOwnProperty(p = "FORMAT")) {
                v2 = obj[p];
                if (typeof v2 == "object")
                  FORMAT = v2;
                else
                  throw Error(bignumberError + p + " not an object: " + v2);
              }
              if (obj.hasOwnProperty(p = "ALPHABET")) {
                v2 = obj[p];
                if (typeof v2 == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(v2)) {
                  alphabetHasNormalDecimalDigits = v2.slice(0, 10) == "0123456789";
                  ALPHABET = v2;
                } else {
                  throw Error(bignumberError + p + " invalid: " + v2);
                }
              }
            } else {
              throw Error(bignumberError + "Object expected: " + obj);
            }
          }
          return {
            DECIMAL_PLACES,
            ROUNDING_MODE,
            EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
            RANGE: [MIN_EXP, MAX_EXP],
            CRYPTO,
            MODULO_MODE,
            POW_PRECISION,
            FORMAT,
            ALPHABET
          };
        };
        BigNumber2.isBigNumber = function(v2) {
          if (!v2 || v2._isBigNumber !== true)
            return false;
          if (!BigNumber2.DEBUG)
            return true;
          var i2, n2, c2 = v2.c, e2 = v2.e, s2 = v2.s;
          out:
            if ({}.toString.call(c2) == "[object Array]") {
              if ((s2 === 1 || s2 === -1) && e2 >= -MAX && e2 <= MAX && e2 === mathfloor(e2)) {
                if (c2[0] === 0) {
                  if (e2 === 0 && c2.length === 1)
                    return true;
                  break out;
                }
                i2 = (e2 + 1) % LOG_BASE;
                if (i2 < 1)
                  i2 += LOG_BASE;
                if (String(c2[0]).length == i2) {
                  for (i2 = 0; i2 < c2.length; i2++) {
                    n2 = c2[i2];
                    if (n2 < 0 || n2 >= BASE || n2 !== mathfloor(n2))
                      break out;
                  }
                  if (n2 !== 0)
                    return true;
                }
              }
            } else if (c2 === null && e2 === null && (s2 === null || s2 === 1 || s2 === -1)) {
              return true;
            }
          throw Error(bignumberError + "Invalid BigNumber: " + v2);
        };
        BigNumber2.maximum = BigNumber2.max = function() {
          return maxOrMin(arguments, -1);
        };
        BigNumber2.minimum = BigNumber2.min = function() {
          return maxOrMin(arguments, 1);
        };
        BigNumber2.random = function() {
          var pow2_53 = 9007199254740992;
          var random53bitInt = Math.random() * pow2_53 & 2097151 ? function() {
            return mathfloor(Math.random() * pow2_53);
          } : function() {
            return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
          };
          return function(dp) {
            var a2, b2, e2, k2, v2, i2 = 0, c2 = [], rand = new BigNumber2(ONE);
            if (dp == null)
              dp = DECIMAL_PLACES;
            else
              intCheck(dp, 0, MAX);
            k2 = mathceil(dp / LOG_BASE);
            if (CRYPTO) {
              if (crypto.getRandomValues) {
                a2 = crypto.getRandomValues(new Uint32Array(k2 *= 2));
                for (; i2 < k2; ) {
                  v2 = a2[i2] * 131072 + (a2[i2 + 1] >>> 11);
                  if (v2 >= 9e15) {
                    b2 = crypto.getRandomValues(new Uint32Array(2));
                    a2[i2] = b2[0];
                    a2[i2 + 1] = b2[1];
                  } else {
                    c2.push(v2 % 1e14);
                    i2 += 2;
                  }
                }
                i2 = k2 / 2;
              } else if (crypto.randomBytes) {
                a2 = crypto.randomBytes(k2 *= 7);
                for (; i2 < k2; ) {
                  v2 = (a2[i2] & 31) * 281474976710656 + a2[i2 + 1] * 1099511627776 + a2[i2 + 2] * 4294967296 + a2[i2 + 3] * 16777216 + (a2[i2 + 4] << 16) + (a2[i2 + 5] << 8) + a2[i2 + 6];
                  if (v2 >= 9e15) {
                    crypto.randomBytes(7).copy(a2, i2);
                  } else {
                    c2.push(v2 % 1e14);
                    i2 += 7;
                  }
                }
                i2 = k2 / 7;
              } else {
                CRYPTO = false;
                throw Error(bignumberError + "crypto unavailable");
              }
            }
            if (!CRYPTO) {
              for (; i2 < k2; ) {
                v2 = random53bitInt();
                if (v2 < 9e15)
                  c2[i2++] = v2 % 1e14;
              }
            }
            k2 = c2[--i2];
            dp %= LOG_BASE;
            if (k2 && dp) {
              v2 = POWS_TEN[LOG_BASE - dp];
              c2[i2] = mathfloor(k2 / v2) * v2;
            }
            for (; c2[i2] === 0; c2.pop(), i2--)
              ;
            if (i2 < 0) {
              c2 = [e2 = 0];
            } else {
              for (e2 = -1; c2[0] === 0; c2.splice(0, 1), e2 -= LOG_BASE)
                ;
              for (i2 = 1, v2 = c2[0]; v2 >= 10; v2 /= 10, i2++)
                ;
              if (i2 < LOG_BASE)
                e2 -= LOG_BASE - i2;
            }
            rand.e = e2;
            rand.c = c2;
            return rand;
          };
        }();
        BigNumber2.sum = function() {
          var i2 = 1, args = arguments, sum = new BigNumber2(args[0]);
          for (; i2 < args.length; )
            sum = sum.plus(args[i2++]);
          return sum;
        };
        convertBase = function() {
          var decimal = "0123456789";
          function toBaseOut(str, baseIn, baseOut, alphabet) {
            var j2, arr = [0], arrL, i2 = 0, len = str.length;
            for (; i2 < len; ) {
              for (arrL = arr.length; arrL--; arr[arrL] *= baseIn)
                ;
              arr[0] += alphabet.indexOf(str.charAt(i2++));
              for (j2 = 0; j2 < arr.length; j2++) {
                if (arr[j2] > baseOut - 1) {
                  if (arr[j2 + 1] == null)
                    arr[j2 + 1] = 0;
                  arr[j2 + 1] += arr[j2] / baseOut | 0;
                  arr[j2] %= baseOut;
                }
              }
            }
            return arr.reverse();
          }
          return function(str, baseIn, baseOut, sign, callerIsToString) {
            var alphabet, d, e2, k2, r2, x2, xc, y2, i2 = str.indexOf("."), dp = DECIMAL_PLACES, rm = ROUNDING_MODE;
            if (i2 >= 0) {
              k2 = POW_PRECISION;
              POW_PRECISION = 0;
              str = str.replace(".", "");
              y2 = new BigNumber2(baseIn);
              x2 = y2.pow(str.length - i2);
              POW_PRECISION = k2;
              y2.c = toBaseOut(
                toFixedPoint(coeffToString(x2.c), x2.e, "0"),
                10,
                baseOut,
                decimal
              );
              y2.e = y2.c.length;
            }
            xc = toBaseOut(str, baseIn, baseOut, callerIsToString ? (alphabet = ALPHABET, decimal) : (alphabet = decimal, ALPHABET));
            e2 = k2 = xc.length;
            for (; xc[--k2] == 0; xc.pop())
              ;
            if (!xc[0])
              return alphabet.charAt(0);
            if (i2 < 0) {
              --e2;
            } else {
              x2.c = xc;
              x2.e = e2;
              x2.s = sign;
              x2 = div(x2, y2, dp, rm, baseOut);
              xc = x2.c;
              r2 = x2.r;
              e2 = x2.e;
            }
            d = e2 + dp + 1;
            i2 = xc[d];
            k2 = baseOut / 2;
            r2 = r2 || d < 0 || xc[d + 1] != null;
            r2 = rm < 4 ? (i2 != null || r2) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : i2 > k2 || i2 == k2 && (rm == 4 || r2 || rm == 6 && xc[d - 1] & 1 || rm == (x2.s < 0 ? 8 : 7));
            if (d < 1 || !xc[0]) {
              str = r2 ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
            } else {
              xc.length = d;
              if (r2) {
                for (--baseOut; ++xc[--d] > baseOut; ) {
                  xc[d] = 0;
                  if (!d) {
                    ++e2;
                    xc = [1].concat(xc);
                  }
                }
              }
              for (k2 = xc.length; !xc[--k2]; )
                ;
              for (i2 = 0, str = ""; i2 <= k2; str += alphabet.charAt(xc[i2++]))
                ;
              str = toFixedPoint(str, e2, alphabet.charAt(0));
            }
            return str;
          };
        }();
        div = function() {
          function multiply(x2, k2, base) {
            var m2, temp, xlo, xhi, carry = 0, i2 = x2.length, klo = k2 % SQRT_BASE, khi = k2 / SQRT_BASE | 0;
            for (x2 = x2.slice(); i2--; ) {
              xlo = x2[i2] % SQRT_BASE;
              xhi = x2[i2] / SQRT_BASE | 0;
              m2 = khi * xlo + xhi * klo;
              temp = klo * xlo + m2 % SQRT_BASE * SQRT_BASE + carry;
              carry = (temp / base | 0) + (m2 / SQRT_BASE | 0) + khi * xhi;
              x2[i2] = temp % base;
            }
            if (carry)
              x2 = [carry].concat(x2);
            return x2;
          }
          function compare2(a2, b2, aL, bL) {
            var i2, cmp;
            if (aL != bL) {
              cmp = aL > bL ? 1 : -1;
            } else {
              for (i2 = cmp = 0; i2 < aL; i2++) {
                if (a2[i2] != b2[i2]) {
                  cmp = a2[i2] > b2[i2] ? 1 : -1;
                  break;
                }
              }
            }
            return cmp;
          }
          function subtract(a2, b2, aL, base) {
            var i2 = 0;
            for (; aL--; ) {
              a2[aL] -= i2;
              i2 = a2[aL] < b2[aL] ? 1 : 0;
              a2[aL] = i2 * base + a2[aL] - b2[aL];
            }
            for (; !a2[0] && a2.length > 1; a2.splice(0, 1))
              ;
          }
          return function(x2, y2, dp, rm, base) {
            var cmp, e2, i2, more, n2, prod, prodL, q2, qc, rem, remL, rem0, xi, xL, yc0, yL, yz, s2 = x2.s == y2.s ? 1 : -1, xc = x2.c, yc = y2.c;
            if (!xc || !xc[0] || !yc || !yc[0]) {
              return new BigNumber2(
                // Return NaN if either NaN, or both Infinity or 0.
                !x2.s || !y2.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN : (
                  // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                  xc && xc[0] == 0 || !yc ? s2 * 0 : s2 / 0
                )
              );
            }
            q2 = new BigNumber2(s2);
            qc = q2.c = [];
            e2 = x2.e - y2.e;
            s2 = dp + e2 + 1;
            if (!base) {
              base = BASE;
              e2 = bitFloor(x2.e / LOG_BASE) - bitFloor(y2.e / LOG_BASE);
              s2 = s2 / LOG_BASE | 0;
            }
            for (i2 = 0; yc[i2] == (xc[i2] || 0); i2++)
              ;
            if (yc[i2] > (xc[i2] || 0))
              e2--;
            if (s2 < 0) {
              qc.push(1);
              more = true;
            } else {
              xL = xc.length;
              yL = yc.length;
              i2 = 0;
              s2 += 2;
              n2 = mathfloor(base / (yc[0] + 1));
              if (n2 > 1) {
                yc = multiply(yc, n2, base);
                xc = multiply(xc, n2, base);
                yL = yc.length;
                xL = xc.length;
              }
              xi = yL;
              rem = xc.slice(0, yL);
              remL = rem.length;
              for (; remL < yL; rem[remL++] = 0)
                ;
              yz = yc.slice();
              yz = [0].concat(yz);
              yc0 = yc[0];
              if (yc[1] >= base / 2)
                yc0++;
              do {
                n2 = 0;
                cmp = compare2(yc, rem, yL, remL);
                if (cmp < 0) {
                  rem0 = rem[0];
                  if (yL != remL)
                    rem0 = rem0 * base + (rem[1] || 0);
                  n2 = mathfloor(rem0 / yc0);
                  if (n2 > 1) {
                    if (n2 >= base)
                      n2 = base - 1;
                    prod = multiply(yc, n2, base);
                    prodL = prod.length;
                    remL = rem.length;
                    while (compare2(prod, rem, prodL, remL) == 1) {
                      n2--;
                      subtract(prod, yL < prodL ? yz : yc, prodL, base);
                      prodL = prod.length;
                      cmp = 1;
                    }
                  } else {
                    if (n2 == 0) {
                      cmp = n2 = 1;
                    }
                    prod = yc.slice();
                    prodL = prod.length;
                  }
                  if (prodL < remL)
                    prod = [0].concat(prod);
                  subtract(rem, prod, remL, base);
                  remL = rem.length;
                  if (cmp == -1) {
                    while (compare2(yc, rem, yL, remL) < 1) {
                      n2++;
                      subtract(rem, yL < remL ? yz : yc, remL, base);
                      remL = rem.length;
                    }
                  }
                } else if (cmp === 0) {
                  n2++;
                  rem = [0];
                }
                qc[i2++] = n2;
                if (rem[0]) {
                  rem[remL++] = xc[xi] || 0;
                } else {
                  rem = [xc[xi]];
                  remL = 1;
                }
              } while ((xi++ < xL || rem[0] != null) && s2--);
              more = rem[0] != null;
              if (!qc[0])
                qc.splice(0, 1);
            }
            if (base == BASE) {
              for (i2 = 1, s2 = qc[0]; s2 >= 10; s2 /= 10, i2++)
                ;
              round(q2, dp + (q2.e = i2 + e2 * LOG_BASE - 1) + 1, rm, more);
            } else {
              q2.e = e2;
              q2.r = +more;
            }
            return q2;
          };
        }();
        function format(n2, i2, rm, id) {
          var c0, e2, ne2, len, str;
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          if (!n2.c)
            return n2.toString();
          c0 = n2.c[0];
          ne2 = n2.e;
          if (i2 == null) {
            str = coeffToString(n2.c);
            str = id == 1 || id == 2 && (ne2 <= TO_EXP_NEG || ne2 >= TO_EXP_POS) ? toExponential(str, ne2) : toFixedPoint(str, ne2, "0");
          } else {
            n2 = round(new BigNumber2(n2), i2, rm);
            e2 = n2.e;
            str = coeffToString(n2.c);
            len = str.length;
            if (id == 1 || id == 2 && (i2 <= e2 || e2 <= TO_EXP_NEG)) {
              for (; len < i2; str += "0", len++)
                ;
              str = toExponential(str, e2);
            } else {
              i2 -= ne2;
              str = toFixedPoint(str, e2, "0");
              if (e2 + 1 > len) {
                if (--i2 > 0)
                  for (str += "."; i2--; str += "0")
                    ;
              } else {
                i2 += e2 - len;
                if (i2 > 0) {
                  if (e2 + 1 == len)
                    str += ".";
                  for (; i2--; str += "0")
                    ;
                }
              }
            }
          }
          return n2.s < 0 && c0 ? "-" + str : str;
        }
        function maxOrMin(args, n2) {
          var k2, y2, i2 = 1, x2 = new BigNumber2(args[0]);
          for (; i2 < args.length; i2++) {
            y2 = new BigNumber2(args[i2]);
            if (!y2.s || (k2 = compare(x2, y2)) === n2 || k2 === 0 && x2.s === n2) {
              x2 = y2;
            }
          }
          return x2;
        }
        function normalise(n2, c2, e2) {
          var i2 = 1, j2 = c2.length;
          for (; !c2[--j2]; c2.pop())
            ;
          for (j2 = c2[0]; j2 >= 10; j2 /= 10, i2++)
            ;
          if ((e2 = i2 + e2 * LOG_BASE - 1) > MAX_EXP) {
            n2.c = n2.e = null;
          } else if (e2 < MIN_EXP) {
            n2.c = [n2.e = 0];
          } else {
            n2.e = e2;
            n2.c = c2;
          }
          return n2;
        }
        parseNumeric = function() {
          var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i, dotAfter = /^([^.]+)\.$/, dotBefore = /^\.([^.]+)$/, isInfinityOrNaN = /^-?(Infinity|NaN)$/, whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
          return function(x2, str, isNum, b2) {
            var base, s2 = isNum ? str : str.replace(whitespaceOrPlus, "");
            if (isInfinityOrNaN.test(s2)) {
              x2.s = isNaN(s2) ? null : s2 < 0 ? -1 : 1;
            } else {
              if (!isNum) {
                s2 = s2.replace(basePrefix, function(m2, p1, p2) {
                  base = (p2 = p2.toLowerCase()) == "x" ? 16 : p2 == "b" ? 2 : 8;
                  return !b2 || b2 == base ? p1 : m2;
                });
                if (b2) {
                  base = b2;
                  s2 = s2.replace(dotAfter, "$1").replace(dotBefore, "0.$1");
                }
                if (str != s2)
                  return new BigNumber2(s2, base);
              }
              if (BigNumber2.DEBUG) {
                throw Error(bignumberError + "Not a" + (b2 ? " base " + b2 : "") + " number: " + str);
              }
              x2.s = null;
            }
            x2.c = x2.e = null;
          };
        }();
        function round(x2, sd, rm, r2) {
          var d, i2, j2, k2, n2, ni, rd, xc = x2.c, pows10 = POWS_TEN;
          if (xc) {
            out: {
              for (d = 1, k2 = xc[0]; k2 >= 10; k2 /= 10, d++)
                ;
              i2 = sd - d;
              if (i2 < 0) {
                i2 += LOG_BASE;
                j2 = sd;
                n2 = xc[ni = 0];
                rd = mathfloor(n2 / pows10[d - j2 - 1] % 10);
              } else {
                ni = mathceil((i2 + 1) / LOG_BASE);
                if (ni >= xc.length) {
                  if (r2) {
                    for (; xc.length <= ni; xc.push(0))
                      ;
                    n2 = rd = 0;
                    d = 1;
                    i2 %= LOG_BASE;
                    j2 = i2 - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  n2 = k2 = xc[ni];
                  for (d = 1; k2 >= 10; k2 /= 10, d++)
                    ;
                  i2 %= LOG_BASE;
                  j2 = i2 - LOG_BASE + d;
                  rd = j2 < 0 ? 0 : mathfloor(n2 / pows10[d - j2 - 1] % 10);
                }
              }
              r2 = r2 || sd < 0 || // Are there any non-zero digits after the rounding digit?
              // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
              // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
              xc[ni + 1] != null || (j2 < 0 ? n2 : n2 % pows10[d - j2 - 1]);
              r2 = rm < 4 ? (rd || r2) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || r2 || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
              (i2 > 0 ? j2 > 0 ? n2 / pows10[d - j2] : 0 : xc[ni - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
              if (sd < 1 || !xc[0]) {
                xc.length = 0;
                if (r2) {
                  sd -= x2.e + 1;
                  xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
                  x2.e = -sd || 0;
                } else {
                  xc[0] = x2.e = 0;
                }
                return x2;
              }
              if (i2 == 0) {
                xc.length = ni;
                k2 = 1;
                ni--;
              } else {
                xc.length = ni + 1;
                k2 = pows10[LOG_BASE - i2];
                xc[ni] = j2 > 0 ? mathfloor(n2 / pows10[d - j2] % pows10[j2]) * k2 : 0;
              }
              if (r2) {
                for (; ; ) {
                  if (ni == 0) {
                    for (i2 = 1, j2 = xc[0]; j2 >= 10; j2 /= 10, i2++)
                      ;
                    j2 = xc[0] += k2;
                    for (k2 = 1; j2 >= 10; j2 /= 10, k2++)
                      ;
                    if (i2 != k2) {
                      x2.e++;
                      if (xc[0] == BASE)
                        xc[0] = 1;
                    }
                    break;
                  } else {
                    xc[ni] += k2;
                    if (xc[ni] != BASE)
                      break;
                    xc[ni--] = 0;
                    k2 = 1;
                  }
                }
              }
              for (i2 = xc.length; xc[--i2] === 0; xc.pop())
                ;
            }
            if (x2.e > MAX_EXP) {
              x2.c = x2.e = null;
            } else if (x2.e < MIN_EXP) {
              x2.c = [x2.e = 0];
            }
          }
          return x2;
        }
        function valueOf(n2) {
          var str, e2 = n2.e;
          if (e2 === null)
            return n2.toString();
          str = coeffToString(n2.c);
          str = e2 <= TO_EXP_NEG || e2 >= TO_EXP_POS ? toExponential(str, e2) : toFixedPoint(str, e2, "0");
          return n2.s < 0 ? "-" + str : str;
        }
        P2.absoluteValue = P2.abs = function() {
          var x2 = new BigNumber2(this);
          if (x2.s < 0)
            x2.s = 1;
          return x2;
        };
        P2.comparedTo = function(y2, b2) {
          return compare(this, new BigNumber2(y2, b2));
        };
        P2.decimalPlaces = P2.dp = function(dp, rm) {
          var c2, n2, v2, x2 = this;
          if (dp != null) {
            intCheck(dp, 0, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x2), dp + x2.e + 1, rm);
          }
          if (!(c2 = x2.c))
            return null;
          n2 = ((v2 = c2.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;
          if (v2 = c2[v2])
            for (; v2 % 10 == 0; v2 /= 10, n2--)
              ;
          if (n2 < 0)
            n2 = 0;
          return n2;
        };
        P2.dividedBy = P2.div = function(y2, b2) {
          return div(this, new BigNumber2(y2, b2), DECIMAL_PLACES, ROUNDING_MODE);
        };
        P2.dividedToIntegerBy = P2.idiv = function(y2, b2) {
          return div(this, new BigNumber2(y2, b2), 0, 1);
        };
        P2.exponentiatedBy = P2.pow = function(n2, m2) {
          var half, isModExp, i2, k2, more, nIsBig, nIsNeg, nIsOdd, y2, x2 = this;
          n2 = new BigNumber2(n2);
          if (n2.c && !n2.isInteger()) {
            throw Error(bignumberError + "Exponent not an integer: " + valueOf(n2));
          }
          if (m2 != null)
            m2 = new BigNumber2(m2);
          nIsBig = n2.e > 14;
          if (!x2.c || !x2.c[0] || x2.c[0] == 1 && !x2.e && x2.c.length == 1 || !n2.c || !n2.c[0]) {
            y2 = new BigNumber2(Math.pow(+valueOf(x2), nIsBig ? n2.s * (2 - isOdd(n2)) : +valueOf(n2)));
            return m2 ? y2.mod(m2) : y2;
          }
          nIsNeg = n2.s < 0;
          if (m2) {
            if (m2.c ? !m2.c[0] : !m2.s)
              return new BigNumber2(NaN);
            isModExp = !nIsNeg && x2.isInteger() && m2.isInteger();
            if (isModExp)
              x2 = x2.mod(m2);
          } else if (n2.e > 9 && (x2.e > 0 || x2.e < -1 || (x2.e == 0 ? x2.c[0] > 1 || nIsBig && x2.c[1] >= 24e7 : x2.c[0] < 8e13 || nIsBig && x2.c[0] <= 9999975e7))) {
            k2 = x2.s < 0 && isOdd(n2) ? -0 : 0;
            if (x2.e > -1)
              k2 = 1 / k2;
            return new BigNumber2(nIsNeg ? 1 / k2 : k2);
          } else if (POW_PRECISION) {
            k2 = mathceil(POW_PRECISION / LOG_BASE + 2);
          }
          if (nIsBig) {
            half = new BigNumber2(0.5);
            if (nIsNeg)
              n2.s = 1;
            nIsOdd = isOdd(n2);
          } else {
            i2 = Math.abs(+valueOf(n2));
            nIsOdd = i2 % 2;
          }
          y2 = new BigNumber2(ONE);
          for (; ; ) {
            if (nIsOdd) {
              y2 = y2.times(x2);
              if (!y2.c)
                break;
              if (k2) {
                if (y2.c.length > k2)
                  y2.c.length = k2;
              } else if (isModExp) {
                y2 = y2.mod(m2);
              }
            }
            if (i2) {
              i2 = mathfloor(i2 / 2);
              if (i2 === 0)
                break;
              nIsOdd = i2 % 2;
            } else {
              n2 = n2.times(half);
              round(n2, n2.e + 1, 1);
              if (n2.e > 14) {
                nIsOdd = isOdd(n2);
              } else {
                i2 = +valueOf(n2);
                if (i2 === 0)
                  break;
                nIsOdd = i2 % 2;
              }
            }
            x2 = x2.times(x2);
            if (k2) {
              if (x2.c && x2.c.length > k2)
                x2.c.length = k2;
            } else if (isModExp) {
              x2 = x2.mod(m2);
            }
          }
          if (isModExp)
            return y2;
          if (nIsNeg)
            y2 = ONE.div(y2);
          return m2 ? y2.mod(m2) : k2 ? round(y2, POW_PRECISION, ROUNDING_MODE, more) : y2;
        };
        P2.integerValue = function(rm) {
          var n2 = new BigNumber2(this);
          if (rm == null)
            rm = ROUNDING_MODE;
          else
            intCheck(rm, 0, 8);
          return round(n2, n2.e + 1, rm);
        };
        P2.isEqualTo = P2.eq = function(y2, b2) {
          return compare(this, new BigNumber2(y2, b2)) === 0;
        };
        P2.isFinite = function() {
          return !!this.c;
        };
        P2.isGreaterThan = P2.gt = function(y2, b2) {
          return compare(this, new BigNumber2(y2, b2)) > 0;
        };
        P2.isGreaterThanOrEqualTo = P2.gte = function(y2, b2) {
          return (b2 = compare(this, new BigNumber2(y2, b2))) === 1 || b2 === 0;
        };
        P2.isInteger = function() {
          return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
        };
        P2.isLessThan = P2.lt = function(y2, b2) {
          return compare(this, new BigNumber2(y2, b2)) < 0;
        };
        P2.isLessThanOrEqualTo = P2.lte = function(y2, b2) {
          return (b2 = compare(this, new BigNumber2(y2, b2))) === -1 || b2 === 0;
        };
        P2.isNaN = function() {
          return !this.s;
        };
        P2.isNegative = function() {
          return this.s < 0;
        };
        P2.isPositive = function() {
          return this.s > 0;
        };
        P2.isZero = function() {
          return !!this.c && this.c[0] == 0;
        };
        P2.minus = function(y2, b2) {
          var i2, j2, t2, xLTy, x2 = this, a2 = x2.s;
          y2 = new BigNumber2(y2, b2);
          b2 = y2.s;
          if (!a2 || !b2)
            return new BigNumber2(NaN);
          if (a2 != b2) {
            y2.s = -b2;
            return x2.plus(y2);
          }
          var xe2 = x2.e / LOG_BASE, ye2 = y2.e / LOG_BASE, xc = x2.c, yc = y2.c;
          if (!xe2 || !ye2) {
            if (!xc || !yc)
              return xc ? (y2.s = -b2, y2) : new BigNumber2(yc ? x2 : NaN);
            if (!xc[0] || !yc[0]) {
              return yc[0] ? (y2.s = -b2, y2) : new BigNumber2(xc[0] ? x2 : (
                // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                ROUNDING_MODE == 3 ? -0 : 0
              ));
            }
          }
          xe2 = bitFloor(xe2);
          ye2 = bitFloor(ye2);
          xc = xc.slice();
          if (a2 = xe2 - ye2) {
            if (xLTy = a2 < 0) {
              a2 = -a2;
              t2 = xc;
            } else {
              ye2 = xe2;
              t2 = yc;
            }
            t2.reverse();
            for (b2 = a2; b2--; t2.push(0))
              ;
            t2.reverse();
          } else {
            j2 = (xLTy = (a2 = xc.length) < (b2 = yc.length)) ? a2 : b2;
            for (a2 = b2 = 0; b2 < j2; b2++) {
              if (xc[b2] != yc[b2]) {
                xLTy = xc[b2] < yc[b2];
                break;
              }
            }
          }
          if (xLTy) {
            t2 = xc;
            xc = yc;
            yc = t2;
            y2.s = -y2.s;
          }
          b2 = (j2 = yc.length) - (i2 = xc.length);
          if (b2 > 0)
            for (; b2--; xc[i2++] = 0)
              ;
          b2 = BASE - 1;
          for (; j2 > a2; ) {
            if (xc[--j2] < yc[j2]) {
              for (i2 = j2; i2 && !xc[--i2]; xc[i2] = b2)
                ;
              --xc[i2];
              xc[j2] += BASE;
            }
            xc[j2] -= yc[j2];
          }
          for (; xc[0] == 0; xc.splice(0, 1), --ye2)
            ;
          if (!xc[0]) {
            y2.s = ROUNDING_MODE == 3 ? -1 : 1;
            y2.c = [y2.e = 0];
            return y2;
          }
          return normalise(y2, xc, ye2);
        };
        P2.modulo = P2.mod = function(y2, b2) {
          var q2, s2, x2 = this;
          y2 = new BigNumber2(y2, b2);
          if (!x2.c || !y2.s || y2.c && !y2.c[0]) {
            return new BigNumber2(NaN);
          } else if (!y2.c || x2.c && !x2.c[0]) {
            return new BigNumber2(x2);
          }
          if (MODULO_MODE == 9) {
            s2 = y2.s;
            y2.s = 1;
            q2 = div(x2, y2, 0, 3);
            y2.s = s2;
            q2.s *= s2;
          } else {
            q2 = div(x2, y2, 0, MODULO_MODE);
          }
          y2 = x2.minus(q2.times(y2));
          if (!y2.c[0] && MODULO_MODE == 1)
            y2.s = x2.s;
          return y2;
        };
        P2.multipliedBy = P2.times = function(y2, b2) {
          var c2, e2, i2, j2, k2, m2, xcL, xlo, xhi, ycL, ylo, yhi, zc, base, sqrtBase, x2 = this, xc = x2.c, yc = (y2 = new BigNumber2(y2, b2)).c;
          if (!xc || !yc || !xc[0] || !yc[0]) {
            if (!x2.s || !y2.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
              y2.c = y2.e = y2.s = null;
            } else {
              y2.s *= x2.s;
              if (!xc || !yc) {
                y2.c = y2.e = null;
              } else {
                y2.c = [0];
                y2.e = 0;
              }
            }
            return y2;
          }
          e2 = bitFloor(x2.e / LOG_BASE) + bitFloor(y2.e / LOG_BASE);
          y2.s *= x2.s;
          xcL = xc.length;
          ycL = yc.length;
          if (xcL < ycL) {
            zc = xc;
            xc = yc;
            yc = zc;
            i2 = xcL;
            xcL = ycL;
            ycL = i2;
          }
          for (i2 = xcL + ycL, zc = []; i2--; zc.push(0))
            ;
          base = BASE;
          sqrtBase = SQRT_BASE;
          for (i2 = ycL; --i2 >= 0; ) {
            c2 = 0;
            ylo = yc[i2] % sqrtBase;
            yhi = yc[i2] / sqrtBase | 0;
            for (k2 = xcL, j2 = i2 + k2; j2 > i2; ) {
              xlo = xc[--k2] % sqrtBase;
              xhi = xc[k2] / sqrtBase | 0;
              m2 = yhi * xlo + xhi * ylo;
              xlo = ylo * xlo + m2 % sqrtBase * sqrtBase + zc[j2] + c2;
              c2 = (xlo / base | 0) + (m2 / sqrtBase | 0) + yhi * xhi;
              zc[j2--] = xlo % base;
            }
            zc[j2] = c2;
          }
          if (c2) {
            ++e2;
          } else {
            zc.splice(0, 1);
          }
          return normalise(y2, zc, e2);
        };
        P2.negated = function() {
          var x2 = new BigNumber2(this);
          x2.s = -x2.s || null;
          return x2;
        };
        P2.plus = function(y2, b2) {
          var t2, x2 = this, a2 = x2.s;
          y2 = new BigNumber2(y2, b2);
          b2 = y2.s;
          if (!a2 || !b2)
            return new BigNumber2(NaN);
          if (a2 != b2) {
            y2.s = -b2;
            return x2.minus(y2);
          }
          var xe2 = x2.e / LOG_BASE, ye2 = y2.e / LOG_BASE, xc = x2.c, yc = y2.c;
          if (!xe2 || !ye2) {
            if (!xc || !yc)
              return new BigNumber2(a2 / 0);
            if (!xc[0] || !yc[0])
              return yc[0] ? y2 : new BigNumber2(xc[0] ? x2 : a2 * 0);
          }
          xe2 = bitFloor(xe2);
          ye2 = bitFloor(ye2);
          xc = xc.slice();
          if (a2 = xe2 - ye2) {
            if (a2 > 0) {
              ye2 = xe2;
              t2 = yc;
            } else {
              a2 = -a2;
              t2 = xc;
            }
            t2.reverse();
            for (; a2--; t2.push(0))
              ;
            t2.reverse();
          }
          a2 = xc.length;
          b2 = yc.length;
          if (a2 - b2 < 0) {
            t2 = yc;
            yc = xc;
            xc = t2;
            b2 = a2;
          }
          for (a2 = 0; b2; ) {
            a2 = (xc[--b2] = xc[b2] + yc[b2] + a2) / BASE | 0;
            xc[b2] = BASE === xc[b2] ? 0 : xc[b2] % BASE;
          }
          if (a2) {
            xc = [a2].concat(xc);
            ++ye2;
          }
          return normalise(y2, xc, ye2);
        };
        P2.precision = P2.sd = function(sd, rm) {
          var c2, n2, v2, x2 = this;
          if (sd != null && sd !== !!sd) {
            intCheck(sd, 1, MAX);
            if (rm == null)
              rm = ROUNDING_MODE;
            else
              intCheck(rm, 0, 8);
            return round(new BigNumber2(x2), sd, rm);
          }
          if (!(c2 = x2.c))
            return null;
          v2 = c2.length - 1;
          n2 = v2 * LOG_BASE + 1;
          if (v2 = c2[v2]) {
            for (; v2 % 10 == 0; v2 /= 10, n2--)
              ;
            for (v2 = c2[0]; v2 >= 10; v2 /= 10, n2++)
              ;
          }
          if (sd && x2.e + 1 > n2)
            n2 = x2.e + 1;
          return n2;
        };
        P2.shiftedBy = function(k2) {
          intCheck(k2, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
          return this.times("1e" + k2);
        };
        P2.squareRoot = P2.sqrt = function() {
          var m2, n2, r2, rep, t2, x2 = this, c2 = x2.c, s2 = x2.s, e2 = x2.e, dp = DECIMAL_PLACES + 4, half = new BigNumber2("0.5");
          if (s2 !== 1 || !c2 || !c2[0]) {
            return new BigNumber2(!s2 || s2 < 0 && (!c2 || c2[0]) ? NaN : c2 ? x2 : 1 / 0);
          }
          s2 = Math.sqrt(+valueOf(x2));
          if (s2 == 0 || s2 == 1 / 0) {
            n2 = coeffToString(c2);
            if ((n2.length + e2) % 2 == 0)
              n2 += "0";
            s2 = Math.sqrt(+n2);
            e2 = bitFloor((e2 + 1) / 2) - (e2 < 0 || e2 % 2);
            if (s2 == 1 / 0) {
              n2 = "5e" + e2;
            } else {
              n2 = s2.toExponential();
              n2 = n2.slice(0, n2.indexOf("e") + 1) + e2;
            }
            r2 = new BigNumber2(n2);
          } else {
            r2 = new BigNumber2(s2 + "");
          }
          if (r2.c[0]) {
            e2 = r2.e;
            s2 = e2 + dp;
            if (s2 < 3)
              s2 = 0;
            for (; ; ) {
              t2 = r2;
              r2 = half.times(t2.plus(div(x2, t2, dp, 1)));
              if (coeffToString(t2.c).slice(0, s2) === (n2 = coeffToString(r2.c)).slice(0, s2)) {
                if (r2.e < e2)
                  --s2;
                n2 = n2.slice(s2 - 3, s2 + 1);
                if (n2 == "9999" || !rep && n2 == "4999") {
                  if (!rep) {
                    round(t2, t2.e + DECIMAL_PLACES + 2, 0);
                    if (t2.times(t2).eq(x2)) {
                      r2 = t2;
                      break;
                    }
                  }
                  dp += 4;
                  s2 += 4;
                  rep = 1;
                } else {
                  if (!+n2 || !+n2.slice(1) && n2.charAt(0) == "5") {
                    round(r2, r2.e + DECIMAL_PLACES + 2, 1);
                    m2 = !r2.times(r2).eq(x2);
                  }
                  break;
                }
              }
            }
          }
          return round(r2, r2.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m2);
        };
        P2.toExponential = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp++;
          }
          return format(this, dp, rm, 1);
        };
        P2.toFixed = function(dp, rm) {
          if (dp != null) {
            intCheck(dp, 0, MAX);
            dp = dp + this.e + 1;
          }
          return format(this, dp, rm);
        };
        P2.toFormat = function(dp, rm, format2) {
          var str, x2 = this;
          if (format2 == null) {
            if (dp != null && rm && typeof rm == "object") {
              format2 = rm;
              rm = null;
            } else if (dp && typeof dp == "object") {
              format2 = dp;
              dp = rm = null;
            } else {
              format2 = FORMAT;
            }
          } else if (typeof format2 != "object") {
            throw Error(bignumberError + "Argument not an object: " + format2);
          }
          str = x2.toFixed(dp, rm);
          if (x2.c) {
            var i2, arr = str.split("."), g1 = +format2.groupSize, g2 = +format2.secondaryGroupSize, groupSeparator = format2.groupSeparator || "", intPart = arr[0], fractionPart = arr[1], isNeg = x2.s < 0, intDigits = isNeg ? intPart.slice(1) : intPart, len = intDigits.length;
            if (g2) {
              i2 = g1;
              g1 = g2;
              g2 = i2;
              len -= i2;
            }
            if (g1 > 0 && len > 0) {
              i2 = len % g1 || g1;
              intPart = intDigits.substr(0, i2);
              for (; i2 < len; i2 += g1)
                intPart += groupSeparator + intDigits.substr(i2, g1);
              if (g2 > 0)
                intPart += groupSeparator + intDigits.slice(i2);
              if (isNeg)
                intPart = "-" + intPart;
            }
            str = fractionPart ? intPart + (format2.decimalSeparator || "") + ((g2 = +format2.fractionGroupSize) ? fractionPart.replace(
              new RegExp("\\d{" + g2 + "}\\B", "g"),
              "$&" + (format2.fractionGroupSeparator || "")
            ) : fractionPart) : intPart;
          }
          return (format2.prefix || "") + str + (format2.suffix || "");
        };
        P2.toFraction = function(md) {
          var d, d0, d1, d2, e2, exp, n2, n0, n1, q2, r2, s2, x2 = this, xc = x2.c;
          if (md != null) {
            n2 = new BigNumber2(md);
            if (!n2.isInteger() && (n2.c || n2.s !== 1) || n2.lt(ONE)) {
              throw Error(bignumberError + "Argument " + (n2.isInteger() ? "out of range: " : "not an integer: ") + valueOf(n2));
            }
          }
          if (!xc)
            return new BigNumber2(x2);
          d = new BigNumber2(ONE);
          n1 = d0 = new BigNumber2(ONE);
          d1 = n0 = new BigNumber2(ONE);
          s2 = coeffToString(xc);
          e2 = d.e = s2.length - x2.e - 1;
          d.c[0] = POWS_TEN[(exp = e2 % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
          md = !md || n2.comparedTo(d) > 0 ? e2 > 0 ? d : n1 : n2;
          exp = MAX_EXP;
          MAX_EXP = 1 / 0;
          n2 = new BigNumber2(s2);
          n0.c[0] = 0;
          for (; ; ) {
            q2 = div(n2, d, 0, 1);
            d2 = d0.plus(q2.times(d1));
            if (d2.comparedTo(md) == 1)
              break;
            d0 = d1;
            d1 = d2;
            n1 = n0.plus(q2.times(d2 = n1));
            n0 = d2;
            d = n2.minus(q2.times(d2 = d));
            n2 = d2;
          }
          d2 = div(md.minus(d0), d1, 0, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x2.s;
          e2 = e2 * 2;
          r2 = div(n1, d1, e2, ROUNDING_MODE).minus(x2).abs().comparedTo(
            div(n0, d0, e2, ROUNDING_MODE).minus(x2).abs()
          ) < 1 ? [n1, d1] : [n0, d0];
          MAX_EXP = exp;
          return r2;
        };
        P2.toNumber = function() {
          return +valueOf(this);
        };
        P2.toPrecision = function(sd, rm) {
          if (sd != null)
            intCheck(sd, 1, MAX);
          return format(this, sd, rm, 2);
        };
        P2.toString = function(b2) {
          var str, n2 = this, s2 = n2.s, e2 = n2.e;
          if (e2 === null) {
            if (s2) {
              str = "Infinity";
              if (s2 < 0)
                str = "-" + str;
            } else {
              str = "NaN";
            }
          } else {
            if (b2 == null) {
              str = e2 <= TO_EXP_NEG || e2 >= TO_EXP_POS ? toExponential(coeffToString(n2.c), e2) : toFixedPoint(coeffToString(n2.c), e2, "0");
            } else if (b2 === 10 && alphabetHasNormalDecimalDigits) {
              n2 = round(new BigNumber2(n2), DECIMAL_PLACES + e2 + 1, ROUNDING_MODE);
              str = toFixedPoint(coeffToString(n2.c), n2.e, "0");
            } else {
              intCheck(b2, 2, ALPHABET.length, "Base");
              str = convertBase(toFixedPoint(coeffToString(n2.c), e2, "0"), 10, b2, s2, true);
            }
            if (s2 < 0 && n2.c[0])
              str = "-" + str;
          }
          return str;
        };
        P2.valueOf = P2.toJSON = function() {
          return valueOf(this);
        };
        P2._isBigNumber = true;
        if (configObject != null)
          BigNumber2.set(configObject);
        return BigNumber2;
      }
      function bitFloor(n2) {
        var i2 = n2 | 0;
        return n2 > 0 || n2 === i2 ? i2 : i2 - 1;
      }
      function coeffToString(a2) {
        var s2, z2, i2 = 1, j2 = a2.length, r2 = a2[0] + "";
        for (; i2 < j2; ) {
          s2 = a2[i2++] + "";
          z2 = LOG_BASE - s2.length;
          for (; z2--; s2 = "0" + s2)
            ;
          r2 += s2;
        }
        for (j2 = r2.length; r2.charCodeAt(--j2) === 48; )
          ;
        return r2.slice(0, j2 + 1 || 1);
      }
      function compare(x2, y2) {
        var a2, b2, xc = x2.c, yc = y2.c, i2 = x2.s, j2 = y2.s, k2 = x2.e, l2 = y2.e;
        if (!i2 || !j2)
          return null;
        a2 = xc && !xc[0];
        b2 = yc && !yc[0];
        if (a2 || b2)
          return a2 ? b2 ? 0 : -j2 : i2;
        if (i2 != j2)
          return i2;
        a2 = i2 < 0;
        b2 = k2 == l2;
        if (!xc || !yc)
          return b2 ? 0 : !xc ^ a2 ? 1 : -1;
        if (!b2)
          return k2 > l2 ^ a2 ? 1 : -1;
        j2 = (k2 = xc.length) < (l2 = yc.length) ? k2 : l2;
        for (i2 = 0; i2 < j2; i2++)
          if (xc[i2] != yc[i2])
            return xc[i2] > yc[i2] ^ a2 ? 1 : -1;
        return k2 == l2 ? 0 : k2 > l2 ^ a2 ? 1 : -1;
      }
      function intCheck(n2, min, max, name) {
        if (n2 < min || n2 > max || n2 !== mathfloor(n2)) {
          throw Error(bignumberError + (name || "Argument") + (typeof n2 == "number" ? n2 < min || n2 > max ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(n2));
        }
      }
      function isOdd(n2) {
        var k2 = n2.c.length - 1;
        return bitFloor(n2.e / LOG_BASE) == k2 && n2.c[k2] % 2 != 0;
      }
      function toExponential(str, e2) {
        return (str.length > 1 ? str.charAt(0) + "." + str.slice(1) : str) + (e2 < 0 ? "e" : "e+") + e2;
      }
      function toFixedPoint(str, e2, z2) {
        var len, zs;
        if (e2 < 0) {
          for (zs = z2 + "."; ++e2; zs += z2)
            ;
          str = zs + str;
        } else {
          len = str.length;
          if (++e2 > len) {
            for (zs = z2, e2 -= len; --e2; zs += z2)
              ;
            str += zs;
          } else if (e2 < len) {
            str = str.slice(0, e2) + "." + str.slice(e2);
          }
        }
        return str;
      }
      BigNumber = clone();
      BigNumber["default"] = BigNumber.BigNumber = BigNumber;
      if (typeof define == "function" && define.amd) {
        define(function() {
          return BigNumber;
        });
      } else if (typeof module2 != "undefined" && module2.exports) {
        module2.exports = BigNumber;
      } else {
        if (!globalObject) {
          globalObject = typeof self != "undefined" && self ? self : window;
        }
        globalObject.BigNumber = BigNumber;
      }
    })(exports);
  }
});

// ../../node_modules/json-bigint/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/json-bigint/lib/stringify.js"(exports, module2) {
    var BigNumber = require_bignumber();
    var JSON2 = module2.exports;
    (function() {
      "use strict";
      function f2(n2) {
        return n2 < 10 ? "0" + n2 : n2;
      }
      var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        // table of character substitutions
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
      }, rep;
      function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a2) {
          var c2 = meta[a2];
          return typeof c2 === "string" ? c2 : "\\u" + ("0000" + a2.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
      }
      function str(key, holder) {
        var i2, k2, v2, length, mind = gap, partial, value = holder[key], isBigNumber = value != null && (value instanceof BigNumber || BigNumber.isBigNumber(value));
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
          value = value.toJSON(key);
        }
        if (typeof rep === "function") {
          value = rep.call(holder, key, value);
        }
        switch (typeof value) {
          case "string":
            if (isBigNumber) {
              return value;
            } else {
              return quote(value);
            }
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
          case "bigint":
            return String(value);
          case "object":
            if (!value) {
              return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
              length = value.length;
              for (i2 = 0; i2 < length; i2 += 1) {
                partial[i2] = str(i2, value) || "null";
              }
              v2 = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
              gap = mind;
              return v2;
            }
            if (rep && typeof rep === "object") {
              length = rep.length;
              for (i2 = 0; i2 < length; i2 += 1) {
                if (typeof rep[i2] === "string") {
                  k2 = rep[i2];
                  v2 = str(k2, value);
                  if (v2) {
                    partial.push(quote(k2) + (gap ? ": " : ":") + v2);
                  }
                }
              }
            } else {
              Object.keys(value).forEach(function(k3) {
                var v3 = str(k3, value);
                if (v3) {
                  partial.push(quote(k3) + (gap ? ": " : ":") + v3);
                }
              });
            }
            v2 = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v2;
        }
      }
      if (typeof JSON2.stringify !== "function") {
        JSON2.stringify = function(value, replacer, space) {
          var i2;
          gap = "";
          indent = "";
          if (typeof space === "number") {
            for (i2 = 0; i2 < space; i2 += 1) {
              indent += " ";
            }
          } else if (typeof space === "string") {
            indent = space;
          }
          rep = replacer;
          if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
            throw new Error("JSON.stringify");
          }
          return str("", { "": value });
        };
      }
    })();
  }
});

// ../../node_modules/json-bigint/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/json-bigint/lib/parse.js"(exports, module2) {
    var BigNumber = null;
    var suspectProtoRx = /(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])/;
    var suspectConstructorRx = /(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)/;
    var json_parse = function(options) {
      "use strict";
      var _options = {
        strict: false,
        // not being strict means do not generate syntax errors for "duplicate key"
        storeAsString: false,
        // toggles whether the values should be stored as BigNumber (default) or a string
        alwaysParseAsBig: false,
        // toggles whether all numbers should be Big
        useNativeBigInt: false,
        // toggles whether to use native BigInt instead of bignumber.js
        protoAction: "error",
        constructorAction: "error"
      };
      if (options !== void 0 && options !== null) {
        if (options.strict === true) {
          _options.strict = true;
        }
        if (options.storeAsString === true) {
          _options.storeAsString = true;
        }
        _options.alwaysParseAsBig = options.alwaysParseAsBig === true ? options.alwaysParseAsBig : false;
        _options.useNativeBigInt = options.useNativeBigInt === true ? options.useNativeBigInt : false;
        if (typeof options.constructorAction !== "undefined") {
          if (options.constructorAction === "error" || options.constructorAction === "ignore" || options.constructorAction === "preserve") {
            _options.constructorAction = options.constructorAction;
          } else {
            throw new Error(
              `Incorrect value for constructorAction option, must be "error", "ignore" or undefined but passed ${options.constructorAction}`
            );
          }
        }
        if (typeof options.protoAction !== "undefined") {
          if (options.protoAction === "error" || options.protoAction === "ignore" || options.protoAction === "preserve") {
            _options.protoAction = options.protoAction;
          } else {
            throw new Error(
              `Incorrect value for protoAction option, must be "error", "ignore" or undefined but passed ${options.protoAction}`
            );
          }
        }
      }
      var at, ch, escapee = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "	"
      }, text, error = function(m2) {
        throw {
          name: "SyntaxError",
          message: m2,
          at,
          text
        };
      }, next = function(c2) {
        if (c2 && c2 !== ch) {
          error("Expected '" + c2 + "' instead of '" + ch + "'");
        }
        ch = text.charAt(at);
        at += 1;
        return ch;
      }, number = function() {
        var number2, string2 = "";
        if (ch === "-") {
          string2 = "-";
          next("-");
        }
        while (ch >= "0" && ch <= "9") {
          string2 += ch;
          next();
        }
        if (ch === ".") {
          string2 += ".";
          while (next() && ch >= "0" && ch <= "9") {
            string2 += ch;
          }
        }
        if (ch === "e" || ch === "E") {
          string2 += ch;
          next();
          if (ch === "-" || ch === "+") {
            string2 += ch;
            next();
          }
          while (ch >= "0" && ch <= "9") {
            string2 += ch;
            next();
          }
        }
        number2 = +string2;
        if (!isFinite(number2)) {
          error("Bad number");
        } else {
          if (BigNumber == null)
            BigNumber = require_bignumber();
          if (string2.length > 15)
            return _options.storeAsString ? string2 : _options.useNativeBigInt ? BigInt(string2) : new BigNumber(string2);
          else
            return !_options.alwaysParseAsBig ? number2 : _options.useNativeBigInt ? BigInt(number2) : new BigNumber(number2);
        }
      }, string = function() {
        var hex, i2, string2 = "", uffff;
        if (ch === '"') {
          var startAt = at;
          while (next()) {
            if (ch === '"') {
              if (at - 1 > startAt)
                string2 += text.substring(startAt, at - 1);
              next();
              return string2;
            }
            if (ch === "\\") {
              if (at - 1 > startAt)
                string2 += text.substring(startAt, at - 1);
              next();
              if (ch === "u") {
                uffff = 0;
                for (i2 = 0; i2 < 4; i2 += 1) {
                  hex = parseInt(next(), 16);
                  if (!isFinite(hex)) {
                    break;
                  }
                  uffff = uffff * 16 + hex;
                }
                string2 += String.fromCharCode(uffff);
              } else if (typeof escapee[ch] === "string") {
                string2 += escapee[ch];
              } else {
                break;
              }
              startAt = at;
            }
          }
        }
        error("Bad string");
      }, white = function() {
        while (ch && ch <= " ") {
          next();
        }
      }, word = function() {
        switch (ch) {
          case "t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
          case "f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
          case "n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
        }
        error("Unexpected '" + ch + "'");
      }, value, array = function() {
        var array2 = [];
        if (ch === "[") {
          next("[");
          white();
          if (ch === "]") {
            next("]");
            return array2;
          }
          while (ch) {
            array2.push(value());
            white();
            if (ch === "]") {
              next("]");
              return array2;
            }
            next(",");
            white();
          }
        }
        error("Bad array");
      }, object = function() {
        var key, object2 = /* @__PURE__ */ Object.create(null);
        if (ch === "{") {
          next("{");
          white();
          if (ch === "}") {
            next("}");
            return object2;
          }
          while (ch) {
            key = string();
            white();
            next(":");
            if (_options.strict === true && Object.hasOwnProperty.call(object2, key)) {
              error('Duplicate key "' + key + '"');
            }
            if (suspectProtoRx.test(key) === true) {
              if (_options.protoAction === "error") {
                error("Object contains forbidden prototype property");
              } else if (_options.protoAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else if (suspectConstructorRx.test(key) === true) {
              if (_options.constructorAction === "error") {
                error("Object contains forbidden constructor property");
              } else if (_options.constructorAction === "ignore") {
                value();
              } else {
                object2[key] = value();
              }
            } else {
              object2[key] = value();
            }
            white();
            if (ch === "}") {
              next("}");
              return object2;
            }
            next(",");
            white();
          }
        }
        error("Bad object");
      };
      value = function() {
        white();
        switch (ch) {
          case "{":
            return object();
          case "[":
            return array();
          case '"':
            return string();
          case "-":
            return number();
          default:
            return ch >= "0" && ch <= "9" ? number() : word();
        }
      };
      return function(source, reviver) {
        var result;
        text = source + "";
        at = 0;
        ch = " ";
        result = value();
        white();
        if (ch) {
          error("Syntax error");
        }
        return typeof reviver === "function" ? function walk(holder, key) {
          var k2, v2, value2 = holder[key];
          if (value2 && typeof value2 === "object") {
            Object.keys(value2).forEach(function(k3) {
              v2 = walk(value2, k3);
              if (v2 !== void 0) {
                value2[k3] = v2;
              } else {
                delete value2[k3];
              }
            });
          }
          return reviver.call(holder, key, value2);
        }({ "": result }, "") : result;
      };
    };
    module2.exports = json_parse;
  }
});

// ../../node_modules/json-bigint/index.js
var require_json_bigint = __commonJS({
  "../../node_modules/json-bigint/index.js"(exports, module2) {
    var json_stringify = require_stringify().stringify;
    var json_parse = require_parse();
    module2.exports = function(options) {
      return {
        parse: json_parse(options),
        stringify: json_stringify
      };
    };
    module2.exports.parse = json_parse();
    module2.exports.stringify = json_stringify;
  }
});

// ../../node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b2 = "function" === typeof Symbol && Symbol.for;
    var c2 = b2 ? Symbol.for("react.element") : 60103;
    var d = b2 ? Symbol.for("react.portal") : 60106;
    var e2 = b2 ? Symbol.for("react.fragment") : 60107;
    var f2 = b2 ? Symbol.for("react.strict_mode") : 60108;
    var g2 = b2 ? Symbol.for("react.profiler") : 60114;
    var h = b2 ? Symbol.for("react.provider") : 60109;
    var k2 = b2 ? Symbol.for("react.context") : 60110;
    var l2 = b2 ? Symbol.for("react.async_mode") : 60111;
    var m2 = b2 ? Symbol.for("react.concurrent_mode") : 60111;
    var n2 = b2 ? Symbol.for("react.forward_ref") : 60112;
    var p = b2 ? Symbol.for("react.suspense") : 60113;
    var q2 = b2 ? Symbol.for("react.suspense_list") : 60120;
    var r2 = b2 ? Symbol.for("react.memo") : 60115;
    var t2 = b2 ? Symbol.for("react.lazy") : 60116;
    var v2 = b2 ? Symbol.for("react.block") : 60121;
    var w2 = b2 ? Symbol.for("react.fundamental") : 60117;
    var x2 = b2 ? Symbol.for("react.responder") : 60118;
    var y2 = b2 ? Symbol.for("react.scope") : 60119;
    function z2(a2) {
      if ("object" === typeof a2 && null !== a2) {
        var u2 = a2.$$typeof;
        switch (u2) {
          case c2:
            switch (a2 = a2.type, a2) {
              case l2:
              case m2:
              case e2:
              case g2:
              case f2:
              case p:
                return a2;
              default:
                switch (a2 = a2 && a2.$$typeof, a2) {
                  case k2:
                  case n2:
                  case t2:
                  case r2:
                  case h:
                    return a2;
                  default:
                    return u2;
                }
            }
          case d:
            return u2;
        }
      }
    }
    function A2(a2) {
      return z2(a2) === m2;
    }
    exports.AsyncMode = l2;
    exports.ConcurrentMode = m2;
    exports.ContextConsumer = k2;
    exports.ContextProvider = h;
    exports.Element = c2;
    exports.ForwardRef = n2;
    exports.Fragment = e2;
    exports.Lazy = t2;
    exports.Memo = r2;
    exports.Portal = d;
    exports.Profiler = g2;
    exports.StrictMode = f2;
    exports.Suspense = p;
    exports.isAsyncMode = function(a2) {
      return A2(a2) || z2(a2) === l2;
    };
    exports.isConcurrentMode = A2;
    exports.isContextConsumer = function(a2) {
      return z2(a2) === k2;
    };
    exports.isContextProvider = function(a2) {
      return z2(a2) === h;
    };
    exports.isElement = function(a2) {
      return "object" === typeof a2 && null !== a2 && a2.$$typeof === c2;
    };
    exports.isForwardRef = function(a2) {
      return z2(a2) === n2;
    };
    exports.isFragment = function(a2) {
      return z2(a2) === e2;
    };
    exports.isLazy = function(a2) {
      return z2(a2) === t2;
    };
    exports.isMemo = function(a2) {
      return z2(a2) === r2;
    };
    exports.isPortal = function(a2) {
      return z2(a2) === d;
    };
    exports.isProfiler = function(a2) {
      return z2(a2) === g2;
    };
    exports.isStrictMode = function(a2) {
      return z2(a2) === f2;
    };
    exports.isSuspense = function(a2) {
      return z2(a2) === p;
    };
    exports.isValidElementType = function(a2) {
      return "string" === typeof a2 || "function" === typeof a2 || a2 === e2 || a2 === m2 || a2 === g2 || a2 === f2 || a2 === p || a2 === q2 || "object" === typeof a2 && null !== a2 && (a2.$$typeof === t2 || a2.$$typeof === r2 || a2.$$typeof === h || a2.$$typeof === k2 || a2.$$typeof === n2 || a2.$$typeof === w2 || a2.$$typeof === x2 || a2.$$typeof === y2 || a2.$$typeof === v2);
    };
    exports.typeOf = z2;
  }
});

// ../../node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/react-is/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_is_production_min();
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/shallowequal/index.js
var require_shallowequal = __commonJS({
  "../../node_modules/shallowequal/index.js"(exports, module2) {
    module2.exports = function shallowEqual(objA, objB, compare, compareContext) {
      var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
      if (ret !== void 0) {
        return !!ret;
      }
      if (objA === objB) {
        return true;
      }
      if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
        return false;
      }
      var keysA = Object.keys(objA);
      var keysB = Object.keys(objB);
      if (keysA.length !== keysB.length) {
        return false;
      }
      var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
      for (var idx = 0; idx < keysA.length; idx++) {
        var key = keysA[idx];
        if (!bHasOwnProperty(key)) {
          return false;
        }
        var valueA = objA[key];
        var valueB = objB[key];
        ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (ret === false || ret === void 0 && valueA !== valueB) {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "../../node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module2) {
    "use strict";
    var reactIs = require_react_is();
    var REACT_STATICS = {
      childContextTypes: true,
      contextType: true,
      contextTypes: true,
      defaultProps: true,
      displayName: true,
      getDefaultProps: true,
      getDerivedStateFromError: true,
      getDerivedStateFromProps: true,
      mixins: true,
      propTypes: true,
      type: true
    };
    var KNOWN_STATICS = {
      name: true,
      length: true,
      prototype: true,
      caller: true,
      callee: true,
      arguments: true,
      arity: true
    };
    var FORWARD_REF_STATICS = {
      "$$typeof": true,
      render: true,
      defaultProps: true,
      displayName: true,
      propTypes: true
    };
    var MEMO_STATICS = {
      "$$typeof": true,
      compare: true,
      defaultProps: true,
      displayName: true,
      propTypes: true,
      type: true
    };
    var TYPE_STATICS = {};
    TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
    TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
    function getStatics(component) {
      if (reactIs.isMemo(component)) {
        return MEMO_STATICS;
      }
      return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
    }
    var defineProperty = Object.defineProperty;
    var getOwnPropertyNames = Object.getOwnPropertyNames;
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectPrototype = Object.prototype;
    function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
      if (typeof sourceComponent !== "string") {
        if (objectPrototype) {
          var inheritedComponent = getPrototypeOf(sourceComponent);
          if (inheritedComponent && inheritedComponent !== objectPrototype) {
            hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
          }
        }
        var keys = getOwnPropertyNames(sourceComponent);
        if (getOwnPropertySymbols) {
          keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }
        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);
        for (var i2 = 0; i2 < keys.length; ++i2) {
          var key = keys[i2];
          if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
            var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
            try {
              defineProperty(targetComponent, key, descriptor);
            } catch (e2) {
            }
          }
        }
      }
      return targetComponent;
    }
    module2.exports = hoistNonReactStatics;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Secp256R1PCD: () => Secp256R1PCD,
  Secp256R1PCDPackage: () => Secp256R1PCDPackage,
  Secp256R1PCDTypeName: () => Secp256R1PCDTypeName,
  deserialize: () => deserialize,
  prove: () => prove,
  serialize: () => serialize,
  verify: () => verify
});
module.exports = __toCommonJS(src_exports);

// src/secp256r1.ts
var import_backend_barretenberg = require("@noir-lang/backend_barretenberg");
var import_noir_js = require("@noir-lang/noir_js");
var import_util = require("@pcd/util");
var import_json_bigint = __toESM(require_json_bigint());

// ../../node_modules/uuid/dist/esm-node/rng.js
var import_crypto = __toESM(require("crypto"));
var rnds8Pool = new Uint8Array(256);
var poolPtr = rnds8Pool.length;
function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    import_crypto.default.randomFillSync(rnds8Pool);
    poolPtr = 0;
  }
  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

// ../../node_modules/uuid/dist/esm-node/stringify.js
var byteToHex = [];
for (let i2 = 0; i2 < 256; ++i2) {
  byteToHex.push((i2 + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

// ../../node_modules/uuid/dist/esm-node/native.js
var import_crypto2 = __toESM(require("crypto"));
var native_default = {
  randomUUID: import_crypto2.default.randomUUID
};

// ../../node_modules/uuid/dist/esm-node/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i2 = 0; i2 < 16; ++i2) {
      buf[offset + i2] = rnds[i2];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// circuits/target/ecdsa_secp256r1.json
var ecdsa_secp256r1_default = { backend: "acvm-backend-barretenberg", abi: { parameters: [{ name: "hashed_message", type: { kind: "array", length: 32, type: { kind: "integer", sign: "unsigned", width: 8 } }, visibility: "private" }, { name: "pub_key_x", type: { kind: "array", length: 32, type: { kind: "integer", sign: "unsigned", width: 8 } }, visibility: "private" }, { name: "pub_key_y", type: { kind: "array", length: 32, type: { kind: "integer", sign: "unsigned", width: 8 } }, visibility: "private" }, { name: "signature", type: { kind: "array", length: 64, type: { kind: "integer", sign: "unsigned", width: 8 } }, visibility: "private" }], param_witnesses: { hashed_message: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], pub_key_x: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64], pub_key_y: [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96], signature: [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160] }, return_type: null, return_witnesses: [] }, bytecode: "H4sIAAAAAAAA/+WYWXNUVRRGbyIiiIiIiIiYEBEjIvaYdCNiExEjIiIiIiImkY5xnucpzjggIiIiIsEHf6fu6r0qnfXKQx64ValTC6qSc/f0fXf/UxTFv0Xn6fn/pzfPRV3cK75CvEB8pXih+CrxIvFi8dXiJeJrxEvF14qXia8TLxdfL14hvkG8UnyjeJX4JvFq8c3iNeJbxGvFt4r7xP3JkbciuSjm5ntB/v/CrvwtztwsyRwszVgvy5guz9ityBitzFisyndene+2Jt9hbd61L+/A31+n+w6IbxOvF98u3iC+QzwovlO8UXyXeJP4bvFm8T3ikrgsroir4pq4Lh4SD4sb4qZ4i/he8VbxfeJt4vvFrWK2HuPf+ovOE3UwkPlen3ndkPkbzDxtzHxsyrhvzviWMo6VjFct4zKU79/I99yS77M1770t79fqut923XdE/IB4h/hB8U7xQ+JR8cPiXeJHxLvFj4r3iB8T7xU/Lt4nfkK8X/yk+ID4KfFB8dPiQ+JnxIfFz4qPiJ8TjxWz9ci8jCfqYCTzvSPzujPzN5p52pX52J1x35Px3Ztx3Jfx2p9xOZDvfzDf81C+z+G895G831jX/cZ13wnx8+Kj4rZ4UvyCeEr8ovgl8cviV8Svil8Tvy5+Q/ym+C3x2+J3xO+K3xO/L/5A/KH4I/HH4k/En4o/E38unhZ/If5S/JX4a/E34m/F34mPib8X/yD+UfyT+Lj4Z/EJ8S/ik+JfxafEv4lPi38XnxH/IT4r/lN8TvyX+Lz4b/EF8UwxO4/Cm7WKzjNedHo/+j16PPo6ejn6d6ro9Gn0ZvRj9GD0XfRa9Ff0VPRR9E70S/RI9EX0QtR/1HzUedR21HPUcNRt1GrU53TRqcOovai3qLGoq6ilqJ+omaiTqI2oh6iB45nrE5nTk5m7U5mj05mLMxnzsxnbcxnD8xmrCxmTiE940v6Mx7qM00Ce+ET8Ib4QP4gPHMwT34ffw+fh7/B1+Dl8HP4N34Zfw6fhz/Bl+DF8GP4L34Xfwmfhr/BV+Cl8VCvP/ozD9uSRPPEn+BL8CD4E/zGaJ34Dn4G/wFfgJ/AR+Ad8A34Bn4A/wBfgB/AB6D+6j96j8+g7uo6eo+Po91hXPOJBJ9FHdBE9RAfRP3RvKk90Dn1D19AzdAz9QrfQK3QKfUKX0CN0CP1Bd9AbdAZ9QVfQE3QE/UA3pvNEJ9AHdAE9QAeY/8z9Y3ky55nvzHXmOXOc+c3cZl4zp5nPzGXmMXOY+cvcZd4yZ5mvzFXmKXOU+cncnCnm9kNPcm+e7DPYY7C/YG/B9y4/7CfYS7CPYA/B/oG9A/sG9gzsF9grsE9gj8D+gL0B+wL2BOwH2AuwD2APwPc/3/19Xe8f58Vi7tOTZyvP0qU95Ytdv6taGqrV2sOVdrlaHi9VmhONeqlWnxhqlBvleqN+tNKoVtuNWmO4OdEcLjXLtWq7PFlvVifzl8103bG3mL9dRGjJfH57zve3xuXuLfz8ByllLvw4FQAA", proving_key: null, verification_key: null };

// src/CardBody.tsx
var import_passport_ui = require("@pcd/passport-ui");

// ../../node_modules/styled-components/dist/styled-components.esm.js
var import_react_is = __toESM(require_react_is());
var import_react = __toESM(require("react"));
var import_shallowequal = __toESM(require_shallowequal());

// ../../node_modules/@emotion/stylis/dist/stylis.esm.js
function stylis_min(W2) {
  function M2(d, c2, e2, h, a2) {
    for (var m2 = 0, b2 = 0, v2 = 0, n2 = 0, q2, g2, x2 = 0, K2 = 0, k2, u2 = k2 = q2 = 0, l2 = 0, r2 = 0, I = 0, t2 = 0, B3 = e2.length, J2 = B3 - 1, y2, f2 = "", p = "", F3 = "", G3 = "", C2; l2 < B3; ) {
      g2 = e2.charCodeAt(l2);
      l2 === J2 && 0 !== b2 + n2 + v2 + m2 && (0 !== b2 && (g2 = 47 === b2 ? 10 : 47), n2 = v2 = m2 = 0, B3++, J2++);
      if (0 === b2 + n2 + v2 + m2) {
        if (l2 === J2 && (0 < r2 && (f2 = f2.replace(N, "")), 0 < f2.trim().length)) {
          switch (g2) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f2 += e2.charAt(l2);
          }
          g2 = 59;
        }
        switch (g2) {
          case 123:
            f2 = f2.trim();
            q2 = f2.charCodeAt(0);
            k2 = 1;
            for (t2 = ++l2; l2 < B3; ) {
              switch (g2 = e2.charCodeAt(l2)) {
                case 123:
                  k2++;
                  break;
                case 125:
                  k2--;
                  break;
                case 47:
                  switch (g2 = e2.charCodeAt(l2 + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u2 = l2 + 1; u2 < J2; ++u2) {
                          switch (e2.charCodeAt(u2)) {
                            case 47:
                              if (42 === g2 && 42 === e2.charCodeAt(u2 - 1) && l2 + 2 !== u2) {
                                l2 = u2 + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (47 === g2) {
                                l2 = u2 + 1;
                                break a;
                              }
                          }
                        }
                        l2 = u2;
                      }
                  }
                  break;
                case 91:
                  g2++;
                case 40:
                  g2++;
                case 34:
                case 39:
                  for (; l2++ < J2 && e2.charCodeAt(l2) !== g2; ) {
                  }
              }
              if (0 === k2)
                break;
              l2++;
            }
            k2 = e2.substring(t2, l2);
            0 === q2 && (q2 = (f2 = f2.replace(ca, "").trim()).charCodeAt(0));
            switch (q2) {
              case 64:
                0 < r2 && (f2 = f2.replace(N, ""));
                g2 = f2.charCodeAt(1);
                switch (g2) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r2 = c2;
                    break;
                  default:
                    r2 = O2;
                }
                k2 = M2(c2, r2, k2, g2, a2 + 1);
                t2 = k2.length;
                0 < A2 && (r2 = X2(O2, f2, I), C2 = H2(3, k2, r2, c2, D2, z2, t2, g2, a2, h), f2 = r2.join(""), void 0 !== C2 && 0 === (t2 = (k2 = C2.trim()).length) && (g2 = 0, k2 = ""));
                if (0 < t2)
                  switch (g2) {
                    case 115:
                      f2 = f2.replace(da, ea);
                    case 100:
                    case 109:
                    case 45:
                      k2 = f2 + "{" + k2 + "}";
                      break;
                    case 107:
                      f2 = f2.replace(fa, "$1 $2");
                      k2 = f2 + "{" + k2 + "}";
                      k2 = 1 === w2 || 2 === w2 && L2("@" + k2, 3) ? "@-webkit-" + k2 + "@" + k2 : "@" + k2;
                      break;
                    default:
                      k2 = f2 + k2, 112 === h && (k2 = (p += k2, ""));
                  }
                else
                  k2 = "";
                break;
              default:
                k2 = M2(c2, X2(c2, f2, I), k2, h, a2 + 1);
            }
            F3 += k2;
            k2 = I = r2 = u2 = q2 = 0;
            f2 = "";
            g2 = e2.charCodeAt(++l2);
            break;
          case 125:
          case 59:
            f2 = (0 < r2 ? f2.replace(N, "") : f2).trim();
            if (1 < (t2 = f2.length))
              switch (0 === u2 && (q2 = f2.charCodeAt(0), 45 === q2 || 96 < q2 && 123 > q2) && (t2 = (f2 = f2.replace(" ", ":")).length), 0 < A2 && void 0 !== (C2 = H2(1, f2, c2, d, D2, z2, p.length, h, a2, h)) && 0 === (t2 = (f2 = C2.trim()).length) && (f2 = "\0\0"), q2 = f2.charCodeAt(0), g2 = f2.charCodeAt(1), q2) {
                case 0:
                  break;
                case 64:
                  if (105 === g2 || 99 === g2) {
                    G3 += f2 + e2.charAt(l2);
                    break;
                  }
                default:
                  58 !== f2.charCodeAt(t2 - 1) && (p += P2(f2, q2, g2, f2.charCodeAt(2)));
              }
            I = r2 = u2 = q2 = 0;
            f2 = "";
            g2 = e2.charCodeAt(++l2);
        }
      }
      switch (g2) {
        case 13:
        case 10:
          47 === b2 ? b2 = 0 : 0 === 1 + q2 && 107 !== h && 0 < f2.length && (r2 = 1, f2 += "\0");
          0 < A2 * Y2 && H2(0, f2, c2, d, D2, z2, p.length, h, a2, h);
          z2 = 1;
          D2++;
          break;
        case 59:
        case 125:
          if (0 === b2 + n2 + v2 + m2) {
            z2++;
            break;
          }
        default:
          z2++;
          y2 = e2.charAt(l2);
          switch (g2) {
            case 9:
            case 32:
              if (0 === n2 + m2 + b2)
                switch (x2) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y2 = "";
                    break;
                  default:
                    32 !== g2 && (y2 = " ");
                }
              break;
            case 0:
              y2 = "\\0";
              break;
            case 12:
              y2 = "\\f";
              break;
            case 11:
              y2 = "\\v";
              break;
            case 38:
              0 === n2 + b2 + m2 && (r2 = I = 1, y2 = "\f" + y2);
              break;
            case 108:
              if (0 === n2 + b2 + m2 + E2 && 0 < u2)
                switch (l2 - u2) {
                  case 2:
                    112 === x2 && 58 === e2.charCodeAt(l2 - 3) && (E2 = x2);
                  case 8:
                    111 === K2 && (E2 = K2);
                }
              break;
            case 58:
              0 === n2 + b2 + m2 && (u2 = l2);
              break;
            case 44:
              0 === b2 + v2 + n2 + m2 && (r2 = 1, y2 += "\r");
              break;
            case 34:
            case 39:
              0 === b2 && (n2 = n2 === g2 ? 0 : 0 === n2 ? g2 : n2);
              break;
            case 91:
              0 === n2 + b2 + v2 && m2++;
              break;
            case 93:
              0 === n2 + b2 + v2 && m2--;
              break;
            case 41:
              0 === n2 + b2 + m2 && v2--;
              break;
            case 40:
              if (0 === n2 + b2 + m2) {
                if (0 === q2)
                  switch (2 * x2 + 3 * K2) {
                    case 533:
                      break;
                    default:
                      q2 = 1;
                  }
                v2++;
              }
              break;
            case 64:
              0 === b2 + v2 + n2 + m2 + u2 + k2 && (k2 = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n2 + m2 + v2))
                switch (b2) {
                  case 0:
                    switch (2 * g2 + 3 * e2.charCodeAt(l2 + 1)) {
                      case 235:
                        b2 = 47;
                        break;
                      case 220:
                        t2 = l2, b2 = 42;
                    }
                    break;
                  case 42:
                    47 === g2 && 42 === x2 && t2 + 2 !== l2 && (33 === e2.charCodeAt(t2 + 2) && (p += e2.substring(t2, l2 + 1)), y2 = "", b2 = 0);
                }
          }
          0 === b2 && (f2 += y2);
      }
      K2 = x2;
      x2 = g2;
      l2++;
    }
    t2 = p.length;
    if (0 < t2) {
      r2 = c2;
      if (0 < A2 && (C2 = H2(2, p, r2, d, D2, z2, t2, h, a2, h), void 0 !== C2 && 0 === (p = C2).length))
        return G3 + p + F3;
      p = r2.join(",") + "{" + p + "}";
      if (0 !== w2 * E2) {
        2 !== w2 || L2(p, 2) || (E2 = 0);
        switch (E2) {
          case 111:
            p = p.replace(ha, ":-moz-$1") + p;
            break;
          case 112:
            p = p.replace(Q2, "::-webkit-input-$1") + p.replace(Q2, "::-moz-$1") + p.replace(Q2, ":-ms-input-$1") + p;
        }
        E2 = 0;
      }
    }
    return G3 + p + F3;
  }
  function X2(d, c2, e2) {
    var h = c2.trim().split(ia);
    c2 = h;
    var a2 = h.length, m2 = d.length;
    switch (m2) {
      case 0:
      case 1:
        var b2 = 0;
        for (d = 0 === m2 ? "" : d[0] + " "; b2 < a2; ++b2) {
          c2[b2] = Z2(d, c2[b2], e2).trim();
        }
        break;
      default:
        var v2 = b2 = 0;
        for (c2 = []; b2 < a2; ++b2) {
          for (var n2 = 0; n2 < m2; ++n2) {
            c2[v2++] = Z2(d[n2] + " ", h[b2], e2).trim();
          }
        }
    }
    return c2;
  }
  function Z2(d, c2, e2) {
    var h = c2.charCodeAt(0);
    33 > h && (h = (c2 = c2.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c2.replace(F2, "$1" + d.trim());
      case 58:
        return d.trim() + c2.replace(F2, "$1" + d.trim());
      default:
        if (0 < 1 * e2 && 0 < c2.indexOf("\f"))
          return c2.replace(F2, (58 === d.charCodeAt(0) ? "" : "$1") + d.trim());
    }
    return d + c2;
  }
  function P2(d, c2, e2, h) {
    var a2 = d + ";", m2 = 2 * c2 + 3 * e2 + 4 * h;
    if (944 === m2) {
      d = a2.indexOf(":", 9) + 1;
      var b2 = a2.substring(d, a2.length - 1).trim();
      b2 = a2.substring(0, d).trim() + b2 + ";";
      return 1 === w2 || 2 === w2 && L2(b2, 1) ? "-webkit-" + b2 + b2 : b2;
    }
    if (0 === w2 || 2 === w2 && !L2(a2, 1))
      return a2;
    switch (m2) {
      case 1015:
        return 97 === a2.charCodeAt(10) ? "-webkit-" + a2 + a2 : a2;
      case 951:
        return 116 === a2.charCodeAt(3) ? "-webkit-" + a2 + a2 : a2;
      case 963:
        return 110 === a2.charCodeAt(5) ? "-webkit-" + a2 + a2 : a2;
      case 1009:
        if (100 !== a2.charCodeAt(4))
          break;
      case 969:
      case 942:
        return "-webkit-" + a2 + a2;
      case 978:
        return "-webkit-" + a2 + "-moz-" + a2 + a2;
      case 1019:
      case 983:
        return "-webkit-" + a2 + "-moz-" + a2 + "-ms-" + a2 + a2;
      case 883:
        if (45 === a2.charCodeAt(8))
          return "-webkit-" + a2 + a2;
        if (0 < a2.indexOf("image-set(", 11))
          return a2.replace(ja, "$1-webkit-$2") + a2;
        break;
      case 932:
        if (45 === a2.charCodeAt(4))
          switch (a2.charCodeAt(5)) {
            case 103:
              return "-webkit-box-" + a2.replace("-grow", "") + "-webkit-" + a2 + "-ms-" + a2.replace("grow", "positive") + a2;
            case 115:
              return "-webkit-" + a2 + "-ms-" + a2.replace("shrink", "negative") + a2;
            case 98:
              return "-webkit-" + a2 + "-ms-" + a2.replace("basis", "preferred-size") + a2;
          }
        return "-webkit-" + a2 + "-ms-" + a2 + a2;
      case 964:
        return "-webkit-" + a2 + "-ms-flex-" + a2 + a2;
      case 1023:
        if (99 !== a2.charCodeAt(8))
          break;
        b2 = a2.substring(a2.indexOf(":", 15)).replace("flex-", "").replace("space-between", "justify");
        return "-webkit-box-pack" + b2 + "-webkit-" + a2 + "-ms-flex-pack" + b2 + a2;
      case 1005:
        return ka.test(a2) ? a2.replace(aa, ":-webkit-") + a2.replace(aa, ":-moz-") + a2 : a2;
      case 1e3:
        b2 = a2.substring(13).trim();
        c2 = b2.indexOf("-") + 1;
        switch (b2.charCodeAt(0) + b2.charCodeAt(c2)) {
          case 226:
            b2 = a2.replace(G2, "tb");
            break;
          case 232:
            b2 = a2.replace(G2, "tb-rl");
            break;
          case 220:
            b2 = a2.replace(G2, "lr");
            break;
          default:
            return a2;
        }
        return "-webkit-" + a2 + "-ms-" + b2 + a2;
      case 1017:
        if (-1 === a2.indexOf("sticky", 9))
          break;
      case 975:
        c2 = (a2 = d).length - 10;
        b2 = (33 === a2.charCodeAt(c2) ? a2.substring(0, c2) : a2).substring(d.indexOf(":", 7) + 1).trim();
        switch (m2 = b2.charCodeAt(0) + (b2.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b2.charCodeAt(8))
              break;
          case 115:
            a2 = a2.replace(b2, "-webkit-" + b2) + ";" + a2;
            break;
          case 207:
          case 102:
            a2 = a2.replace(b2, "-webkit-" + (102 < m2 ? "inline-" : "") + "box") + ";" + a2.replace(b2, "-webkit-" + b2) + ";" + a2.replace(b2, "-ms-" + b2 + "box") + ";" + a2;
        }
        return a2 + ";";
      case 938:
        if (45 === a2.charCodeAt(5))
          switch (a2.charCodeAt(6)) {
            case 105:
              return b2 = a2.replace("-items", ""), "-webkit-" + a2 + "-webkit-box-" + b2 + "-ms-flex-" + b2 + a2;
            case 115:
              return "-webkit-" + a2 + "-ms-flex-item-" + a2.replace(ba, "") + a2;
            default:
              return "-webkit-" + a2 + "-ms-flex-line-pack" + a2.replace("align-content", "").replace(ba, "") + a2;
          }
        break;
      case 973:
      case 989:
        if (45 !== a2.charCodeAt(3) || 122 === a2.charCodeAt(4))
          break;
      case 931:
      case 953:
        if (true === la.test(d))
          return 115 === (b2 = d.substring(d.indexOf(":") + 1)).charCodeAt(0) ? P2(d.replace("stretch", "fill-available"), c2, e2, h).replace(":fill-available", ":stretch") : a2.replace(b2, "-webkit-" + b2) + a2.replace(b2, "-moz-" + b2.replace("fill-", "")) + a2;
        break;
      case 962:
        if (a2 = "-webkit-" + a2 + (102 === a2.charCodeAt(5) ? "-ms-" + a2 : "") + a2, 211 === e2 + h && 105 === a2.charCodeAt(13) && 0 < a2.indexOf("transform", 10))
          return a2.substring(0, a2.indexOf(";", 27) + 1).replace(ma, "$1-webkit-$2") + a2;
    }
    return a2;
  }
  function L2(d, c2) {
    var e2 = d.indexOf(1 === c2 ? ":" : "{"), h = d.substring(0, 3 !== c2 ? e2 : 10);
    e2 = d.substring(e2 + 1, d.length - 1);
    return R2(2 !== c2 ? h : h.replace(na, "$1"), e2, c2);
  }
  function ea(d, c2) {
    var e2 = P2(c2, c2.charCodeAt(0), c2.charCodeAt(1), c2.charCodeAt(2));
    return e2 !== c2 + ";" ? e2.replace(oa, " or ($1)").substring(4) : "(" + c2 + ")";
  }
  function H2(d, c2, e2, h, a2, m2, b2, v2, n2, q2) {
    for (var g2 = 0, x2 = c2, w3; g2 < A2; ++g2) {
      switch (w3 = S2[g2].call(B2, d, x2, e2, h, a2, m2, b2, v2, n2, q2)) {
        case void 0:
        case false:
        case true:
        case null:
          break;
        default:
          x2 = w3;
      }
    }
    if (x2 !== c2)
      return x2;
  }
  function T2(d) {
    switch (d) {
      case void 0:
      case null:
        A2 = S2.length = 0;
        break;
      default:
        if ("function" === typeof d)
          S2[A2++] = d;
        else if ("object" === typeof d)
          for (var c2 = 0, e2 = d.length; c2 < e2; ++c2) {
            T2(d[c2]);
          }
        else
          Y2 = !!d | 0;
    }
    return T2;
  }
  function U2(d) {
    d = d.prefix;
    void 0 !== d && (R2 = null, d ? "function" !== typeof d ? w2 = 1 : (w2 = 2, R2 = d) : w2 = 0);
    return U2;
  }
  function B2(d, c2) {
    var e2 = d;
    33 > e2.charCodeAt(0) && (e2 = e2.trim());
    V2 = e2;
    e2 = [V2];
    if (0 < A2) {
      var h = H2(-1, c2, e2, e2, D2, z2, 0, 0, 0, 0);
      void 0 !== h && "string" === typeof h && (c2 = h);
    }
    var a2 = M2(O2, e2, c2, 0, 0);
    0 < A2 && (h = H2(-2, a2, e2, e2, D2, z2, a2.length, 0, 0, 0), void 0 !== h && (a2 = h));
    V2 = "";
    E2 = 0;
    z2 = D2 = 1;
    return a2;
  }
  var ca = /^\0+/g, N = /[\0\r\f]/g, aa = /: */g, ka = /zoo|gra/, ma = /([,: ])(transform)/g, ia = /,\r+?/g, F2 = /([\t\r\n ])*\f?&/g, fa = /@(k\w+)\s*(\S*)\s*/, Q2 = /::(place)/g, ha = /:(read-only)/g, G2 = /[svh]\w+-[tblr]{2}/, da = /\(\s*(.*)\s*\)/g, oa = /([\s\S]*?);/g, ba = /-self|flex-/g, na = /[^]*?(:[rp][el]a[\w-]+)[^]*/, la = /stretch|:\s*\w+\-(?:conte|avail)/, ja = /([^-])(image-set\()/, z2 = 1, D2 = 1, E2 = 0, w2 = 1, O2 = [], S2 = [], A2 = 0, R2 = null, Y2 = 0, V2 = "";
  B2.use = T2;
  B2.set = U2;
  void 0 !== W2 && U2(W2);
  return B2;
}
var stylis_esm_default = stylis_min;

// ../../node_modules/@emotion/unitless/dist/unitless.esm.js
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var unitless_esm_default = unitlessKeys;

// ../../node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}

// ../../node_modules/styled-components/node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);

// ../../node_modules/styled-components/dist/styled-components.esm.js
var import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
function m() {
  return (m = Object.assign || function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var n2 = arguments[t2];
      for (var r2 in n2)
        Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
    }
    return e2;
  }).apply(this, arguments);
}
var y = function(e2, t2) {
  for (var n2 = [e2[0]], r2 = 0, o2 = t2.length; r2 < o2; r2 += 1)
    n2.push(t2[r2], e2[r2 + 1]);
  return n2;
};
var v = function(t2) {
  return null !== t2 && "object" == typeof t2 && "[object Object]" === (t2.toString ? t2.toString() : Object.prototype.toString.call(t2)) && !(0, import_react_is.typeOf)(t2);
};
var g = Object.freeze([]);
var S = Object.freeze({});
function w(e2) {
  return "function" == typeof e2;
}
function E(e2) {
  return "production" !== process.env.NODE_ENV && "string" == typeof e2 && e2 || e2.displayName || e2.name || "Component";
}
function b(e2) {
  return e2 && "string" == typeof e2.styledComponentId;
}
var _ = "undefined" != typeof process && void 0 !== process.env && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled";
var A = "undefined" != typeof window && "HTMLElement" in window;
var C = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== process.env && (void 0 !== process.env.REACT_APP_SC_DISABLE_SPEEDY && "" !== process.env.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== process.env.REACT_APP_SC_DISABLE_SPEEDY && process.env.REACT_APP_SC_DISABLE_SPEEDY : void 0 !== process.env.SC_DISABLE_SPEEDY && "" !== process.env.SC_DISABLE_SPEEDY ? "false" !== process.env.SC_DISABLE_SPEEDY && process.env.SC_DISABLE_SPEEDY : "production" !== process.env.NODE_ENV));
var P = "production" !== process.env.NODE_ENV ? { 1: "Cannot create styled-component for component: %s.\n\n", 2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n", 3: "Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n", 4: "The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n", 5: "The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n", 6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n", 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: 'ThemeProvider: Please make your "theme" prop an object.\n\n', 9: "Missing document `<head>`\n\n", 10: "Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n", 11: "_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n", 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: "%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n", 14: 'ThemeProvider: "theme" prop is required.\n\n', 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n", 17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n" } : {};
function O() {
  for (var e2 = arguments.length <= 0 ? void 0 : arguments[0], t2 = [], n2 = 1, r2 = arguments.length; n2 < r2; n2 += 1)
    t2.push(n2 < 0 || arguments.length <= n2 ? void 0 : arguments[n2]);
  return t2.forEach(function(t3) {
    e2 = e2.replace(/%[a-z]/, t3);
  }), e2;
}
function R(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  throw "production" === process.env.NODE_ENV ? new Error("An error occurred. See https://git.io/JUIaE#" + e2 + " for more information." + (n2.length > 0 ? " Args: " + n2.join(", ") : "")) : new Error(O.apply(void 0, [P[e2]].concat(n2)).trim());
}
var D = function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3;
  }
  var t2 = e2.prototype;
  return t2.indexOfGroup = function(e3) {
    for (var t3 = 0, n2 = 0; n2 < e3; n2++)
      t3 += this.groupSizes[n2];
    return t3;
  }, t2.insertRules = function(e3, t3) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, r2 = n2.length, o2 = r2; e3 >= o2; )
        (o2 <<= 1) < 0 && R(16, "" + e3);
      this.groupSizes = new Uint32Array(o2), this.groupSizes.set(n2), this.length = o2;
      for (var s2 = r2; s2 < o2; s2++)
        this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = 0, c2 = t3.length; a2 < c2; a2++)
      this.tag.insertRule(i2, t3[a2]) && (this.groupSizes[e3]++, i2++);
  }, t2.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t3 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), r2 = n2 + t3;
      this.groupSizes[e3] = 0;
      for (var o2 = n2; o2 < r2; o2++)
        this.tag.deleteRule(n2);
    }
  }, t2.getGroup = function(e3) {
    var t3 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3])
      return t3;
    for (var n2 = this.groupSizes[e3], r2 = this.indexOfGroup(e3), o2 = r2 + n2, s2 = r2; s2 < o2; s2++)
      t3 += this.tag.getRule(s2) + "/*!sc*/\n";
    return t3;
  }, e2;
}();
var j = /* @__PURE__ */ new Map();
var T = /* @__PURE__ */ new Map();
var x = 1;
var k = function(e2) {
  if (j.has(e2))
    return j.get(e2);
  for (; T.has(x); )
    x++;
  var t2 = x++;
  return "production" !== process.env.NODE_ENV && ((0 | t2) < 0 || t2 > 1 << 30) && R(16, "" + t2), j.set(e2, t2), T.set(t2, e2), t2;
};
var V = function(e2) {
  return T.get(e2);
};
var z = function(e2, t2) {
  t2 >= x && (x = t2 + 1), j.set(e2, t2), T.set(t2, e2);
};
var B = "style[" + _ + '][data-styled-version="5.3.11"]';
var M = new RegExp("^" + _ + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)');
var G = function(e2, t2, n2) {
  for (var r2, o2 = n2.split(","), s2 = 0, i2 = o2.length; s2 < i2; s2++)
    (r2 = o2[s2]) && e2.registerName(t2, r2);
};
var L = function(e2, t2) {
  for (var n2 = (t2.textContent || "").split("/*!sc*/\n"), r2 = [], o2 = 0, s2 = n2.length; o2 < s2; o2++) {
    var i2 = n2[o2].trim();
    if (i2) {
      var a2 = i2.match(M);
      if (a2) {
        var c2 = 0 | parseInt(a2[1], 10), u2 = a2[2];
        0 !== c2 && (z(u2, c2), G(e2, u2, a2[3]), e2.getTag().insertRules(c2, r2)), r2.length = 0;
      } else
        r2.push(i2);
    }
  }
};
var F = function() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
};
var Y = function(e2) {
  var t2 = document.head, n2 = e2 || t2, r2 = document.createElement("style"), o2 = function(e3) {
    for (var t3 = e3.childNodes, n3 = t3.length; n3 >= 0; n3--) {
      var r3 = t3[n3];
      if (r3 && 1 === r3.nodeType && r3.hasAttribute(_))
        return r3;
    }
  }(n2), s2 = void 0 !== o2 ? o2.nextSibling : null;
  r2.setAttribute(_, "active"), r2.setAttribute("data-styled-version", "5.3.11");
  var i2 = F();
  return i2 && r2.setAttribute("nonce", i2), n2.insertBefore(r2, s2), r2;
};
var q = function() {
  function e2(e3) {
    var t3 = this.element = Y(e3);
    t3.appendChild(document.createTextNode("")), this.sheet = function(e4) {
      if (e4.sheet)
        return e4.sheet;
      for (var t4 = document.styleSheets, n2 = 0, r2 = t4.length; n2 < r2; n2++) {
        var o2 = t4[n2];
        if (o2.ownerNode === e4)
          return o2;
      }
      R(17);
    }(t3), this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    try {
      return this.sheet.insertRule(t3, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, t2.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, t2.getRule = function(e3) {
    var t3 = this.sheet.cssRules[e3];
    return void 0 !== t3 && "string" == typeof t3.cssText ? t3.cssText : "";
  }, e2;
}();
var H = function() {
  function e2(e3) {
    var t3 = this.element = Y(e3);
    this.nodes = t3.childNodes, this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t3), r2 = this.nodes[e3];
      return this.element.insertBefore(n2, r2 || null), this.length++, true;
    }
    return false;
  }, t2.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, t2.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
}();
var $ = function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  var t2 = e2.prototype;
  return t2.insertRule = function(e3, t3) {
    return e3 <= this.length && (this.rules.splice(e3, 0, t3), this.length++, true);
  }, t2.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, t2.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
}();
var W = A;
var U = { isServer: !A, useCSSOMInjection: !C };
var J = function() {
  function e2(e3, t3, n2) {
    void 0 === e3 && (e3 = S), void 0 === t3 && (t3 = {}), this.options = m({}, U, {}, e3), this.gs = t3, this.names = new Map(n2), this.server = !!e3.isServer, !this.server && A && W && (W = false, function(e4) {
      for (var t4 = document.querySelectorAll(B), n3 = 0, r2 = t4.length; n3 < r2; n3++) {
        var o2 = t4[n3];
        o2 && "active" !== o2.getAttribute(_) && (L(e4, o2), o2.parentNode && o2.parentNode.removeChild(o2));
      }
    }(this));
  }
  e2.registerId = function(e3) {
    return k(e3);
  };
  var t2 = e2.prototype;
  return t2.reconstructWithOptions = function(t3, n2) {
    return void 0 === n2 && (n2 = true), new e2(m({}, this.options, {}, t3), this.gs, n2 && this.names || void 0);
  }, t2.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, t2.getTag = function() {
    return this.tag || (this.tag = (n2 = (t3 = this.options).isServer, r2 = t3.useCSSOMInjection, o2 = t3.target, e3 = n2 ? new $(o2) : r2 ? new q(o2) : new H(o2), new D(e3)));
    var e3, t3, n2, r2, o2;
  }, t2.hasNameForId = function(e3, t3) {
    return this.names.has(e3) && this.names.get(e3).has(t3);
  }, t2.registerName = function(e3, t3) {
    if (k(e3), this.names.has(e3))
      this.names.get(e3).add(t3);
    else {
      var n2 = /* @__PURE__ */ new Set();
      n2.add(t3), this.names.set(e3, n2);
    }
  }, t2.insertRules = function(e3, t3, n2) {
    this.registerName(e3, t3), this.getTag().insertRules(k(e3), n2);
  }, t2.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, t2.clearRules = function(e3) {
    this.getTag().clearGroup(k(e3)), this.clearNames(e3);
  }, t2.clearTag = function() {
    this.tag = void 0;
  }, t2.toString = function() {
    return function(e3) {
      for (var t3 = e3.getTag(), n2 = t3.length, r2 = "", o2 = 0; o2 < n2; o2++) {
        var s2 = V(o2);
        if (void 0 !== s2) {
          var i2 = e3.names.get(s2), a2 = t3.getGroup(o2);
          if (i2 && a2 && i2.size) {
            var c2 = _ + ".g" + o2 + '[id="' + s2 + '"]', u2 = "";
            void 0 !== i2 && i2.forEach(function(e4) {
              e4.length > 0 && (u2 += e4 + ",");
            }), r2 += "" + a2 + c2 + '{content:"' + u2 + '"}/*!sc*/\n';
          }
        }
      }
      return r2;
    }(this);
  }, e2;
}();
var X = /(a)(d)/gi;
var Z = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function K(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > 52; t2 = t2 / 52 | 0)
    n2 = Z(t2 % 52) + n2;
  return (Z(t2 % 52) + n2).replace(X, "$1-$2");
}
var Q = function(e2, t2) {
  for (var n2 = t2.length; n2; )
    e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
};
var ee = function(e2) {
  return Q(5381, e2);
};
function te(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (w(n2) && !b(n2))
      return false;
  }
  return true;
}
var ne = ee("5.3.11");
var re = function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = "production" === process.env.NODE_ENV && (void 0 === n2 || n2.isStatic) && te(e3), this.componentId = t2, this.baseHash = Q(ne, t2), this.baseStyle = n2, J.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var r2 = this.componentId, o2 = [];
    if (this.baseStyle && o2.push(this.baseStyle.generateAndInjectStyles(e3, t2, n2)), this.isStatic && !n2.hash)
      if (this.staticRulesId && t2.hasNameForId(r2, this.staticRulesId))
        o2.push(this.staticRulesId);
      else {
        var s2 = be(this.rules, e3, t2, n2).join(""), i2 = K(Q(this.baseHash, s2) >>> 0);
        if (!t2.hasNameForId(r2, i2)) {
          var a2 = n2(s2, "." + i2, void 0, r2);
          t2.insertRules(r2, i2, a2);
        }
        o2.push(i2), this.staticRulesId = i2;
      }
    else {
      for (var c2 = this.rules.length, u2 = Q(this.baseHash, n2.hash), l2 = "", d = 0; d < c2; d++) {
        var h = this.rules[d];
        if ("string" == typeof h)
          l2 += h, "production" !== process.env.NODE_ENV && (u2 = Q(u2, h + d));
        else if (h) {
          var p = be(h, e3, t2, n2), f2 = Array.isArray(p) ? p.join("") : p;
          u2 = Q(u2, f2 + d), l2 += f2;
        }
      }
      if (l2) {
        var m2 = K(u2 >>> 0);
        if (!t2.hasNameForId(r2, m2)) {
          var y2 = n2(l2, "." + m2, void 0, r2);
          t2.insertRules(r2, m2, y2);
        }
        o2.push(m2);
      }
    }
    return o2.join(" ");
  }, e2;
}();
var oe = /^\s*\/\/.*$/gm;
var se = [":", "[", ".", "#"];
function ie(e2) {
  var t2, n2, r2, o2, s2 = void 0 === e2 ? S : e2, i2 = s2.options, a2 = void 0 === i2 ? S : i2, c2 = s2.plugins, u2 = void 0 === c2 ? g : c2, l2 = new stylis_esm_default(a2), h = [], p = function(e3) {
    function t3(t4) {
      if (t4)
        try {
          e3(t4 + "}");
        } catch (e4) {
        }
    }
    return function(n3, r3, o3, s3, i3, a3, c3, u3, l3, d) {
      switch (n3) {
        case 1:
          if (0 === l3 && 64 === r3.charCodeAt(0))
            return e3(r3 + ";"), "";
          break;
        case 2:
          if (0 === u3)
            return r3 + "/*|*/";
          break;
        case 3:
          switch (u3) {
            case 102:
            case 112:
              return e3(o3[0] + r3), "";
            default:
              return r3 + (0 === d ? "/*|*/" : "");
          }
        case -2:
          r3.split("/*|*/}").forEach(t3);
      }
    };
  }(function(e3) {
    h.push(e3);
  }), f2 = function(e3, r3, s3) {
    return 0 === r3 && -1 !== se.indexOf(s3[n2.length]) || s3.match(o2) ? e3 : "." + t2;
  };
  function m2(e3, s3, i3, a3) {
    void 0 === a3 && (a3 = "&");
    var c3 = e3.replace(oe, ""), u3 = s3 && i3 ? i3 + " " + s3 + " { " + c3 + " }" : c3;
    return t2 = a3, n2 = s3, r2 = new RegExp("\\" + n2 + "\\b", "g"), o2 = new RegExp("(\\" + n2 + "\\b){2,}"), l2(i3 || !s3 ? "" : s3, u3);
  }
  return l2.use([].concat(u2, [function(e3, t3, o3) {
    2 === e3 && o3.length && o3[0].lastIndexOf(n2) > 0 && (o3[0] = o3[0].replace(r2, f2));
  }, p, function(e3) {
    if (-2 === e3) {
      var t3 = h;
      return h = [], t3;
    }
  }])), m2.hash = u2.length ? u2.reduce(function(e3, t3) {
    return t3.name || R(15), Q(e3, t3.name);
  }, 5381).toString() : "", m2;
}
var ae = import_react.default.createContext();
var ce = ae.Consumer;
var ue = import_react.default.createContext();
var le = (ue.Consumer, new J());
var de = ie();
function he() {
  return (0, import_react.useContext)(ae) || le;
}
function pe() {
  return (0, import_react.useContext)(ue) || de;
}
function fe(e2) {
  var t2 = (0, import_react.useState)(e2.stylisPlugins), n2 = t2[0], s2 = t2[1], c2 = he(), u2 = (0, import_react.useMemo)(function() {
    var t3 = c2;
    return e2.sheet ? t3 = e2.sheet : e2.target && (t3 = t3.reconstructWithOptions({ target: e2.target }, false)), e2.disableCSSOMInjection && (t3 = t3.reconstructWithOptions({ useCSSOMInjection: false })), t3;
  }, [e2.disableCSSOMInjection, e2.sheet, e2.target]), d = (0, import_react.useMemo)(function() {
    return ie({ options: { prefix: !e2.disableVendorPrefixes }, plugins: n2 });
  }, [e2.disableVendorPrefixes, n2]);
  return (0, import_react.useEffect)(function() {
    (0, import_shallowequal.default)(n2, e2.stylisPlugins) || s2(e2.stylisPlugins);
  }, [e2.stylisPlugins]), import_react.default.createElement(ae.Provider, { value: u2 }, import_react.default.createElement(ue.Provider, { value: d }, "production" !== process.env.NODE_ENV ? import_react.default.Children.only(e2.children) : e2.children));
}
var me = function() {
  function e2(e3, t2) {
    var n2 = this;
    this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = de);
      var r2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, r2) || e4.insertRules(n2.id, r2, t3(n2.rules, r2, "@keyframes"));
    }, this.toString = function() {
      return R(12, String(n2.name));
    }, this.name = e3, this.id = "sc-keyframes-" + e3, this.rules = t2;
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = de), this.name + e3.hash;
  }, e2;
}();
var ye = /([A-Z])/;
var ve = /([A-Z])/g;
var ge = /^ms-/;
var Se = function(e2) {
  return "-" + e2.toLowerCase();
};
function we(e2) {
  return ye.test(e2) ? e2.replace(ve, Se).replace(ge, "-ms-") : e2;
}
var Ee = function(e2) {
  return null == e2 || false === e2 || "" === e2;
};
function be(e2, n2, r2, o2) {
  if (Array.isArray(e2)) {
    for (var s2, i2 = [], a2 = 0, c2 = e2.length; a2 < c2; a2 += 1)
      "" !== (s2 = be(e2[a2], n2, r2, o2)) && (Array.isArray(s2) ? i2.push.apply(i2, s2) : i2.push(s2));
    return i2;
  }
  if (Ee(e2))
    return "";
  if (b(e2))
    return "." + e2.styledComponentId;
  if (w(e2)) {
    if ("function" != typeof (l2 = e2) || l2.prototype && l2.prototype.isReactComponent || !n2)
      return e2;
    var u2 = e2(n2);
    return "production" !== process.env.NODE_ENV && (0, import_react_is.isElement)(u2) && console.warn(E(e2) + " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details."), be(u2, n2, r2, o2);
  }
  var l2;
  return e2 instanceof me ? r2 ? (e2.inject(r2, o2), e2.getName(o2)) : e2 : v(e2) ? function e3(t2, n3) {
    var r3, o3, s3 = [];
    for (var i3 in t2)
      t2.hasOwnProperty(i3) && !Ee(t2[i3]) && (Array.isArray(t2[i3]) && t2[i3].isCss || w(t2[i3]) ? s3.push(we(i3) + ":", t2[i3], ";") : v(t2[i3]) ? s3.push.apply(s3, e3(t2[i3], i3)) : s3.push(we(i3) + ": " + (r3 = i3, null == (o3 = t2[i3]) || "boolean" == typeof o3 || "" === o3 ? "" : "number" != typeof o3 || 0 === o3 || r3 in unitless_esm_default || r3.startsWith("--") ? String(o3).trim() : o3 + "px") + ";"));
    return n3 ? [n3 + " {"].concat(s3, ["}"]) : s3;
  }(e2) : e2.toString();
}
var _e = function(e2) {
  return Array.isArray(e2) && (e2.isCss = true), e2;
};
function Ne(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  return w(e2) || v(e2) ? _e(be(y(g, [e2].concat(n2)))) : 0 === n2.length && 1 === e2.length && "string" == typeof e2[0] ? e2 : _e(be(y(e2, n2)));
}
var Ae = /invalid hook call/i;
var Ce = /* @__PURE__ */ new Set();
var Ie = function(e2, t2) {
  if ("production" !== process.env.NODE_ENV) {
    var n2 = "The component " + e2 + (t2 ? ' with the id of "' + t2 + '"' : "") + " has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.", r2 = console.error;
    try {
      var o2 = true;
      console.error = function(e3) {
        if (Ae.test(e3))
          o2 = false, Ce.delete(n2);
        else {
          for (var t3 = arguments.length, s2 = new Array(t3 > 1 ? t3 - 1 : 0), i2 = 1; i2 < t3; i2++)
            s2[i2 - 1] = arguments[i2];
          r2.apply(void 0, [e3].concat(s2));
        }
      }, (0, import_react.useRef)(), o2 && !Ce.has(n2) && (console.warn(n2), Ce.add(n2));
    } catch (e3) {
      Ae.test(e3.message) && Ce.delete(n2);
    } finally {
      console.error = r2;
    }
  }
};
var Pe = function(e2, t2, n2) {
  return void 0 === n2 && (n2 = S), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
};
var Oe = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g;
var Re = /(^-|-$)/g;
function De(e2) {
  return e2.replace(Oe, "-").replace(Re, "");
}
var je = function(e2) {
  return K(ee(e2) >>> 0);
};
function Te(e2) {
  return "string" == typeof e2 && ("production" === process.env.NODE_ENV || e2.charAt(0) === e2.charAt(0).toLowerCase());
}
var xe = function(e2) {
  return "function" == typeof e2 || "object" == typeof e2 && null !== e2 && !Array.isArray(e2);
};
var ke = function(e2) {
  return "__proto__" !== e2 && "constructor" !== e2 && "prototype" !== e2;
};
function Ve(e2, t2, n2) {
  var r2 = e2[n2];
  xe(t2) && xe(r2) ? ze(r2, t2) : e2[n2] = t2;
}
function ze(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  for (var o2 = 0, s2 = n2; o2 < s2.length; o2++) {
    var i2 = s2[o2];
    if (xe(i2))
      for (var a2 in i2)
        ke(a2) && Ve(e2, i2[a2], a2);
  }
  return e2;
}
var Be = import_react.default.createContext();
var Me = Be.Consumer;
var Le = {};
function Fe(e2, t2, n2) {
  var o2 = b(e2), i2 = !Te(e2), a2 = t2.attrs, c2 = void 0 === a2 ? g : a2, l2 = t2.componentId, d = void 0 === l2 ? function(e3, t3) {
    var n3 = "string" != typeof e3 ? "sc" : De(e3);
    Le[n3] = (Le[n3] || 0) + 1;
    var r2 = n3 + "-" + je("5.3.11" + n3 + Le[n3]);
    return t3 ? t3 + "-" + r2 : r2;
  }(t2.displayName, t2.parentComponentId) : l2, h = t2.displayName, y2 = void 0 === h ? function(e3) {
    return Te(e3) ? "styled." + e3 : "Styled(" + E(e3) + ")";
  }(e2) : h, v2 = t2.displayName && t2.componentId ? De(t2.displayName) + "-" + t2.componentId : t2.componentId || d, _2 = o2 && e2.attrs ? Array.prototype.concat(e2.attrs, c2).filter(Boolean) : c2, N = t2.shouldForwardProp;
  o2 && e2.shouldForwardProp && (N = t2.shouldForwardProp ? function(n3, r2, o3) {
    return e2.shouldForwardProp(n3, r2, o3) && t2.shouldForwardProp(n3, r2, o3);
  } : e2.shouldForwardProp);
  var A2, C2 = new re(n2, v2, o2 ? e2.componentStyle : void 0), I = C2.isStatic && 0 === c2.length, P2 = function(e3, t3) {
    return function(e4, t4, n3, r2) {
      var o3 = e4.attrs, i3 = e4.componentStyle, a3 = e4.defaultProps, c3 = e4.foldedComponentIds, l3 = e4.shouldForwardProp, d2 = e4.styledComponentId, h2 = e4.target, f2 = function(e5, t5, n4) {
        void 0 === e5 && (e5 = S);
        var r3 = m({}, t5, { theme: e5 }), o4 = {};
        return n4.forEach(function(e6) {
          var t6, n5, s2, i4 = e6;
          for (t6 in w(i4) && (i4 = i4(r3)), i4)
            r3[t6] = o4[t6] = "className" === t6 ? (n5 = o4[t6], s2 = i4[t6], n5 && s2 ? n5 + " " + s2 : n5 || s2) : i4[t6];
        }), [r3, o4];
      }(Pe(t4, (0, import_react.useContext)(Be), a3) || S, t4, o3), y3 = f2[0], v3 = f2[1], g2 = function(e5, t5, n4, r3) {
        var o4 = he(), s2 = pe(), i4 = t5 ? e5.generateAndInjectStyles(S, o4, s2) : e5.generateAndInjectStyles(n4, o4, s2);
        return "production" !== process.env.NODE_ENV && !t5 && r3 && r3(i4), i4;
      }(i3, r2, y3, "production" !== process.env.NODE_ENV ? e4.warnTooManyClasses : void 0), E2 = n3, b2 = v3.$as || t4.$as || v3.as || t4.as || h2, _3 = Te(b2), N2 = v3 !== t4 ? m({}, t4, {}, v3) : t4, A3 = {};
      for (var C3 in N2)
        "$" !== C3[0] && "as" !== C3 && ("forwardedAs" === C3 ? A3.as = N2[C3] : (l3 ? l3(C3, isPropValid, b2) : !_3 || isPropValid(C3)) && (A3[C3] = N2[C3]));
      return t4.style && v3.style !== t4.style && (A3.style = m({}, t4.style, {}, v3.style)), A3.className = Array.prototype.concat(c3, d2, g2 !== d2 ? g2 : null, t4.className, v3.className).filter(Boolean).join(" "), A3.ref = E2, (0, import_react.createElement)(b2, A3);
    }(A2, e3, t3, I);
  };
  return P2.displayName = y2, (A2 = import_react.default.forwardRef(P2)).attrs = _2, A2.componentStyle = C2, A2.displayName = y2, A2.shouldForwardProp = N, A2.foldedComponentIds = o2 ? Array.prototype.concat(e2.foldedComponentIds, e2.styledComponentId) : g, A2.styledComponentId = v2, A2.target = o2 ? e2.target : e2, A2.withComponent = function(e3) {
    var r2 = t2.componentId, o3 = function(e4, t3) {
      if (null == e4)
        return {};
      var n3, r3, o4 = {}, s3 = Object.keys(e4);
      for (r3 = 0; r3 < s3.length; r3++)
        n3 = s3[r3], t3.indexOf(n3) >= 0 || (o4[n3] = e4[n3]);
      return o4;
    }(t2, ["componentId"]), s2 = r2 && r2 + "-" + (Te(e3) ? e3 : De(E(e3)));
    return Fe(e3, m({}, o3, { attrs: _2, componentId: s2 }), n2);
  }, Object.defineProperty(A2, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(t3) {
    this._foldedDefaultProps = o2 ? ze({}, e2.defaultProps, t3) : t3;
  } }), "production" !== process.env.NODE_ENV && (Ie(y2, v2), A2.warnTooManyClasses = function(e3, t3) {
    var n3 = {}, r2 = false;
    return function(o3) {
      if (!r2 && (n3[o3] = true, Object.keys(n3).length >= 200)) {
        var s2 = t3 ? ' with the id of "' + t3 + '"' : "";
        console.warn("Over 200 classes were generated for component " + e3 + s2 + ".\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />"), r2 = true, n3 = {};
      }
    };
  }(y2, v2)), Object.defineProperty(A2, "toString", { value: function() {
    return "." + A2.styledComponentId;
  } }), i2 && (0, import_hoist_non_react_statics.default)(A2, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true, withComponent: true }), A2;
}
var Ye = function(e2) {
  return function e3(t2, r2, o2) {
    if (void 0 === o2 && (o2 = S), !(0, import_react_is.isValidElementType)(r2))
      return R(1, String(r2));
    var s2 = function() {
      return t2(r2, o2, Ne.apply(void 0, arguments));
    };
    return s2.withConfig = function(n2) {
      return e3(t2, r2, m({}, o2, {}, n2));
    }, s2.attrs = function(n2) {
      return e3(t2, r2, m({}, o2, { attrs: Array.prototype.concat(o2.attrs, n2).filter(Boolean) }));
    }, s2;
  }(Fe, e2);
};
["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "textPath", "tspan"].forEach(function(e2) {
  Ye[e2] = Ye(e2);
});
var qe = function() {
  function e2(e3, t3) {
    this.rules = e3, this.componentId = t3, this.isStatic = te(e3), J.registerId(this.componentId + 1);
  }
  var t2 = e2.prototype;
  return t2.createStyles = function(e3, t3, n2, r2) {
    var o2 = r2(be(this.rules, t3, n2, r2).join(""), ""), s2 = this.componentId + e3;
    n2.insertRules(s2, s2, o2);
  }, t2.removeStyles = function(e3, t3) {
    t3.clearRules(this.componentId + e3);
  }, t2.renderStyles = function(e3, t3, n2, r2) {
    e3 > 2 && J.registerId(this.componentId + e3), this.removeStyles(e3, n2), this.createStyles(e3, t3, n2, r2);
  }, e2;
}();
var We = /^\s*<\/[a-z]/i;
var Ue = function() {
  function e2() {
    var e3 = this;
    this._emitSheetCSS = function() {
      var t3 = e3.instance.toString();
      if (!t3)
        return "";
      var n2 = F();
      return "<style " + [n2 && 'nonce="' + n2 + '"', _ + '="true"', 'data-styled-version="5.3.11"'].filter(Boolean).join(" ") + ">" + t3 + "</style>";
    }, this.getStyleTags = function() {
      return e3.sealed ? R(2) : e3._emitSheetCSS();
    }, this.getStyleElement = function() {
      var t3;
      if (e3.sealed)
        return R(2);
      var n2 = ((t3 = {})[_] = "", t3["data-styled-version"] = "5.3.11", t3.dangerouslySetInnerHTML = { __html: e3.instance.toString() }, t3), o2 = F();
      return o2 && (n2.nonce = o2), [import_react.default.createElement("style", m({}, n2, { key: "sc-0-0" }))];
    }, this.seal = function() {
      e3.sealed = true;
    }, this.instance = new J({ isServer: true }), this.sealed = false;
  }
  var t2 = e2.prototype;
  return t2.collectStyles = function(e3) {
    return this.sealed ? R(2) : import_react.default.createElement(fe, { sheet: this.instance }, e3);
  }, t2.interleaveWithNodeStream = function(e3) {
    if (A)
      return R(3);
    if (this.sealed)
      return R(2);
    this.seal();
    var t3 = require("stream"), n2 = (t3.Readable, t3.Transform), r2 = e3, o2 = this.instance, s2 = this._emitSheetCSS, i2 = new n2({ transform: function(e4, t4, n3) {
      var r3 = e4.toString(), i3 = s2();
      if (o2.clearTag(), We.test(r3)) {
        var a2 = r3.indexOf(">") + 1, c2 = r3.slice(0, a2), u2 = r3.slice(a2);
        this.push(c2 + i3 + u2);
      } else
        this.push(i3 + r3);
      n3();
    } });
    return r2.on("error", function(e4) {
      i2.emit("error", e4);
    }), r2.pipe(i2);
  }, e2;
}();
"production" !== process.env.NODE_ENV && "undefined" != typeof navigator && "ReactNative" === navigator.product && console.warn("It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native"), "production" !== process.env.NODE_ENV && "test" !== process.env.NODE_ENV && "undefined" != typeof window && (window["__styled-components-init__"] = window["__styled-components-init__"] || 0, 1 === window["__styled-components-init__"] && console.warn("It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info."), window["__styled-components-init__"] += 1);
var styled_components_esm_default = Ye;

// src/CardBody.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Secp256R1CardBody({ pcd }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "PCD for ecdsa secp256r1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_passport_ui.Separator, {})
  ] });
}
var Container = styled_components_esm_default.div`
  padding: 16px;
  overflow: hidden;
  width: 100%;
`;

// src/secp256r1.ts
var depsInitializedPromise;
var backend;
var noir;
var Secp256R1PCDTypeName = "secp256r1-pcd";
function init() {
  return __async(this, null, function* () {
    if (!depsInitializedPromise) {
      depsInitializedPromise = (() => __async(this, null, function* () {
        backend = new import_backend_barretenberg.BarretenbergBackend(ecdsa_secp256r1_default, 8);
        noir = new import_noir_js.Noir(ecdsa_secp256r1_default, backend);
      }))();
    }
    yield depsInitializedPromise;
  });
}
var Secp256R1PCD = class {
  constructor(id, claim, proof) {
    this.id = id;
    this.claim = claim;
    this.proof = proof;
    this.type = Secp256R1PCDTypeName;
    this.id = id;
    this.claim = claim;
    this.proof = proof;
  }
};
function prove(args) {
  return __async(this, null, function* () {
    const proof = yield noir.generateFinalProof(args);
    return new Secp256R1PCD(v4_default(), void 0, proof);
  });
}
function verify(pcd) {
  return __async(this, null, function* () {
    return yield noir.verifyFinalProof(pcd.proof);
  });
}
function serialize(pcd) {
  return __async(this, null, function* () {
    return {
      type: Secp256R1PCDTypeName,
      pcd: (0, import_json_bigint.default)({ useNativeBigInt: true }).stringify(pcd)
    };
  });
}
function deserialize(serialized) {
  return __async(this, null, function* () {
    const { id, claim, proof } = (0, import_json_bigint.default)({ useNativeBigInt: true }).parse(
      serialized
    );
    (0, import_util.requireDefinedParameter)(id, "id");
    (0, import_util.requireDefinedParameter)(claim, "claim");
    (0, import_util.requireDefinedParameter)(proof, "proof");
    return new Secp256R1PCD(id, claim, proof);
  });
}
var Secp256R1PCDPackage = {
  name: Secp256R1PCDTypeName,
  renderCardBody: Secp256R1CardBody,
  init,
  prove,
  verify,
  serialize,
  deserialize
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Secp256R1PCD,
  Secp256R1PCDPackage,
  Secp256R1PCDTypeName,
  deserialize,
  prove,
  serialize,
  verify
});
/*! Bundled license information:

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
