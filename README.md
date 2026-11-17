# Vértice Digital — site

Site institucional da Vértice Digital: React + Tailwind CSS, com animações
próprias (sem bibliotecas extras).

## Estrutura

```
src/                      ← código do site
  App.jsx                 ← ordem das seções
  config.js               ← WhatsApp, e-mail, Instagram, cidade e menu
  styles.css              ← cores, fontes e animações
  components/
    Header.jsx            ← topo e menu
    Sections.jsx          ← Início, Sobre, Serviços, Diferenciais e chamada final
    Portfolio.jsx         ← seção de projetos
    HeroVisual.jsx        ← o "V" em forma de cérebro
    Motion.jsx            ← animações de texto, cards e faixa
    ui/                   ← grade animada, botão magnético e rodapé
  assets/portfolio/       ← imagens dos projetos
public/favicon.svg        ← ícone da aba
index.html                ← página base (título e descrição para o Google)
site/                     ← site PRONTO (é o que o Render publica)
render.yaml               ← configuração do Render
```

## Rodar no computador

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev        # abre em http://localhost:5173
npm run build      # gera a versão final na pasta dist/
```

## Hospedagem no Render

O `render.yaml` publica a pasta `site/`, que já está pronta. No Render:
**New → Blueprint** e escolha este repositório.

Para publicar uma versão nova depois de mudar o código: rode `npm run build`
e copie o conteúdo de `dist/` para `site/`. Ou mude o `render.yaml` para
`buildCommand: npm install && npm run build` e `staticPublishPath: ./dist`,
assim o Render compila sozinho a cada envio.

## Domínio .com.br

1. No Render: site → **Settings → Custom Domains → Add** e digite o domínio.
2. No Registro.br: domínio → **DNS → Editar zona**:
   - registro **A**, nome vazio, valor `216.24.57.1`
   - registro **CNAME**, nome `www`, valor `<seu-site>.onrender.com`
3. No Render, clique em **Verify**. O https é criado automaticamente.
