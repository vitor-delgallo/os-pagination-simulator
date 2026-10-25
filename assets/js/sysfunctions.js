//Forces the loading to disappear from the screen.
$('document').ready(function(){
    $('.sysloading').fnToggle("none");
});

/**
 * Function isArray
 * Determines if a variable is an array
 * @param obj Variable to be checked
 * @returns {boolean}
 *
 * @ref https://stackoverflow.com/questions/4775722/how-to-check-if-an-object-is-an-array
 */
function isArray(obj) {
	if(obj === null) return false;
	return (typeof obj).toLowerCase() === "object";
}

/**
 * Function isZero.
 * Checks if a variable has a zero value
 *
 * @param {*} str Variable to be checked
 * @returns {boolean}
 */
function isZero(str) {
	try{
		str *= 1;
		if(str === 0) {
			return true;
		}
	} catch (e) {}

	return false;
}

/**
 * Function isEmpty.
 * Checks if a variable is empty in all possible cases
 *
 * @param {*} str Variable to be checked
 * @returns {boolean}
 */
function isEmpty(str) {
	if(
		str === null ||
		str === false ||
		str === undefined || (
			isArray(str) &&
			str.length === 0
		)
	) {
		return true;
	} else if(isArray(str) && str.length > 0){
		return false;
	}

	try{
		str = str.toString().trim().toLowerCase();
		if(
			str === "" || str === "false" ||
			str === "null" || str === "undefined" ||
			str === "nan"
		) {
			return true;
		}
	} catch (e) {}

	return isZero(str);
}

/**
 * Function isEmptyDecimal.
 * Checks if a variable is an empty decimal value
 *
 * @param {*} str Variable to be checked
 * @returns {boolean}
 */
function isEmptyDecimal(str) {
	try{
		return isEmpty(parseFloat(str));
	}catch(e){}

	return isEmpty(str);
}

/**
 * Function isEmptyInteger.
 * Checks if a variable is an empty integer value
 *
 * @param {*} str Variable to be checked
 * @returns {boolean}
 */
function isEmptyInteger(str) {
	try{
		return isEmpty(parseInt(str));
	}catch(e){}

	return isEmpty(str);
}

/**
 * Function number_format.
 * Formats a decimal in JS equivalent to PHP's number_format
 * @param number integer:      Number to be formatted
 * @param decimals integer:    Number of allowed decimal places
 * @param dec_point mixed:     Decimal separator
 * @param thousands_sep mixed: Thousand separator
 *
 * @ref https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 * @ref http://jsfiddle.net/drewnoakes/xc3qh35z/
 */
function number_format(number, decimals, dec_point, thousands_sep) {
    if(isEmptyDecimal(number)) return "0";

    const n = !isFinite(+number) ? 0 : +number,
          prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
          sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
          dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
          toFixedFix = function (n, prec) {
              // Fix for IE parseFloat(0.55).toFixed(0) = 0;
              const k = Math.pow(10, prec);
              return Math.round(n * k) / k;
          };
    let s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec).toString();
}

/**
 * Function onlyNumbers
 * Returns only the numbers from a string
 *
 * @param str Auxiliary string to be checked
 * @return string
 *
 * @ref https://stackoverflow.com/questions/185510/how-can-i-concatenate-regex-literals-in-javascript
 * @ref https://stackoverflow.com/questions/4460595/jquery-filter-numbers-of-a-string
 */
function onlyNumbers(str) {
    if(str === undefined || str === null) return "";
    return str.toString().replace(/[^0-9]/g, '').toString();
}

/**
 * Function onlyNumbersLetters
 * Returns only the numbers and letters from a string.
 *
 * @param str String para deixar apenas numeros e letras
 * @return string
 */
function onlyNumbersLetters(str) {
    if(str === undefined || str === null) return "";
    return str.toString().toUpperCase().replace(/[^0-9A-Z]/g, '').toString();
}

/**
 * Function removeChrsExcept.
 * Removes all characters from the string that are not in the provided chars
 *
 * @param str String for character removal
 * @param chs Chars to ignore
 *
 * @returns {string}
 */
function removeChrsExcept(str, chs) {
    if (isEmpty(chs)) return str;
    if (isEmpty(str)) return "";
    str = str.toString();
    chs = chs.toString();

    let ret = "", remChrStr = true;
    for (let iStr = 0; iStr < str.length; iStr++) {
        remChrStr = true;

        for (let iChs = 0; iChs < chs.length; iChs++) {
            if(str.charAt(iStr) !== chs.charAt(iChs)) continue;

            remChrStr = false;
            break;
        }

        if (!remChrStr) ret += str.charAt(iStr);
    }

    return ret;
}

/**
 * Function removeChrs.
 * Removes all characters from the string that are in the provided chars
 *
 * @param str String for character removal
 * @param chs Chars to remove
 *
 * @returns {string}
 */
function removeChrs(str, chs) {
    if (isEmpty(chs)) return str;
    if (isEmpty(str)) return "";
    str = str.toString();
    chs = chs.toString();

    for (let iChs = 0; iChs < chs.length; iChs++) {
        str = str.split(chs.charAt(iChs).toString()).join('');
    }

    return str;
}

/**
 * Function hasStr.
 * Determines if there is a string within the string
 *
 * @param str String to conduct the search
 * @param find String to find in the first parameter
 *
 * @returns {boolean}
 */
function hasStr(str, find){
    return str.toString().indexOf(find) !== -1;
}

/**
 * Function isNegative.
 * Checks for the negative number character
 *
 * @param $str String to test for the presence of the negative symbol
 * @return boolean
 */
function isNegative ($str) {
    if(isEmpty($str)) return false;
    return /(-)/g.test($str);
}

/**
 * Function formataFloat.
 * Formats a number to the desired standard
 *
 * @param num string Number to be formatted
 * @param decimalSepNum string Decimal separator for number to be formatted
 * @param decimalPlaces int Number of allowed decimal places after the decimal point
 * @param decimalSep string Decimal place divider when returning the value.
 * @param prefix string Number Prefix (Ex: $)
 * @param suffix string Number Suffix (Ex: %)
 * @param negativeAllowed bool Determines if the number can be negative or not
 * @param onlyInteger bool Determines if the return should be integer only or not
 * @param thousandSep string Determines whether or not there will be a thousand separator
 * @return string
 */
function formataFloat (
	num, decimalSepNum, decimalPlaces, decimalSep,
	prefix, suffix, negativeAllowed, onlyInteger, thousandSep
) {
    let ret = "";

	if (isEmpty(num)) num = "0";
	if (isEmpty(prefix)) prefix = "";
	if (isEmpty(suffix)) suffix = "";
	if (isEmptyDecimal(decimalPlaces)) decimalPlaces = 0;
	negativeAllowed = !isEmpty(negativeAllowed);
	onlyInteger = !isEmpty(onlyInteger);

	decimalSepNum = removeChrs(decimalSepNum, '0123456789+-' + prefix + suffix);
    if (isEmpty(decimalSepNum)) decimalSepNum = '.';
	decimalSep = removeChrs(decimalSep, '0123456789+-' + prefix + suffix);
    if (isEmpty(decimalSep)) decimalSep = '.';
	thousandSep = removeChrs(thousandSep, '0123456789+-' + prefix + suffix);
    if (isEmpty(thousandSep) || thousandSep === decimalSep) thousandSep = "";

	decimalSepNum = decimalSepNum.toString();
	decimalSep = decimalSep.toString();
	thousandSep = thousandSep.toString();
	prefix = prefix.toString();
	suffix = suffix.toString();
    num = num.toString().split(decimalSepNum);

    if(isNegative(num[0]) && negativeAllowed) ret += '-';
    num[0] = onlyNumbers(num[0]);
    ret += num[0];

    if (num.length > 1 && !onlyInteger) {
        num[1] = onlyNumbers(num[1]);
        ret +=
            (isEmpty(thousandSep) ? decimalSep : '.') +
            num[1].toString().substring(0, decimalPlaces);
    }

    if(!isEmpty(thousandSep)) ret = number_format(ret, decimalPlaces, decimalSep, thousandSep);
    ret = prefix.toString().trim() + " " + ret + " " + suffix.toString().trim();
    ret = ret.trim();

    return ret;
}

/**
 * Function recreateObject.
 * Recreates the object in the HTML DOM or cleans it
 *
 * @param obj Object to be recreated on DOM.
 */
function recreateObject(obj){
    let clone = null;
    obj.each(function (index) {
        clone = $(this).clone();
        $(this).after(clone);
    });
    clone = null;
    obj.remove();
}

/**
 * Mask for numbers function
 */
$.fn.extend({
    /**
     * Method fnNumberMask.
     * Mask that encompasses all possible types of masks related to decimals and integers
     *
     * @data dec_sep Decimal Separator
     * @data thous_sep Thousand Separator
     * @data dec_places Decimal places allowed (0-6)
     * @data prefix Mask prefix
     * @data suffix Mask suffix
     * @data allow_neg Allow or not negative numbers in mask
     */
	fnNumberMask: function () {
        /**
         * Function formatValuesFnNumberMask
         * Will format the values of the objects for subsequent functions
		 *
         * @param obj object Object to be formatted
         * @returns {*}
         */
        function formatValuesFnNumberMask(obj) {
            if(isEmpty(obj)) return {};

            let valNow = $(obj).val();
            let dec_places = parseInt(onlyNumbers($(obj).data('dec_places')));
            let prefix    = $(obj).data('prefix');
            let suffix     = $(obj).data('suffix');
            let thous_sep  = removeChrs($(obj).data('thous_sep'), '0123456789+-' + prefix + suffix);
            let dec_sep    = removeChrs($(obj).data('dec_sep'), '0123456789+-' + prefix + suffix);
            let allow_neg  = !isEmpty($(obj).data('allow_neg'));
            let onlyInteger = false;
            let isPositive = false;
            let valFloat = 0;
            let valFloatAux = "";
            let aux;

            if(
                isEmptyDecimal(dec_places) ||
                dec_places < 0
            ) {
                dec_places = 0;
				onlyInteger = true;
            }else if(dec_places > 6) {
                dec_places = 6;
            }
            if(isEmpty(valNow)) {
                valNow = "0";
                valFloatAux = "0";
            }
            if(isEmpty(dec_sep)) dec_sep = ".";
            if(isEmpty(prefix)) prefix = "";
            else                 prefix += " ";
            if(isEmpty(suffix)) suffix = "";
            else                suffix = " " + suffix;
            if(
                isEmpty(thous_sep) ||
                dec_sep === thous_sep
            ) thous_sep = "";

            valNow = valNow.toString();
            dec_sep = dec_sep.toString();
            prefix = prefix.toString();
            suffix = suffix.toString();
            thous_sep = thous_sep.toString();

            valFloat =
                parseFloat(
                    formataFloat(
                        valNow,
                        dec_sep,
                        dec_places,
                        '.',
                        '',
                        '',
                        allow_neg,
						onlyInteger,
                        ''
                    ).toString()
                );
            if(onlyInteger) valFloat = parseInt(valFloat.toString());
            if(isEmptyDecimal(valFloat)) valFloat = 0;
            isPositive =
                !allow_neg ||
                (
                    valFloat >= 0 &&
                    !hasStr(valNow, '-')
                ) ||
				hasStr(valNow, '+');

            aux = removeChrsExcept(valNow, ('0123456789' + dec_sep)).toString().split(dec_sep);
            aux[1] = aux[1] !== undefined && aux[1] !== null ? aux[1].toString() : "";

            valFloatAux =
                (
                    !isPositive ? "-" : ""
                ) +
                (
                    !isEmptyDecimal(aux[0]) ? parseInt(aux[0]) : "0"
                ) +
                (
                    (
                        !onlyInteger && hasStr(valNow, dec_sep)
                            ? (dec_sep + aux[1])
                            : ""
                    ).toString().substring(0, (dec_places + 1))
                );

            return {
                valNow: valNow,
                valFloat: valFloat,
                valFloatAux: valFloatAux,
                dec_sep: dec_sep,
                dec_places: dec_places,
                prefix: prefix,
                suffix: suffix,
                thous_sep: thous_sep,
                allow_neg: allow_neg,
                isPositive: isPositive,
				onlyInteger: onlyInteger,
            };
        }
        /**
         * Function pre.
         * Performs number formatting when clicking on the field for editing
		 *
         * @param e Event
         */
        function preMask(e){
            let obj = formatValuesFnNumberMask(this);
            $(this).val(obj.valFloat.toString().replace(".", obj.dec_sep));
        }
        /**
         * Function onMask.
         * Formats the number while typing in the field
		 *
         * @param e Event
         */
        function onMask(e) {
            let obj = formatValuesFnNumberMask(this);
            $(this).val(obj.valFloatAux);
        }
        /**
         * Function posMask.
         * After exiting typing, it formats the number
		 *
         * @param e Event
         */
        function posMask(e){
            let obj = formatValuesFnNumberMask(this);
            $(this).val(obj.prefix + number_format(obj.valFloat.toString(), obj.dec_places, obj.dec_sep, obj.thous_sep) + obj.suffix);
        }
        $(this)
            .off('focus', preMask)
            .on('focus', preMask)
            .off('input', onMask)
            .on('input', onMask)
            .off('blur', posMask)
            .on('blur', posMask);
    }
});

/**
 * Specific functions for system use
 */
$.fn.extend({
    /**
     * Function fnToggle
     * Hide and show divs on HTML DOM
     *
     * @param force string Forces specific display status (none/block/null)
     */
    fnToggle: function(force) {
        if(!isEmpty(force)) {
            $(this).css("display", force);
            return;
        }

        if ($(this).css("display") === 'none') {
            $(this).css("display", "block");
        } else {
            $(this).css("display", "none");
        }
    }
});

/**
 * Function initializeSystem.
 * Initialize functions of the system
 */
function initializeSystem() {
    recreateObject($("input[data-mask='number']"));
    $("input[data-mask='number']").fnNumberMask();

    $("input[data-mask='number_letters']").off('input');
    $("input[data-mask='number_letters']").on('input', function () {
        $(this).val(onlyNumbersLetters($(this).val()));
    });
}

initializeSystem();
