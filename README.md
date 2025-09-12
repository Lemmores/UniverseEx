# UniverseEx - Mars Rover Gallery

![Next.js](https://img.shields.io/badge/Next.js-13.5.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.3.4-green) ![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)

UniverseEx é um projeto feito com **Next.js** que permite explorar fotos dos rovers da NASA em Marte. Você pode filtrar por **Rover**, **Câmera**, **Data** ou buscar pelo nome do Rover/Câmera. As fotos são carregadas diretamente da API da NASA.

---

## 🌌 Funcionalidades

- Visualizar fotos de diferentes rovers: Curiosity, Opportunity, Spirit, Perseverance.
- Filtrar por:
  - Rover  
  - Câmera  
  - Data  
  - Nome do Rover ou Câmera (busca textual)
- Paginação automática se houver muitas fotos.
- Mensagem de aviso caso nenhum resultado seja encontrado.
- Layout responsivo e moderno, com preview de fotos em grid.

---

## ⚙️ Tecnologias

- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- Fetch API para consumir dados da NASA  
- Deploy no [Vercel](https://vercel.com/)

---

## 🚀 Deploy no Vercel

O projeto está publicado no **Vercel**, versão estável compatível com Next.js 13+.  
URL do deploy: `https://seu-projeto.vercel.app` *(substitua pelo seu link)*

> ⚠️ Observação: às vezes as imagens podem demorar alguns segundos para carregar, dependendo da quantidade de fotos retornadas pela API da NASA.

---

## 📁 Estrutura do Projeto

```
universeex_project/
├─ app/
│  └─ page.js           # Página principal
├─ components/
│  ├─ Filters.jsx       # Filtros de busca
│  ├─ Gallery.jsx       # Grid de imagens
│  ├─ Header.jsx
│  └─ Footer.jsx
├─ lib/
│  └─ nasa.js           # Funções de fetch da API NASA
├─ public/
├─ styles/
├─ package.json
└─ next.config.mjs
```

---

## 🔑 Variáveis de Ambiente

Para rodar localmente ou no Vercel, crie a variável:

```bash
NEXT_PUBLIC_NASA_API_KEY=SuaChaveDaNASA
```

> Use [essa página da NASA](https://api.nasa.gov/) para gerar sua chave gratuita.

---

## 💻 Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/Lemmores/UniverseEx.git
cd UniverseEx
```

2. Instale as dependências:

```bash
npm install
```

3. Crie a variável de ambiente `NEXT_PUBLIC_NASA_API_KEY`.  
4. Rode o projeto:

```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`.

---

## 📜 Licença

MIT License © 2025 Marcelo Lemos
