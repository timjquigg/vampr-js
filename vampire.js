class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberAway = 0;
    let vampire = this;
    while (vampire.creator) {
      vampire = vampire.creator;
      numberAway++;
    }
    return numberAway;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get lineage() {
    let vampire = this;
    const vampireLine = [vampire];
    while (vampire.creator) {
      vampire = vampire.creator;
      vampireLine.push(vampire);
    }
    return vampireLine;
  }
  
  closestCommonAncestor(vampire) {
    const [senior, junior] = this.isMoreSeniorThan(vampire) ? [this, vampire] : [vampire, this];
    return senior.lineage.find(vampireInLine => {
      if (junior.lineage.includes(vampireInLine)) {
        return vampireInLine;
      }
    });
  }
  
}

module.exports = Vampire;