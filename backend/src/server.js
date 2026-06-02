// Express é o que deixa o servidor rodando e respondendo às requisições
import express from 'express' 
// CORS é uma política de segurança que bloqueia requisições de origens diferentes. Usamos para permitir que o frontend (que roda em outra porta) se comunique com o backend.
import cors from 'cors'
import { authRoutes } from './routes/auth.js'

const app = express()
const PORT = process.env.PORT || 3333

// porta padrão do Vite
app.use(cors({
  origin: [
    "https://theoros-base.vercel.app/"
  ],
  credentials: true
}));

// permite que o Express entenda requisições com corpo em JSON
app.use(express.json())

// Rotas
app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.clear() // Limpa o terminal para exibir a mensagem personalizada de forma mais limpa
  process.stdout.write('\x1Bc'); // Limpa o terminal de forma mais completa

console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║ ████████╗██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗  ║
║ ╚══██╔══╝██║  ██║██╔════╝██╔═══██╗██╔══██╗██╔═══██╗██╔════╝  ║
║    ██║   ███████║█████╗  ██║   ██║██████╔╝██║   ██║███████╗  ║
║    ██║   ██╔══██║██╔══╝  ██║   ██║██╔══██╗██║   ██║╚════██║  ║
║    ██║   ██║  ██║███████╗╚██████╔╝██║  ██║╚██████╔╝███████║  ║
║    ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝  ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║               ✦ NÚCLEO ARCANO DO REINO ✦                     ║
║                                                              ║
║  As engrenagens do mundo foram despertadas.                  ║
║  Os arquivos antigos ecoam pelos corredores.                 ║
║  Criaturas e dados agora respondem ao chamado.               ║
║                                                              ║
║  🗄️  Backend Arcano: http://localhost:3333                    ║
║                                                              ║
║  ⚔ API: ONLINE                                               ║
║  🛡 Banco de dados sincronizado                               ║
║  📜 Rotas carregadas com sucesso                             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`)
})