# Etapa 1: Construção
FROM node:20-alpine AS builder

# Diretório de trabalho no container
WORKDIR /app

# Copia arquivos de definição de dependências
COPY pnpm-lock.yaml package.json ./

# Instala dependências de desenvolvimento
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile

# Copia o restante da aplicação
COPY . .

# Compila a aplicação
RUN pnpm build

# Etapa 2: Produção
FROM node:20-alpine AS production

# Diretório de trabalho no container
WORKDIR /app

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Copia apenas os artefatos necessários da etapa de construção
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expõe a porta padrão do NestJS
EXPOSE 3000

# Comando para rodar a aplicação em produção
CMD ["node", "dist/main"]
