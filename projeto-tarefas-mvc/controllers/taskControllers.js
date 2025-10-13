const Task = require('../models/Task');

module.exports = {
  // 🔹 Todas as tarefas
  async showAll(req, res) {
    const tasks = await Task.findAll({ raw: true });
    res.render('all', { tasks, activeFilter: 'all' });
  },

  // 🔹 Somente concluídas
  async showDone(req, res) {
    const tasks = await Task.findAll({ where: { done: true }, raw: true });
    res.render('all', { tasks, activeFilter: 'done' });
  },

  // 🔹 Somente em andamento
  async showDoing(req, res) {
    const tasks = await Task.findAll({ where: { done: false }, raw: true });
    res.render('all', { tasks, activeFilter: 'doing' });
  },

  // 🔹 Página de criação
  createTask(req, res) {
    res.render('create');
  },

  // 🔹 Criar tarefa
  async saveTask(req, res) {
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
    });

    res.redirect('/tasks');
  },

  // 🔹 Editar tarefa
  async editTask(req, res) {
    const id = req.params.id;
    const task = await Task.findByPk(id, { raw: true });
    res.render('edit', { task });
  },

  // 🔹 Atualizar tarefa
  async updateTask(req, res) {
    const id = req.body.id;

    await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done === 'on',
        priority: req.body.priority,
        dueDate: req.body.dueDate,
      },
      { where: { id } }
    );

    res.redirect('/tasks');
  },

  // 🔹 Excluir tarefa
  async deleteTask(req, res) {
    const id = req.body.id;
    await Task.destroy({ where: { id } });
    res.redirect('/tasks');
  },
};
