# Vitória & Guilherme

Site do casamento de Vitória e Guilherme: **sábado, 07 de novembro de 2026, às 20h**, na Igreja de São Sebastião, em Pará de Minas – MG.

O site reúne as informações da cerimônia, fotos do ensaio do casal e uma lista de presentes paga via PIX.

## Seções

- **Início** – foto de capa e contagem regressiva para a cerimônia.
- **O casal** – apresentação de Vitória e Guilherme.
- **Galeria** – fotos do ensaio.
- **Cerimônia** – data, horário, endereço, mapa incorporado e link de rota no Google Maps.
- **Lista de presentes** – cada presente gera um QR Code PIX estático (com o valor já preenchido) e um código "copia e cola". Também há a opção de copiar a chave PIX ou escolher um valor livre.

## Tecnologias

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev)
- [qrcode](https://github.com/soldair/node-qrcode) para gerar os QR Codes
- Gerador de BR Code PIX próprio, sem dependências (`src/lib/pix.ts`)

## Como rodar

Requer Node.js e Yarn.

```bash
yarn            # instala as dependências
yarn dev        # servidor de desenvolvimento
yarn build      # verificação de tipos + build de produção em dist/
yarn preview    # serve o build localmente
yarn lint       # ESLint
```

## Personalização

Quase tudo que muda de um casamento para outro fica em poucos arquivos:

| Arquivo | O que contém |
| --- | --- |
| `src/config.ts` | `EVENT` (nomes, data, igreja, endereço, busca do mapa), `PIX` (chave, nome e cidade do recebedor), `PHOTOS` (capa e foto do casal) e `GALLERY` (fotos da galeria) |
| `src/data/gifts.ts` | Lista de presentes: nome, descrição, ícone e valor. Sem `price`, o presente vira "Valor livre" |
| `public/fotos/` | Imagens usadas no site |
| `src/index.css` | Estilos globais |

### PIX

- `merchantName` e `merchantCity` devem estar **sem acentos**, com até 25 e 15 caracteres, respectivamente (exigência do padrão EMV do Banco Central).
- O código gerado é um PIX estático. Antes de publicar, vale pagar um presente de teste para confirmar que a chave e o recebedor aparecem certos no app do banco.

### Prévia ao compartilhar (Open Graph)

As tags Open Graph e Twitter ficam em `index.html` e usam a imagem `public/og-image.jpg` (1200×630). Como redes sociais exigem URL absoluta, o placeholder `%SITE_URL%` é trocado no build (`vite.config.ts`) por:

1. `VITE_SITE_URL`, se definida (`.env` ou variáveis do projeto na Vercel), ex.: `VITE_SITE_URL=https://vitoriaeguilherme.com.br`;
2. senão, o domínio de produção da Vercel (`VERCEL_PROJECT_PRODUCTION_URL`, preenchido automaticamente no deploy);
3. senão, `https://vitoriaeguilherme.vercel.app`.

Depois de publicar, teste a prévia no [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/). O WhatsApp guarda a prévia em cache; se ela não atualizar, compartilhe o link com um parâmetro novo (ex.: `?v=2`).

### Fotos

Coloque as imagens em `public/fotos/` e referencie-as em `src/config.ts` com o caminho `/fotos/nome.jpg`. Na galeria, o campo `position` ajusta o enquadramento da miniatura (valor de `object-position` do CSS, ex.: `'50% 30%'`).

A pasta `fotos-originais/` guarda os arquivos em resolução original; o site usa apenas as versões em `public/fotos/`.

## Estrutura

```
src/
├── App.tsx            # composição das seções
├── config.ts          # dados do evento, PIX e fotos
├── components/        # Header, Hero, Countdown, Couple, Gallery, Ceremony, GiftList, GiftModal, Footer
├── data/gifts.ts      # lista de presentes
└── lib/
    ├── pix.ts         # gerador de BR Code PIX (com CRC16)
    └── useCopy.ts     # hook para copiar texto para a área de transferência
```
