const express = require('express')
const Produto = require('./models/produt.model')
require('dotenv').config()

const app = express()
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Wold!')
})

// Create
app.post('/produtos', async (req, res) => {
    try {
        const { codigo, nome, preco, descricao } = req.body;
        // Verifica se o produto já existe pelo código
        let produto = await Produto.findOne({ where: { codigo } });
        if (produto) {
            // Atualiza o produto existente
            produto = await produto.update({ nome, preco, descricao });
            res.status(200).json(produto); // Retorna o produto atualizado com status 200
        }
        // Cria um novo produto caso o codigo não esteja cadastrado no banco de dados
        produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
app.put('/produtos/:codigo', async (req, res) => {
    try {
        let { preco, descricao } = req.body;
        const produto = await Produto.findOne({ where: { codigo: req.params.codigo } });
        //  const produto = await Produto.findByPk(req.params.id);
        if (produto) {
            const produtoAtualizado = await produto.update({ preco, descricao });
            res.status(200).json(produtoAtualizado); // Retorna o produto atualizado com status 200

        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(405).json({ error: error.message });
    }
});



// Delete pelo Código
app.delete('/produtos/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        const produto = await Produto.findOne({ where: { codigo } });

        if (produto) {
            await produto.destroy();
            res.status(200).json({ message: 'Produto deletado com sucesso', produto });
        } else {
            res.status(404).json({ error: 'Produto não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// app.listen(process.env.PORT, () => {
//     console.log(`Servidor rodando na porta ${process.env.PORT}`);
// });


// if para rodar os testes usando a mesma porta
if (require.main === module) {
    app.listen(process.env.PORT, () => {
        console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
}


exports.module = app






















module.exports = app



