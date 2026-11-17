# Vértice Digital — site

Site institucional da Vértice Digital, pronto para hospedar no Render.

```
public/
  index.html   ← o site inteiro (textos, estilos, imagens e animações)
  robots.txt   ← libera o Google para indexar o site
render.yaml    ← configuração da hospedagem no Render
```

## Publicar no Render

1. Crie um repositório no GitHub (pode ser privado) e envie estes arquivos,
   mantendo a pasta `public/`.
2. No Render: **New → Blueprint**, escolha o repositório e confirme.
   O Render lê o `render.yaml` e cria o site sozinho.
   (Outra forma: **New → Static Site**, com *Build Command* `echo ok` e
   *Publish Directory* `public`.)
3. Em 1–2 minutos o site abre em `https://vertice-digital.onrender.com`
   (ou um nome parecido).

## Usar o domínio .com.br

1. No Render, abra o site → **Settings → Custom Domains → Add** e digite o
   domínio (ex.: `verticedigital.com.br`). O `www` é adicionado junto.
2. No Registro.br, abra o domínio → **DNS → Editar zona** e crie:
   - registro **A**, nome vazio (raiz), valor `216.24.57.1`
   - registro **CNAME**, nome `www`, valor `vertice-digital.onrender.com`
     (use o endereço .onrender.com que o Render mostrar)
3. Volte ao Render e clique em **Verify**. O cadeado (https) é criado
   automaticamente.

## Atualizar o site

Troque o arquivo `public/index.html` no GitHub pelo novo. O Render publica a
nova versão sozinho a cada alteração.
