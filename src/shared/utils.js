
module.exports = {

  getRandomInt(min, max) {

    var random = Math.random();
  
    random = random * (max - min) + min;
  
    random = Math.round(random);
  
    return random;
  
  }
  
}