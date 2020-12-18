const {
  Movie,
  Sentence,
  Music
} = require('./classic')

class Art {
  static async getData(art_id, type) {
    let art = null
    const finder = {
      where: {
        id: art_id
      }
    }
    const scope = 'bh'
    switch(type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break
      case 400:
        break
      default:
        break
    }
    return art
  }
}

module.exports = {
  Art
}