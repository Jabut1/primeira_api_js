import express from 'express'   

const app = express();
const PORT = 3000;

app.use(express.json());

let funcionarios = [
    { id: 1, funcionario: 'Carloss' },
    { id: 2, funcionario: 'Eduardo' },
    { id: 3, funcionario: 'Fernando'}
];



app.get('/funcionarios', (req, res) => {
    res.json(funcionarios);
});


app.post('/funcionarios', (req, res) => {
    const novoFuncionario = req.body;
    novoFuncionario.id = funcionarios.length + 1;
    funcionarios.push(novoFuncionario);
    res.status(201).json(novoFuncionario);
});

app.put('/funcionarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = funcionarios.findIndex(f => f.id === id);
    if (index !== -1) {
        funcionarios[index] = { id, ...req.body };
        res.json(funcionarios[index]);
    } else {
        res.status(404).send('Funcionário não encontrado');
    }
});

app.delete('/funcionarios/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    const index = funcionarios.findIndex(f => f.id === id);
    funcionarios = funcionarios.filter(f => f.id !== id);
    res.json({ message: 'Funcionário deletado com sucesso'});
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});