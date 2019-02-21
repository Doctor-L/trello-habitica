class TaskForm {
  constructor(
    trello,
    storage = new Storage(trello)
  ) {
    this.t = trello
    this.storage = storage
  }

  initialize() {
    this.storage.getTask().then(task => {
      this.initializeElements()

      this.setPriority(task.priority)
      
      this.listenToSubmit()
    })
  }

  initializeElements() {
    this.$priority = document.getElementById('priority')
    this.$submitButton = document.getElementById('submit-btn')
  }

  setPriority(val) {
    this.$priority.value = val
  }

  listenToSubmit() {
    this.$submitButton.addEventListener('click', () => this.handleSubmit())
  }
  
  updatePriority(val) {
    return new Task(this.t).handleUpdate({ priority: val })
  }

  handleSubmit() {
    console.log(this)
    this.$submitButton.disabled = true

    this.storage.getTask().then(task => {
      if (task.priority == this.$priority.value) return

      return this.updatePriority(this.$priority.value)
    }).then(() => this.t.closePopup())
  }
}

// Fails in a browser, but required for tests.
try { module.exports = TaskForm } catch(_) {}