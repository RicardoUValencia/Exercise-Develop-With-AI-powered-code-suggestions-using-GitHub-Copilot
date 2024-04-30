function skillsMember() {
  // Path: member.js
  function Member(name) {
    this.name = name;
    this.skills = [];
  }

  Member.prototype.learn = function (skill) {
    this.skills.push(skill);
  };

  Member.prototype.getSkills = function () {
    return this.skills.join(", ");
  };

  return Member;
}