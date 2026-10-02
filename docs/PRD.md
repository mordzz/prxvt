# Product Requirements Document (PRD)
## Private AI Agent on Robinhood Chain

### 1. Overview

Membangun platform **Private AI Agent** dengan konsep seperti PRXVT, tetapi menggunakan **Robinhood Chain** sebagai blockchain utama.

Fokus utama produk:

**Private AI Chat + AI Agent + Private Payment**

User dapat berinteraksi dengan AI secara privat, menghubungkan wallet, memberikan balance/allowance kepada AI Agent, dan memungkinkan agent melakukan pembayaran atau transaksi secara otomatis.

---

## 2. Core Product Flow

```text
User
 ↓
Connect Wallet
 ↓
Wallet Authentication
 ↓
Private AI Session
 ↓
AI Chat / AI Agent
 ↓
Agent membutuhkan service/payment
 ↓
Private Payment Layer
 ↓
Robinhood Chain
 ↓
API / AI Agent / dApp / Service
```

Blockchain tidak menjadi fokus utama UI. User harus merasakan pengalaman seperti menggunakan AI chat biasa.

---

# 3. Core Features

## A. Wallet Authentication

User dapat login menggunakan wallet tanpa email/password.

Flow:

```text
Connect Wallet
↓
Sign Message
↓
Verify Signature
↓
Create Session
↓
Access AI
```

Requirements:

- Support wallet EVM
- Support Robinhood Chain
- Sign message authentication
- Tidak meminta private key
- Session authentication
- Disconnect wallet
- Wallet address tidak perlu diberikan ke AI provider

Teknologi authentication akan ditentukan berdasarkan opsi terbaik yang mendukung Robinhood Chain.

---

# 4. Private AI Chat

Ini merupakan fitur utama produk.

User dapat melakukan percakapan dengan AI Agent tanpa identitas wallet dikirim langsung ke AI provider.

Architecture:

```text
User
 ↓
Encrypted / Private Session
 ↓
Backend AI Gateway
 ↓
LLM Provider
 ↓
AI Response
```

AI provider dapat berupa:

- OpenAI
- Anthropic
- OpenRouter
- model lainnya

Backend bertindak sebagai **AI Gateway**.

AI provider tidak perlu mengetahui:

```text
wallet address
private key
on-chain identity
payment wallet
```

Requirement:

- Private AI session
- Streaming response
- AI model routing
- Chat history
- Delete conversation
- Minimal logging
- Wallet identity dipisahkan dari conversation identity
- API key provider hanya berada di backend

Optional:

- encrypted chat history
- client-side encryption
- encrypted memory
- temporary/ephemeral conversation
- no-history mode

---

# 5. AI Agent

AI tidak hanya berfungsi sebagai chatbot.

AI Agent dapat menggunakan tools untuk melakukan pekerjaan.

Contoh:

```text
User:
"Research project X"

AI Agent
 ↓
Search web
 ↓
Call API
 ↓
Analyze data
 ↓
Return result
```

Agent architecture:

```text
AI Agent
 ├── LLM
 ├── Web Search
 ├── APIs
 ├── Blockchain Tools
 └── Payment Tools
```

Ke depannya AI Agent dapat berinteraksi dengan agent atau service lain.

---

# 6. Agent Wallet

Setiap user dapat memiliki wallet khusus untuk AI Agent.

Contoh:

```text
User Wallet
     ↓
Agent Wallet
     ↓
AI Agent
```

Agent wallet digunakan untuk melakukan transaksi.

User dapat menentukan batasan seperti:

```text
Balance: $20

Max transaction: $1

Daily limit: $5

Allowed token:
USDG / stablecoin

Allowed network:
Robinhood Chain
```

Tujuannya agar AI Agent dapat melakukan transaksi kecil tanpa meminta user melakukan signature setiap kali.

Private key agent tidak boleh terekspos ke frontend.

---

# 7. Private Payment

Target akhirnya adalah memungkinkan AI Agent melakukan pembayaran tanpa setiap aktivitas pembayaran mudah dikaitkan langsung dengan wallet utama user.

Target architecture:

```text
User Wallet
 ↓
Private Balance
 ↓
Privacy Layer
 ↓
AI Agent
 ↓
Private Payment
 ↓
Merchant / API / Agent
```

Untuk MVP, private payment dapat dilakukan secara bertahap.

### Phase 1

Agent Wallet + normal on-chain payment.

```text
User
 ↓
Agent Wallet
 ↓
Payment
 ↓
Robinhood Chain
```

Ini **belum dianggap cryptographically private**.

Tujuannya untuk membangun payment flow terlebih dahulu.

### Phase 2

Integrasi privacy protocol / privacy pool.

Target:

```text
User
 ↓
Deposit
 ↓
Privacy Pool
 ↓
Private Balance
 ↓
AI Agent
 ↓
Private Payment
```

Perlu dilakukan research:

**Apakah sudah ada privacy protocol/API yang mendukung Robinhood Chain?**

Jika tersedia:

```text
Integrate existing protocol
```

Jika belum:

```text
Deploy / build privacy smart contract
```

Kemungkinan teknologi:

- ZK Proof
- Commitment
- Nullifier
- Merkle Tree
- Relayer
- Paymaster

Tujuan utamanya adalah mengurangi linkability:

```text
User Wallet

X

Agent Payment
```

---

# 8. Privacy Pool Research

Sebelum implementasi Phase 2 perlu menentukan:

1. Apakah ada privacy pool yang sudah support Robinhood Chain?
2. Apakah protocol tersebut open-source?
3. Apakah smart contract bisa dideploy sendiri?
4. Apakah tersedia SDK/API?
5. Token apa yang didukung?
6. Apakah mendukung stablecoin?
7. Bagaimana sistem relayer?
8. Bagaimana biaya transaksi?
9. Apakah contract/circuit sudah diaudit?
10. Bagaimana privacy model dan compliance model-nya?

Jika tidak tersedia solusi yang sesuai, privacy layer akan dikembangkan sendiri di atas Robinhood Chain.

---

# 9. Robinhood Chain Integration

Robinhood Chain menjadi settlement layer utama.

Digunakan untuk:

```text
Wallet
Agent Wallet
Payments
Smart Contracts
Privacy Contracts
Agent Transactions
```

Frontend harus dapat:

```text
Detect Network
↓
Switch to Robinhood Chain
↓
Read Balance
↓
Send Transaction
↓
Track Transaction
```

---

# 10. Privacy Architecture

Identitas harus dipisahkan sebisa mungkin.

Target:

```text
Wallet Identity
      X
Conversation Identity
      X
Agent Identity
      X
Payment Identity
```

Backend tidak boleh membuat satu identifier yang secara tidak perlu menghubungkan seluruh aktivitas tersebut.

---

# 11. MVP

MVP tidak perlu langsung membangun full ZK privacy system.

Prioritas:

```text
1. Landing Page

2. Connect Wallet

3. Wallet Authentication

4. Private AI Chat

5. AI Gateway

6. AI Agent

7. Agent Wallet

8. Robinhood Chain Integration

9. Agent Payment

10. Basic Privacy Architecture
```

Privacy Pool masuk setelah core AI Agent sudah berjalan.

---

# 12. MVP User Experience

User membuka website.

```text
Landing Page
     ↓
Start Private AI
     ↓
Connect Wallet
     ↓
Sign Message
     ↓
Private Chat
```

User kemudian dapat memberikan balance kepada agent.

```text
Fund Agent
$10
```

Contoh:

```text
User:

"Research tokenized assets yang tersedia
di Robinhood Chain."
```

AI Agent melakukan research.

Jika membutuhkan paid API:

```text
Service requires $0.05

Agent Wallet
     ↓
Pay $0.05
     ↓
API
     ↓
Result
```

AI kemudian memberikan hasil kepada user.

---

# 13. Product Positioning

Produk bukan:

"Blockchain AI Chat"

Produk adalah:

**Private AI Agent**

Core message:

> Your AI conversations are private.
> Your agent can act and pay onchain.

Alternative:

> Private AI. Private Actions. Private Payments.

Built on Robinhood Chain.

---

# 14. Future Development

Setelah MVP:

```text
Private AI
      ↓
Encrypted Memory
      ↓
Autonomous Agent
      ↓
Agent Wallet
      ↓
Private Payment
      ↓
Privacy Pool / ZK
      ↓
Agent-to-Agent Payment
      ↓
Private Agent Economy
```

Target akhirnya adalah membuat AI Agent yang dapat **chat, reason, execute, dan pay** dengan privacy sebagai bagian utama dari arsitektur.