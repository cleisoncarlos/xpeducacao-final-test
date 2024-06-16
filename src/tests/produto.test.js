const request = require('supertest');
const app = require('../index'); // ajuste o caminho conforme necessário
const Produto = require('../models/produt.model'); // ajuste o caminho conforme necessário
let server;

// Mock da base de dados (opcional, ajuste conforme necessário)
const mockProdutos = [
    { codigo: '001', nome: 'Produto 1', preco: 10, descricao: 'Descrição 1' },
    { codigo: '002', nome: 'Produto 2', preco: 20, descricao: 'Descrição 2' }
];

beforeAll(async () => {
    server = app.listen(3001); // Utilize uma porta diferente
    await Produto.sync({ force: true }); // Sincroniza o modelo com o banco de dados
});

afterAll(done => {
    server.close(done);
});

afterEach(async () => {
    // Limpa os dados após cada teste para garantir um estado limpo
    await Produto.destroy({ where: {} });
});

beforeEach(async () => {
    // Repopula o banco de dados antes de cada teste
    await Produto.bulkCreate(mockProdutos);
});

describe('Testes de integração para a API de Produtos', () => {

    test('POST /produtos - Deve criar um novo produto', async () => {
        const newProduto = { codigo: '003', nome: 'Produto 3', preco: 30, descricao: 'Descrição 3' };

        const response = await request(app)
            .post('/produtos')
            .send(newProduto)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newProduto);
    });

    test('GET /produtos - Deve retornar todos os produtos', async () => {
        const response = await request(app)
            .get('/produtos')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2); // Assumindo que temos 2 produtos mockados
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining(mockProdutos[0]),
                expect.objectContaining(mockProdutos[1])
            ])
        );
    });

    test('PUT /produtos/:codigo - Deve atualizar um produto existente', async () => {
        const updatedData = { preco: 50, descricao: 'Descrição Atualizada' };

        const response = await request(app)
            .put('/produtos/001')
            .send(updatedData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.preco).toBe(50);
        expect(response.body.descricao).toBe('Descrição Atualizada');
    });

    test('DELETE /produtos/:codigo - Deve deletar um produto existente', async () => {
        const response = await request(app)
            .delete('/produtos/001')
        //  .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Produto deletado com sucesso');

        // Verificar se o produto foi realmente deletado
        const getResponse = await request(app)
            .get('/produtos')
        // .set('Accept', 'application/json');
        expect(getResponse.body.length).toBe(1); // Devemos ter apenas um produto restante
    });

    test('GET /produtos/:codigo - Deve retornar erro 404 para produto inexistente', async () => {
        const response = await request(app)
            .delete('/produtos/999999999999')
        //  .set('Accept', 'application/json');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Produto não encontrado');
    });
});
