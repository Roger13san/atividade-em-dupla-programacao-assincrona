const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskControllers');

//  Página inicial — lista todas as tarefas
router.get('/', taskController.showAll);

// Lista de tarefas concluídas
router.get('/done', taskController.showDone);

//  Lista de tarefas em andamento
router.get('/doing', taskController.showDoing);

//  Página de criação
router.get('/create', taskController.createTask);

//  Recebe o formulário de criação
router.post('/create', taskController.saveTask);

//  Página de edição
router.get('/edit/:id', taskController.editTask);

//  Recebe o formulário de edição
router.post('/edit', taskController.updateTask);

//  Deletar tarefa
router.post('/delete', taskController.deleteTask);

module.exports = router;