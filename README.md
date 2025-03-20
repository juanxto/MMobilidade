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
 