---

# 📘 Documentação da API de Super-Heróis

## 📌 Visão Geral

Esta aplicação foi desenvolvida com o objetivo de estudar estratégias de performance, rastreamento distribuído e escalabilidade em microsserviços Node.js. A API permite realizar o cadastro e a listagem paginada de super-heróis, utilizando uma arquitetura moderna com Docker e observabilidade via OpenTelemetry.

---

## 🚀 Tecnologias Utilizadas

* **Backend:** [NestJS](https://nestjs.com/)
* **ORM/Query Builder:** [Knex.js](https://knexjs.org/)
* **Banco de Dados:** PostgreSQL
* **Cache:** Redis
* **Observabilidade:** OpenTelemetry + Jaeger
* **Orquestração:** Docker + Docker Compose
* **Proxy Reverso / Load Balancer:** Traefik

---

## ⚙️ Funcionalidades

### Endpoints Disponíveis

#### ➕ Inserção de Super-Heróis

* **POST** `/superheroes`
* **Descrição:** Cadastra um novo super-herói.
* **Body exemplo:**

  ```json
  {
    "name": "Batman",
    "description": "Inteligência"
  }
  ```

#### 📄 Listagem Paginada de Super-Heróis

* **GET** `/heroes?page=1`
* **Descrição:** Retorna uma lista paginada de super-heróis.
* **Parâmetros:**

  * `page` (opcional, default: 1)

---

## 🛠️ Estrutura do Projeto

### 🔧 Banco de Dados

Utiliza PostgreSQL com um schema simples para armazenar informações dos super-heróis. Operações de banco são realizadas via Knex.js, permitindo portabilidade e controle total sobre as queries SQL.

### 📦 Gerenciamento de Dependências

Gerenciado com **pnpm**, otimizando a instalação de pacotes e o tempo de build.

---

## 🐳 Docker & Orquestração

### Dockerfile

Contém duas etapas: **build** e **produção**. Utiliza `node:20-alpine` para garantir uma imagem leve e eficiente.

```Dockerfile
# Etapas detalhadas descritas acima
```

### Docker Compose

Orquestra múltiplos containers para simular um ambiente real de desenvolvimento e produção. Contém:

* **PostgreSQL** para persistência de dados
* **Redis** para caching (expansível futuramente)
* **Jaeger** para visualização do tracing
* **OpenTelemetry Collector** como intermediário para envio dos spans
* **Traefik** para rotear requisições entre instâncias
* **Múltiplas instâncias da aplicação** para testar escalabilidade e load balancing

```yml
# Compose detalhado descrito acima
```

---

## 🔍 Observabilidade e Tracing

### OpenTelemetry

A aplicação está instrumentada com `@opentelemetry/sdk-node` para gerar traces detalhados da execução dos requests.

* Exporta dados para o **OTel Collector**
* Visualização dos traces através da **UI do Jaeger** (`localhost:16686`)

---

## ⚙️ Performance & Escalabilidade

* **Uso de múltiplas instâncias da aplicação (`app1`, `app2`)** para simulação de load balancing.
* **Traefik** como proxy reverso permite distribuir requisições entre instâncias com configuração automática baseada em labels.
* **Limitação de recursos** com `mem_limit` e `cpus` nos containers para estudar comportamento da aplicação sob diferentes cargas.

---

## 📈 Estratégias Futuras de Melhoria

* Implementação de **caching inteligente** com Redis para consultas frequentes.
* Introdução de **testes de carga** com ferramentas como K6 ou Artillery.
* Análise de **spans lentos** para refatoração de trechos críticos.
* Inserção de **métricas customizadas** com Prometheus/Grafana.

---

## 🧪 Como Rodar Localmente

```bash
# Subir containers
docker compose up --build

# Acessar a aplicação
http://localhost
```

---

## 📎 Acessos Importantes

* **API:** `http://localhost`
* **Jaeger UI:** `http://localhost:16686`
* **Traefik Dashboard:** `http://localhost:8080`

---
