# 🦦 Marmota Mobilidade - Relatórios e Gestão
 
Este projeto foi desenvolvido como parte da Sprint 3, utilizando **Next.js** e **TypeScript**, com estilização em **TailwindCSS**. Ele inclui funcionalidades como login, geração de relatórios e visualização de falhas no sistema.
 
## 🚀 Tecnologias Utilizadas
- **Next.js** (App Router)
- **TypeScript**
- **TailwindCSS**
- **LocalStorage** (para armazenamento temporário)
- **Git/GitHub** para versionamento

## 📌 Estrutura do Projeto
 
```
/
├── src/
│   ├── app/
│   │   ├── login/page.tsx  # Página inicial (Login)
│   │   ├── membros/page.tsx  # Página dos membros da equipe
│   │   ├── dashboard/page.tsx  # Página principal do sistema
│   │   ├── relatorios/page.tsx  # Tela de relatórios
│   │   ├── globals.css  # CSS global do projeto
│   │   ├── layout.tsx  # Arquivo de padronização
│   │   ├── page.tsx  # Redireciona para página de login
│   │   └── not-found.tsx # Página de não encontrado
│   └── routes.ts  # Definição de rotas
├── public/
│   ├── marmota-icon.png  # Ícone do site
│   └── membros/  # Imagens dos membros
├── .gitignore  # Ignora arquivos desnecessários no Git
├── README.md  # Documentação do projeto
├── tailwind.config.ts  # Estilização do projeto
└── package.json  # Dependências e scripts do projeto
```
 
## 📢 Funcionalidades Implementadas
✅ Página de **Login** com validação de credenciais.  
✅ Página de **Membros da Equipe** com nomes, RM e turma.  
✅ Sistema de **Relatórios** com filtros por data e tipo.
✅ Sistema de **Falhas** com filtros por data e tipo e de adição.   
✅ **Responsividade** para desktop, tablet e mobile.  
✅ **Componentização** seguindo boas práticas.  
✅ **Uso do GitHub** para versionamento do código.  
 

 ## 🔧 Como Rodar o Projeto
 
1. Clone o repositório:
   ```bash
   git clone https://github.com/MMChallengeMM/Challenge-FrontEnd
   ```
 
2. Acesse a pasta do projeto:
   ```bash
   cd marmota-mobilidade
   ```
 
3. Instale as dependências:
   ```bash
   npm install
   ```
 
4. Rode o projeto:
   ```bash
   npm run dev
   ```
 
5. Acesse no navegador: [http://localhost:3000](http://localhost:3000)
 
## Credenciais Implementadas
Por se tratar de um sistema que não seria de acesso de ninguém fora de um sistema da CCR implementamos um login simples que seria determinado pela própria CCR para uso dos seus funcionarios. Atualmente as credenciais necessárias para acesso são:
 
Usuário: admin
 
Senha: password
 
## 🔗 Acesso ao Protótipo
Visualize o protótipo no Figma: [Figma-Marmota-Mobilidade](https://www.figma.com/design/RT1CQ4JFjZMSyyqfu6yGmy/Marmota-Mobilidade?node-id=0-1&p=f&t=VbG9F8SSmXtPC6re-0)
 
## 📹 Vídeo de Apresentação
🎥 O vídeo do projeto pode ser acessado [neste link](https://www.youtube.com/watch?v=XxLYnHuRkbc)


## 👥 Membros da Equipe
| Nome         | RM       | Turma   |
|-------------|---------|--------|
| João Alves  | RM559369 | 1TDSPB |
| Juan Coelho | RM560445 | 1TDSPB |
| Matheus Mariotto    | RM560276 | 1TDSPB |
 
## 📜 Licença
Este projeto foi desenvolvido para fins acadêmicos e segue as diretrizes do curso.