class SettingsForm {
  constructor(
    trello,
    storage = new Storage(trello)
  ) {
    this.t = trello
    this.storage = storage
  }

  initialize() {
    this.storage.getSettings().then(settings => {
      this.initializeElements()

      this.setScope(settings.scope)
      this.setPriority(settings.priority)
      this.setShowBadges(settings.showBadges)
      this.setPrependIcon(settings.prependIcon)

      this.listenToSubmit()
      this.listenToLogout()
    })
  }

  initializeElements() {
    this.$scope = document.getElementById('scope')
    this.$priority = document.getElementById('priority')
    this.$submitButton = document.getElementById('submit-btn')
    this.$logoutButton = document.getElementById('logout-btn')
  }

  setScope(val) {
    this.$scope.value = val
  }

  setPriority() {
    let val = getLabelsColor();
    switch (val) {
      case 'green':
        val = 0.1;
        break;
      case 'yellow':
        val = 1;
        break;
      case 'orange':
        val = 1.5;
        break;
      case 'red':
        val = 2;
        break;
      default:
        val = 1;
        break;
    }
    this.$priority.value = val
  }

  setShowBadges(val) {
    let el = document.querySelector(`#show-badges-${val}`)
    if (el) el.checked = true
  }

  getShowBadges() {
    let el = document.querySelector('input[name="show-badges"]:checked')
    return el ? JSON.parse(el.value) : true
  }

  setPrependIcon(val) {
    let el = document.querySelector(`#prepend-icon-${val}`)
    if (el) el.checked = true
  }

  getPrependIcon() {
    let el = document.querySelector('input[name="prepend-icon"]:checked')
    return el ? JSON.parse(el.value) : false
  }

  setLabelsColor(){

  }

  getLabelsColor(){
  var request = require("request");
  var options = { method: 'GET',
  url: 'https://trello.com/c/UfBiD2bH/1-por-valores-para-as-cores',
  qs: { fields: 'color' } };

  request(options, function (error, response, body) {
     if (error) throw new Error(error);
     console.log(body);}
   );
  }

  listenToSubmit() {
    this.$submitButton.addEventListener('click', () => this.handleSubmit())
  }

  listenToLogout() {
    this.$logoutButton.addEventListener('click', () => this.handleLogout())
  }

  handleSubmit() {
    this.$submitButton.disabled = true

    return this.storage.setSettings({
      scope: this.$scope.value,
      priority: this.$priority.value,
      showBadges: this.getShowBadges(),
      prependIcon: this.getPrependIcon(),
    }).then(() => this.t.closePopup())
  }

  handleLogout() {
    this.$logoutButton.disabled = true

    return this.storage.removeUser().then(() => this.t.closePopup())
  }
}

// Fails in a browser, but required for tests.
try { module.exports = SettingsForm } catch(_) {}
