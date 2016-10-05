/**
 * invokes fn when passed key sequence is typed within passed threshold.
 *
 * @param {string} sequence of characters such as `qwerty`.
 * @param {number} threshold between key presses in milliseconds.
 * @param {function} function to be invoked when sequence is typed successfully.
 * @return {object} object containing method to remove eventlistener.
 */
function keySequence(keySequence, threshold, fn) {
  'use strict'

  var keyspressed = [];
  var deadline = null;

  var reset = function() {
    keyspressed = [];
  }

  var onPress = function(e) {
    if (deadline) {
      clearTimeout(deadline);
    }
    deadline = setTimeout(reset, threshold);

    if (keyspressed.length === keySequence.length) {
      reset();
    }

    var keyCode = e.keyCode || e.charCode;
    var character = String.fromCharCode(keyCode);

    keyspressed.push(character);
    if (keyspressed.join('') === keySequence) {
      fn();
    }
  }

  document.addEventListener('keypress', onPress, false);

  return {
    remove: function() {
      document.removeEventListener('keypress', onPress);
    }
  }
}