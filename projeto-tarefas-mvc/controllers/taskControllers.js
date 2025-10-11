const Task = require('../models/Task'); // O Controller precisa do Model para interagir com o banco

module.exports = {
  // Função para RENDERIZAR a página com todas as tarefas
 // Função para RENDERIZAR a página com todas as tarefas
  async showTasks(req, res) {
    const filter = req.query.filter || 'todas';
    let where = {};

    if (filter === 'pendentes') where.done = false; // Busca booleano FALSE
    if (filter === 'concluidas') where.done = true;  // Busca booleano TRUE

    const tasks = await Task.findAll({ where, raw: true });
    res.render('all', { tasks, filter });
  },

  // Função para RENDERIZAR a página de criação de tarefa
  createTask(req, res) {
    res.render('create');
  },

  // Função para SALVAR uma nova tarefa no banco
  async saveTask(req, res) {
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      done: false,
      priority: req.body.priority,
      dueDate: req.body.dueDate, // novo campo
    });

    res.redirect('/tasks');
  },

  // Função para RENDERIZAR a página de edição com dados de UMA tarefa
  async editTask(req, res) {
    const id = req.params.id;
    const task = await Task.findByPk(id, { raw: true });
    res.render('edit', { task });
  },

  // Função para ATUALIZAR uma tarefa no banco
  async updateTask(req, res) {
    const id = req.body.id;

    await Task.update(
      {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done === 'on',
        priority: req.body.priority,
        dueDate: req.body.dueDate, // novo campo
      },
      { where: { id } }
    );

    res.redirect('/tasks');
  },

  // Função para DELETAR uma tarefa
  async deleteTask(req, res) {
    const id = req.body.id;
    await Task.destroy({ where: { id } });
    res.redirect('/tasks');
  },
};
