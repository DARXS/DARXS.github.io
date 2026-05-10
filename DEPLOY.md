# 🚀 Guia de Deploy - Portfólio Danilo Adryel

Este documento fornece instruções detalhadas para fazer deploy do portfólio em diferentes plataformas.

## 📋 Índice

- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cloudflare Pages](#cloudflare-pages)
- [Hospedagem Tradicional](#hospedagem-tradicional)

---

## 🐙 GitHub Pages

### Método 1: Via Interface Web

1. **Crie um repositório no GitHub**
   - Nome sugerido: `portfolio` ou `{seu-username}.github.io`

2. **Faça upload dos arquivos**
   - Arraste e solte: `index.html`, `css/`, `js/`, `README.md`

3. **Ative o GitHub Pages**
   - Vá em `Settings` → `Pages`
   - Source: `main` branch
   - Folder: `/ (root)`
   - Clique em `Save`

4. **Acesse seu site**
   - URL: `https://{seu-username}.github.io/portfolio/`
   - Ou: `https://{seu-username}.github.io/` (se repo for {username}.github.io)

### Método 2: Via Git CLI

```bash
# Crie o repositório local
git init
git add .
git commit -m "Initial commit - Portfolio v1.0"

# Conecte ao GitHub
git remote add origin https://github.com/{seu-username}/portfolio.git
git branch -M main
git push -u origin main

# Ative GitHub Pages nas configurações do repositório
```

**Tempo de deploy**: ~2-5 minutos  
**Custo**: Gratuito  
**Custom domain**: Sim (via CNAME)

---

## 🌐 Netlify

### Deploy via Interface

1. **Acesse [netlify.com](https://netlify.com)**
2. **Clique em "Add new site" → "Deploy manually"**
3. **Arraste a pasta do projeto**
4. **Aguarde o deploy**

### Deploy via CLI

```bash
# Instale o Netlify CLI
npm install -g netlify-cli

# Faça login
netlify login

# Deploy
netlify deploy --prod
```

### Deploy via Git (Recomendado)

1. Conecte seu repositório GitHub
2. Configure:
   - Branch: `main`
   - Build command: (deixe vazio)
   - Publish directory: `./`
3. Deploy automático a cada push!

**Tempo de deploy**: ~30 segundos  
**Custo**: Gratuito (100GB bandwidth/mês)  
**Custom domain**: Sim + SSL gratuito  
**Vantagens**: CI/CD automático, preview deploys, rollback fácil

---

## ⚡ Vercel

### Deploy via Interface

1. **Acesse [vercel.com](https://vercel.com)**
2. **Clique em "New Project"**
3. **Importe do GitHub**
4. **Configure:**
   - Framework Preset: Other
   - Root Directory: `./`
   - Build Command: (deixe vazio)
   - Output Directory: `./`
5. **Deploy!**

### Deploy via CLI

```bash
# Instale o Vercel CLI
npm install -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

**Tempo de deploy**: ~20 segundos  
**Custo**: Gratuito (100GB bandwidth/mês)  
**Custom domain**: Sim + SSL gratuito  
**Vantagens**: Edge network global, analytics incluído

---

## ☁️ Cloudflare Pages

### Deploy via Interface

1. **Acesse [pages.cloudflare.com](https://pages.cloudflare.com)**
2. **Clique em "Create a project"**
3. **Conecte o GitHub**
4. **Configure:**
   - Build command: (deixe vazio)
   - Build output directory: `/`
5. **Save and Deploy**

**Tempo de deploy**: ~30 segundos  
**Custo**: Gratuito (ilimitado)  
**Custom domain**: Sim + SSL gratuito  
**Vantagens**: CDN global ultra-rápido, sem limites de bandwidth

---

## 🖥️ Hospedagem Tradicional (cPanel)

### Via FTP/SFTP

1. **Acesse seu painel de hospedagem**
2. **Use FileZilla ou similar**
3. **Conecte via FTP:**
   ```
   Host: ftp.seudominio.com
   User: seu_usuario
   Password: sua_senha
   Port: 21
   ```
4. **Faça upload dos arquivos para `/public_html/`**

### Via cPanel File Manager

1. Acesse o cPanel
2. Abra "File Manager"
3. Navegue até `/public_html/`
4. Faça upload dos arquivos
5. Extraia (se necessário)

**Tempo de deploy**: ~5-10 minutos  
**Custo**: Varia (R$ 10-50/mês)  
**Custom domain**: Sim (seu próprio)

---

## 🔧 Configurações Adicionais

### Custom Domain

**Para GitHub Pages:**
```bash
# Crie arquivo CNAME na raiz
echo "seudominio.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

**DNS Configuration:**
```
Type: CNAME
Name: www
Value: {username}.github.io

Type: A
Name: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153
```

### SSL Certificate

Todas as plataformas mencionadas (GitHub Pages, Netlify, Vercel, Cloudflare) incluem SSL gratuito via Let's Encrypt.

Para hospedagem tradicional:
- Use Let's Encrypt (gratuito)
- Ou compre certificado SSL (R$ 50-200/ano)

---

## 📊 Comparação de Plataformas

| Plataforma | Custo | Velocidade | SSL | CI/CD | Bandwidth | Melhor Para |
|------------|-------|------------|-----|-------|-----------|-------------|
| GitHub Pages | Grátis | ⭐⭐⭐ | ✅ | ✅ | 100GB | Open source |
| Netlify | Grátis | ⭐⭐⭐⭐ | ✅ | ✅ | 100GB | Full CI/CD |
| Vercel | Grátis | ⭐⭐⭐⭐⭐ | ✅ | ✅ | 100GB | Performance |
| Cloudflare | Grátis | ⭐⭐⭐⭐⭐ | ✅ | ✅ | Ilimitado | CDN Global |
| cPanel | Pago | ⭐⭐ | 💰 | ❌ | Limitado | Controle total |

---

## ✅ Checklist Pré-Deploy

- [ ] Testar localmente em diferentes navegadores
- [ ] Verificar responsividade (mobile, tablet, desktop)
- [ ] Testar dark mode
- [ ] Verificar todos os links (certificados, GitHub, sociais)
- [ ] Otimizar imagens (se houver)
- [ ] Minificar CSS/JS (opcional para produção)
- [ ] Configurar Google Analytics (opcional)
- [ ] Testar formulário de contato
- [ ] Verificar meta tags (SEO)
- [ ] Testar performance (Lighthouse)

---

## 🚀 Deploy Recomendado

Para este portfólio, recomendo:

### 🥇 **Opção 1: Vercel** (Melhor performance)
- Deploy mais rápido
- CDN global edge network
- Analytics incluído
- Preview deploys automáticos

### 🥈 **Opção 2: Netlify** (Mais features)
- Forms integrado
- Functions serverless
- Split testing
- Comunidade ativa

### 🥉 **Opção 3: GitHub Pages** (Mais simples)
- Integração nativa com GitHub
- Simples e direto
- Gratuito para sempre

---

## 📝 Comandos Úteis

### Testar localmente

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Verificar performance

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage
```

### Otimizar assets

```bash
# Minificar HTML
npm install -g html-minifier
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# Minificar CSS
npm install -g clean-css-cli
cleancss -o style.min.css style.css

# Minificar JS
npm install -g terser
terser main.js -o main.min.js
```

---

## 🆘 Troubleshooting

### GitHub Pages não atualiza
```bash
# Limpe o cache
git commit --allow-empty -m "Trigger rebuild"
git push
```

### CSS não carrega
- Verifique os caminhos relativos
- Use caminhos relativos (`./css/style.css` ou `css/style.css`)
- Não use caminhos absolutos (`/css/style.css`)

### Formulário não funciona
- O formulário usa `mailto:` que abre o cliente de email
- Para formulário real, considere:
  - Netlify Forms (gratuito)
  - Formspree (gratuito/pago)
  - EmailJS (gratuito)

---

## 📞 Suporte

Se precisar de ajuda com o deploy:

- 📧 Email: danilo.adryel.r.x.s@gmail.com
- 💼 LinkedIn: [linkedin.com/in/daniloadryel](https://linkedin.com/in/daniloadryel)
- 💻 GitHub: [github.com/DARXS](https://github.com/DARXS)

---

**Última atualização**: 2026-01-11  
**Versão**: 1.0.0
