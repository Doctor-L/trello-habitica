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
    this.$submitButton.addEventListener('click', this.handleSubmit.bind(this))
  }

  handleSubmit() {
    this.$submitButton.disabled = true

    this.storage.getTask().then(task => {
      if (task.priority == this.$priority.value) return

      return new Task(this.t).handleUpdate({ priority: this.$priority.value })
    }).then(() => this.t.closePopup())
  }
}
