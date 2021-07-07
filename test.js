(function() {
  console.log(leecode1([1,5,6,8], 11));
})();

function leecode1(arr, target) {
  for(var a = 0; a < arr.length;a++) {
    for (var b = a + 1; b < arr.length; b++) {
      if ((arr[a] + arr[b]) === target) {
        return [a,b];
      }
    }
  }
};