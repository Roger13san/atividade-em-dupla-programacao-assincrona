const { Sequelize } = require('sequelize');

// ⚠️ ATENÇÃO MÁXIMA AQUI ⚠️
// 1. Verifique se o seu servidor MySQL (XAMPP, etc.) está LIGADO.
// 2. Crie o banco de dados 'tasks_db' no seu MySQL com o comando: CREATE DATABASE tasks_db;
// 3. Substitua 'usuario' e 'senha' pelas SUAS credenciais.
//    (Em XAMPP padrão, o usuário é 'root' e a senha é vazia: '')
const sequelize = new Sequelize('tasks_db', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

try {
  sequelize.authenticate();
  console.log('🔌 Conexão com postgres estabelecida com sucesso!');
} catch (error) {
  console.error('❌ Não foi possível conectar ao banco de dados:', error);
}
(async () => {
  try {
   await sequelize.sync();
 // 👈 adiciona isso
    console.log('📦 Tabelas sincronizadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao sincronizar tabelas:', error);
  }
})();

module.exports = sequelize;