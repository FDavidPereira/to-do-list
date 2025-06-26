const Main = {
    tasks: [],

    init: function () {
        this.cacheSelectors()
        this.bindEvents()
        this.getStoraged()
        this.buildTasks()
    },

    cacheSelectors: function () {
        this.$inputTask = document.querySelector('#inputTask')
        this.$list = document.querySelector('#list')
    },

    bindEvents: function () {
        this.$inputTask.onkeypress = this.Events.inputTask_keypress.bind(this)
        this.$list.addEventListener('click', this.Events.listClickHandler.bind(this))
    },

    getStoraged: function () {
        const tasks = localStorage.getItem('tasks')
        this.tasks = tasks ? JSON.parse(tasks) : []
    },

    getTaskHtml: function (task) {
        return `
            <li>
                <div class="check"></div>
                <label class="task">${task}</label>
                <button class="remove" data-task="${task}"></button>
            </li>
        `
    },

    buildTasks: function () {
        let html = ''

        this.tasks.forEach(item => {
            html += this.getTaskHtml(item.task)
        })

        this.$list.innerHTML = html
    },

    Events: {
        listClickHandler: function (e) {
            const el = e.target
            const li = el.closest('li')

            if (el.classList.contains('check')) {
                li.classList.toggle('done')
                return
            }

            if (el.classList.contains('remove')) {
                const value = el.dataset['task']
                Main.tasks = Main.tasks.filter(item => item.task !== value)
                localStorage.setItem('tasks', JSON.stringify(Main.tasks))

                li.classList.add('removed')
                setTimeout(() => li.classList.add('hidden'), 300)
            }
        },

        inputTask_keypress: function (e) {
            const key = e.key
            const value = e.target.value.trim()

            if (key === 'Enter' && value) {
                const newTask = { task: value }
                Main.tasks.unshift(newTask)
                localStorage.setItem('tasks', JSON.stringify(Main.tasks))

                Main.buildTasks()
                e.target.value = ''
            }
        }
    }
}

Main.init()