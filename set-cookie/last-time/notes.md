# HTTP Cookies

## Table of Contents

1. [Why Cookies Exist (HTTP is Stateless)](#1-why-cookies-exist)
2. [What is a Cookie?](#2-what-is-a-cookie)
3. [How Cookies Work (The Full Flow)](#3-how-cookies-work)
4. [Cookie Attributes Explained (Very Important)](#4-cookie-attributes)
5. [Types of Cookies](#5-types-of-cookies)
6. [Setting & Reading Cookies with Raw Node.js (no library)](#6-raw-nodejs)
7. [Cookies with Express + cookie-parser](#7-express-cookies)
8. [Signed Cookies](#8-signed-cookies)
9. [Sessions with Cookies (express-session)](#9-sessions)
10. [Cookies vs localStorage vs sessionStorage](#10-comparison)
11. [Security: XSS, CSRF, Session Hijacking](#11-security)
12. [Best Practices Checklist](#12-best-practices)
13. [Mini Project: Login System with Cookies](#13-mini-project)
14. [Quick Revision Cheat Sheet](#14-cheat-sheet)

---

<a name="1-why-cookies-exist"></a>

## 1. Why Cookies Exist (HTTP is Stateless)

To understand cookies, you must first understand one big problem.

**HTTP is "stateless".**

Stateless means the server has _no memory_. Every request the browser sends is treated as brand new. The server does not remember who you are from one request to the next.

Imagine a shop where the shopkeeper has total amnesia. You walk in, tell him your name, buy something, and walk out. You come back 10 seconds later and he has _no idea_ who you are. You have to introduce yourself again, every single time.

That is exactly how plain HTTP works:

- Request 1: Browser → "I want the homepage." Server → "Here you go."
- Request 2: Browser → "I want my profile page." Server → "Who are you? I have never seen you before."

This is a problem. Websites need to remember things:

- Are you logged in?
- What's in your shopping cart?
- What language did you pick?
- What theme (dark/light) do you prefer?

We need a way to make the server (or the browser) **remember**. Cookies are one of the oldest and most common solutions to this.

> **Key idea:** Cookies add "memory" (state) on top of a memoryless (stateless) protocol.

---

<a name="2-what-is-a-cookie"></a>

## 2. What is a Cookie?

A **cookie** is a small piece of text data that the server asks the browser to store. The browser saves it and then automatically sends it back to that same server with every future request.

Think of it like a **hand stamp at an event**. When you enter, staff stamp your hand. The next time you walk past the gate, they look at your stamp and instantly know you already paid. You don't re-introduce yourself; the stamp does it for you.

Some basic facts about cookies:

- A cookie is just a **`name=value`** pair of text. Example: `theme=dark` or `sessionId=abc123`.
- Cookies are stored **by the browser**, on the user's device.
- A single cookie can hold roughly **4 KB** of data (about 4000 characters). It is meant for _small_ data only.
- Each website (domain) can store many cookies, but browsers limit it (commonly around 50 cookies per domain).
- Cookies are sent **automatically** by the browser with each request to the matching site. You do not have to write code to attach them every time.

> **Important:** A cookie is text only. You cannot store images, files, or huge objects in it. For bigger data, store an ID in the cookie and keep the real data on the server.

---

<a name="3-how-cookies-work"></a>

## 3. How Cookies Work (The Full Flow)

Cookies travel through HTTP **headers**. Two headers matter:

- **`Set-Cookie`** → sent by the **server** to tell the browser "please store this cookie."
- **`Cookie`** → sent by the **browser** back to the server with each request, carrying the stored cookies.

Here is the step-by-step flow:

**Step 1 — Server sends a cookie**

When you visit a site, the server response can include a header like this:

```
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: sessionId=abc123; HttpOnly; Path=/
```

**Step 2 — Browser stores it**

The browser reads the `Set-Cookie` header and saves `sessionId=abc123` into its cookie storage for that website.

**Step 3 — Browser sends it back automatically**

On every later request to the same site, the browser automatically attaches:

```
GET /profile HTTP/1.1
Host: example.com
Cookie: sessionId=abc123
```

**Step 4 — Server reads it and "remembers" you**

The server reads the `Cookie` header, sees `sessionId=abc123`, looks it up, and now knows who you are. The amnesia is cured.

A simple diagram of the cycle:

```
   BROWSER                          SERVER
      |                                |
      |  ---- request (no cookie) ---> |
      |                                |  creates cookie
      |  <-- response: Set-Cookie ---- |
      |  (browser stores cookie)       |
      |                                |
      |  -- request: Cookie header --> |
      |                                |  reads cookie, knows you
      |  <------- response ----------- |
```

This loop repeats for the whole time the cookie is valid.

---

<a name="4-cookie-attributes"></a>

## 4. Cookie Attributes Explained (Very Important)

A cookie is more than just `name=value`. You can attach **attributes** that control _how_, _when_, and _where_ the cookie is used. This is the most important section for security and correctness, so read it slowly.

A full cookie can look like this:

```
Set-Cookie: sessionId=abc123; Domain=example.com; Path=/; Expires=Wed, 09 Jun 2027 10:18:14 GMT; Max-Age=86400; Secure; HttpOnly; SameSite=Lax
```

Let's break down each part.

### 4.1 `Name=Value`

The actual data. `sessionId=abc123` means the cookie's name is `sessionId` and its value is `abc123`. Keep values small and avoid storing sensitive raw data (like a plain password) here.

### 4.2 `Domain`

Controls **which website(s)** the cookie is sent to.

- If you set `Domain=example.com`, the cookie is sent to `example.com` **and** its subdomains like `shop.example.com` and `api.example.com`.
- If you do **not** set Domain, the cookie defaults to the _exact_ host that set it (and not subdomains). This is usually safer.

> Rule: A site can only set cookies for its own domain. `evil.com` cannot set a cookie for `yourbank.com`.

### 4.3 `Path`

Controls **which URL paths** the cookie is sent to.

- `Path=/` → sent to every page on the site (most common).
- `Path=/admin` → only sent when the URL starts with `/admin`. So `/admin/users` gets it, but `/home` does not.

This lets you scope a cookie to one part of your site.

### 4.4 `Expires`

Sets an **exact date and time** when the cookie should die. After that moment, the browser deletes it.

```
Expires=Wed, 09 Jun 2027 10:18:14 GMT
```

If you set a date in the past, you effectively **delete** the cookie (this is the trick used to clear cookies).

### 4.5 `Max-Age`

An alternative to `Expires`. Instead of an exact date, you give the number of **seconds** the cookie should live from now.

- `Max-Age=3600` → lives for 1 hour.
- `Max-Age=86400` → lives for 1 day.
- `Max-Age=0` → delete it immediately.

> If both `Expires` and `Max-Age` are present, `Max-Age` wins (modern browsers prefer it).

> If you set **neither** Expires nor Max-Age, the cookie becomes a **session cookie** that disappears when the browser closes (more on this below).

### 4.6 `Secure`

If present, the cookie is **only** sent over **HTTPS** (encrypted connections), never plain HTTP.

This protects the cookie from being read by attackers snooping on the network. Always use `Secure` for anything sensitive in production.

> Note: On `localhost` during development, browsers often allow Secure cookies over HTTP as a convenience, but on a real domain you need HTTPS.

### 4.7 `HttpOnly`

If present, the cookie **cannot be read by JavaScript** in the browser (`document.cookie` will not show it).

Why does this matter? It defends against **XSS attacks** (explained in the Security section). If a hacker injects malicious JavaScript into your page, they still cannot steal an `HttpOnly` cookie. This is essential for session/login cookies.

```
Set-Cookie: sessionId=abc123; HttpOnly
```

> Rule of thumb: Login/session cookies should almost always be `HttpOnly`.

### 4.8 `SameSite` (Very important for security)

Controls whether the cookie is sent on **cross-site requests** (requests started from a _different_ website). This is your main defense against **CSRF attacks**.

It has three possible values:

**`SameSite=Strict`**
The cookie is sent **only** when the request starts from the _same_ site. If a user clicks a link from another website to yours, the cookie is _not_ sent on that first request. Most secure, but can feel slightly inconvenient (e.g., a user clicking a link from email to your site may appear logged out at first).

**`SameSite=Lax`** (the modern default in most browsers)
The cookie is sent on same-site requests, **and** on top-level navigations (when the user _clicks a link_ to go to your site). But it is **not** sent on background cross-site requests like images, iframes, or form POSTs from other sites. This is a good balance and the recommended default for most cases.

**`SameSite=None`**
The cookie is sent on **all** requests, including cross-site ones. This is needed for things like third-party widgets or APIs used across sites. **If you use `SameSite=None`, you MUST also set `Secure`**, otherwise browsers reject the cookie.

```
Set-Cookie: id=abc; SameSite=None; Secure
```

Quick comparison:

| SameSite value | Same-site request | Click link to your site | Background cross-site request |
| -------------- | ----------------- | ----------------------- | ----------------------------- |
| Strict         | ✅ sent           | ❌ not sent             | ❌ not sent                   |
| Lax            | ✅ sent           | ✅ sent                 | ❌ not sent                   |
| None           | ✅ sent           | ✅ sent                 | ✅ sent (requires Secure)     |

### 4.9 `Priority` (less common)

A hint to the browser about which cookies to keep if it has to delete some to save space. Values: `Low`, `Medium`, `High`. Rarely set manually.

### 4.10 `Partitioned` (newer — CHIPS)

A newer attribute for privacy. It ties a third-party cookie to the _top-level site_ it was set on, so it can't be used to track you across different sites. This is part of a feature called **CHIPS** (Cookies Having Independent Partitioned State). You will mostly see it in third-party/embedded contexts. For most normal apps you won't need it yet, but it's good to know it exists.

---

<a name="5-types-of-cookies"></a>

## 5. Types of Cookies

Cookies are often grouped by their behavior or purpose. These aren't separate "kinds of objects" — they're just labels based on the attributes you set.

### 5.1 Session Cookies vs Persistent Cookies

- **Session cookie:** Has **no** `Expires` or `Max-Age`. It lives only while the browser is open and is deleted when the browser closes. Good for temporary things like "is this tab logged in right now."
- **Persistent cookie:** Has an `Expires` or `Max-Age`. It survives browser restarts until that time passes. Good for "remember me" features.

### 5.2 First-Party vs Third-Party Cookies

- **First-party cookie:** Set by the site you are _actually visiting_. If you're on `example.com` and it sets a cookie, that's first-party. Used for normal stuff like login and preferences.
- **Third-party cookie:** Set by a _different_ domain embedded in the page (like an ad, a tracking pixel, or an embedded widget). Historically used for cross-site tracking and advertising. Browsers are increasingly **blocking** third-party cookies for privacy reasons.

### 5.3 Secure Cookies

Cookies with the `Secure` attribute — only sent over HTTPS.

### 5.4 HttpOnly Cookies

Cookies with the `HttpOnly` attribute — invisible to JavaScript, safer against XSS.

### 5.5 SameSite Cookies

Cookies scoped with `SameSite` to limit cross-site sending — defense against CSRF.

### 5.6 Signed Cookies

A cookie whose value is "signed" with a secret key so the server can detect if anyone tampered with it. (Covered in detail in Section 8.)

### 5.7 Supercookies / Zombie Cookies (avoid these)

Tricky cookies that are hard to delete or that respawn after deletion using other storage. These are considered bad practice and a privacy violation. Know the term, but **never build them.**

---

<a name="6-raw-nodejs"></a>

## 6. Setting & Reading Cookies with Raw Node.js (no library)

Before using any framework, it helps to see cookies at the lowest level using only Node's built-in `http` module. This shows you that cookies are _just headers_ — there's no magic.

### 6.1 Setting a cookie

```js
// raw-set-cookie.js
const http = require("http");

const server = http.createServer((req, res) => {
  // Tell the browser to store a cookie named "theme" with value "dark"
  res.setHeader("Set-Cookie", "theme=dark; HttpOnly; Path=/; Max-Age=3600");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Cookie has been set! Check your browser dev tools.</h1>");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

Run it with `node raw-set-cookie.js`, open `http://localhost:3000`, and look in your browser's DevTools → Application → Cookies. You'll see `theme=dark`.

To set **multiple** cookies at once, pass an **array** to `Set-Cookie`:

```js
res.setHeader("Set-Cookie", [
  "theme=dark; Path=/",
  "lang=en; Path=/; Max-Age=86400",
]);
```

### 6.2 Reading a cookie

The browser sends cookies in the `Cookie` request header as one string like `theme=dark; lang=en`. Node does **not** parse this for you automatically, so you split it yourself:

```js
// raw-read-cookie.js
const http = require("http");

// Helper to turn "theme=dark; lang=en" into { theme: 'dark', lang: 'en' }
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((pair) => {
    const index = pair.indexOf("=");
    const key = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    cookies[key] = decodeURIComponent(value);
  });

  return cookies;
}

const server = http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  const theme = cookies.theme || "light";

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<h1>Your theme is: ${theme}</h1>`);
});

server.listen(3000, () => console.log("http://localhost:3000"));
```

This proves the core truth: **a cookie is nothing but a header string.** Libraries just save you from writing this parsing code every time.

---

<a name="7-express-cookies"></a>

## 7. Cookies with Express + cookie-parser

In real projects, almost everyone uses **Express** (a popular Node.js web framework). Express makes cookies much easier, especially with the `cookie-parser` middleware.

### 7.1 Setup

```bash
npm init -y
npm install express cookie-parser
```

### 7.2 Setting a cookie with `res.cookie()`

Express adds a handy `res.cookie(name, value, options)` method.

```js
// app.js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser()); // enables reading cookies via req.cookies

app.get("/set", (req, res) => {
  res.cookie("username", "alice", {
    maxAge: 1000 * 60 * 60, // 1 hour, in MILLISECONDS (note: not seconds!)
    httpOnly: true, // not readable by JavaScript
    secure: false, // set true in production (HTTPS)
    sameSite: "lax", // CSRF protection
    path: "/",
  });

  res.send('Cookie "username" has been set.');
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

> **Watch out:** In raw HTTP, `Max-Age` is in **seconds**. But Express's `maxAge` option is in **milliseconds**. This is a very common bug. `maxAge: 3600` in Express means 3.6 seconds, not 1 hour!

### 7.3 Reading cookies with `req.cookies`

Because we used `cookie-parser`, all cookies are already parsed into an object on `req.cookies`:

```js
app.get("/get", (req, res) => {
  const username = req.cookies.username; // clean and easy

  if (username) {
    res.send(`Welcome back, ${username}!`);
  } else {
    res.send("No username cookie found.");
  }
});
```

### 7.4 Deleting a cookie with `res.clearCookie()`

```js
app.get("/logout", (req, res) => {
  res.clearCookie("username", { path: "/" });
  res.send("Cookie deleted. You are logged out.");
});
```

> **Important:** To clear a cookie, the options (like `path` and `domain`) must **match** how it was originally set. If you set it with `path: '/admin'`, you must clear it with `path: '/admin'`, or it won't be removed.

---

<a name="8-signed-cookies"></a>

## 8. Signed Cookies

### The problem

A normal cookie value is plain text stored on the user's computer. The user (or an attacker) can **open it and change it**. Imagine a cookie `role=user`. A malicious user could edit it to `role=admin` and send it back. If your server blindly trusts it, you've been hacked.

### The solution: signing

A **signed cookie** attaches a cryptographic signature created using a **secret key** only your server knows. The signature is like a tamper-proof seal.

- When the server **sets** the cookie, it calculates a signature from the value + secret.
- When the cookie **comes back**, the server recalculates the signature and checks it matches.
- If someone changed the value, the signatures won't match, and the server rejects it.

> Note: Signing does **not hide** the value (it's not encryption). The user can still _read_ it. Signing only guarantees the value **wasn't changed**.

### Code with cookie-parser

You pass a secret to `cookieParser()`:

```js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser("my-super-secret-key")); // the secret enables signing

// Set a SIGNED cookie
app.get("/login", (req, res) => {
  res.cookie("role", "admin", { signed: true, httpOnly: true });
  res.send("Signed cookie set.");
});

// Read SIGNED cookies from req.signedCookies (NOT req.cookies)
app.get("/dashboard", (req, res) => {
  const role = req.signedCookies.role;

  if (role === "admin") {
    res.send("Welcome, admin. Your cookie is verified and untampered.");
  } else {
    res.send("Access denied or cookie was tampered with.");
  }
});

app.listen(3000);
```

Key points:

- Signed cookies are read from **`req.signedCookies`**, not `req.cookies`.
- If the value was modified by the user, `req.signedCookies.role` will be `false` instead of the value.
- Keep your secret key **truly secret** (use environment variables, never hardcode it in real projects).

---

<a name="9-sessions"></a>

## 9. Sessions with Cookies (express-session)

For real login systems, you usually don't store user data directly in the cookie. Instead you use a **session**.

### The session idea (very important)

- The **real data** (who the user is, their permissions, etc.) is stored **on the server**.
- The cookie only holds a small, random **session ID** — like a ticket number.
- On each request, the server reads the session ID from the cookie and looks up the matching data on the server side.

Analogy: A **coat check** at a theater. You hand over your coat (your data stays with them) and get a small numbered ticket (the cookie). The ticket itself is worthless to a thief — the actual coat is safely behind the counter.

This is safer because:

- The user never sees or controls the actual data.
- Even if someone steals the cookie, it's just an ID; you can invalidate it server-side anytime.

### Code with express-session

```bash
npm install express express-session
```

```js
const express = require("express");
const session = require("express-session");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keep-this-secret-and-long", // signs the session ID cookie
    resave: false, // don't re-save session if nothing changed
    saveUninitialized: false, // don't create empty sessions
    cookie: {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  }),
);

// "Log in" by storing data in the session (lives on the server)
app.get("/login", (req, res) => {
  req.session.user = { id: 1, name: "Alice" };
  res.send("Logged in! A session cookie was set.");
});

// Read it back on later requests
app.get("/profile", (req, res) => {
  if (req.session.user) {
    res.send(`Hello ${req.session.user.name}, you are logged in.`);
  } else {
    res.send("You are not logged in.");
  }
});

// Log out by destroying the session
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out. Session destroyed.");
  });
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

> **Production note:** By default, `express-session` stores sessions in your server's memory, which is wiped on restart and won't work across multiple servers. In real apps, use a proper store like **Redis** (`connect-redis`) or a database to hold sessions.

---

<a name="10-comparison"></a>

## 10. Cookies vs localStorage vs sessionStorage

These are three ways to store data in the browser. Beginners often confuse them. Here's the difference:

| Feature                       | Cookies                       | localStorage             | sessionStorage           |
| ----------------------------- | ----------------------------- | ------------------------ | ------------------------ |
| Sent to server automatically? | ✅ Yes (every request)        | ❌ No                    | ❌ No                    |
| Capacity                      | ~4 KB                         | ~5–10 MB                 | ~5–10 MB                 |
| Expires?                      | Yes (you set it)              | Never (until cleared)    | When tab closes          |
| Readable by JavaScript?       | Only if NOT HttpOnly          | ✅ Yes                   | ✅ Yes                   |
| Main use                      | Auth/session, server needs it | Larger client-only data  | Temporary per-tab data   |
| Good for login tokens?        | ✅ (with HttpOnly)            | ⚠️ Risky (XSS can steal) | ⚠️ Risky (XSS can steal) |

**Simple guidance:**

- Need the **server** to know something on every request (like login state)? → **Cookie** (HttpOnly).
- Storing larger data only the **browser** needs (like a draft, cached UI state)? → **localStorage**.
- Temporary data that should vanish when the tab closes? → **sessionStorage**.

> A common security debate: storing auth tokens in `localStorage` is convenient but vulnerable to XSS, because any injected script can read it. An `HttpOnly` cookie cannot be read by scripts, which is why it's often preferred for sessions — though it then needs CSRF protection. There's no perfect option; you choose based on your threat model.

---

<a name="11-security"></a>

## 11. Security: XSS, CSRF, Session Hijacking

Cookies often hold the "keys to the kingdom" (your login), so attackers target them. Here are the main threats and how cookie attributes defend against them.

### 11.1 XSS (Cross-Site Scripting)

**What it is:** An attacker manages to inject malicious JavaScript into your web page (for example, through an unsanitized comment box). That script runs in your users' browsers.

**The danger to cookies:** The script can run `document.cookie` to read all readable cookies and send them to the attacker. If your session cookie is stolen, the attacker can impersonate the user.

**Defense:**

- Set **`HttpOnly`** on sensitive cookies → JavaScript can't read them, so even injected scripts can't steal them.
- Also: sanitize/escape all user input so injection never happens in the first place.

### 11.2 CSRF (Cross-Site Request Forgery)

**What it is:** A tricky one. Because the browser **automatically sends cookies** with every request to a site, an attacker can trick a logged-in user into making an _unwanted_ request to your site.

Example: You're logged into your bank (`bank.com`). You visit a malicious page that secretly contains:

```html
<img src="https://bank.com/transfer?to=attacker&amount=1000" />
```

Your browser loads that "image" and **automatically attaches your bank cookie**. The bank sees a valid logged-in request and transfers the money. You did nothing on purpose. That's CSRF.

**Defense:**

- Set **`SameSite=Lax`** or **`SameSite=Strict`** → the browser won't send your cookie on that cross-site background request.
- Use **CSRF tokens**: a secret random value that legitimate forms include and attackers can't guess.
- Require important actions to use POST with proper checks, not simple GET links.

### 11.3 Session Hijacking

**What it is:** An attacker gets hold of a valid session cookie (by sniffing unencrypted traffic, XSS, etc.) and uses it to become you.

**Defense:**

- Use **`Secure`** so the cookie only travels over HTTPS (encrypted) — no sniffing.
- Use **`HttpOnly`** to block JavaScript theft.
- **Rotate/regenerate** the session ID after login (`req.session.regenerate`) so a fixed/old ID can't be reused (this also defends against "session fixation").
- Set reasonable **expiry** times so stolen cookies don't last forever.

### Summary of which attribute defends what

| Attribute              | Defends against                      |
| ---------------------- | ------------------------------------ |
| `HttpOnly`             | XSS cookie theft                     |
| `Secure`               | Network sniffing / session hijacking |
| `SameSite`             | CSRF                                 |
| Short expiry + signing | Reuse of stolen/tampered cookies     |

---

<a name="12-best-practices"></a>

## 12. Best Practices Checklist

For production cookies (especially auth/session), aim for all of these:

- ✅ **Use `HttpOnly`** for session/login cookies (block JS access).
- ✅ **Use `Secure`** so cookies only go over HTTPS.
- ✅ **Use `SameSite=Lax`** (or `Strict` for high-security actions). Use `None; Secure` only when truly cross-site.
- ✅ **Store only an ID** in the cookie; keep real data in a server-side session/database.
- ✅ **Sign cookies** if you must store data in them, so tampering is detectable.
- ✅ **Set sensible expiry** (`Max-Age`/`Expires`). Don't let sessions live forever.
- ✅ **Regenerate the session ID** after login to prevent fixation.
- ✅ **Keep secrets in environment variables**, never hardcoded.
- ✅ **Don't store sensitive raw data** (passwords, card numbers) in cookies.
- ✅ **Match path/domain** when clearing cookies, or they won't delete.
- ✅ Remember Express `maxAge` is in **milliseconds**, raw `Max-Age` is in **seconds**.

---

<a name="13-mini-project"></a>

## 13. Mini Project: Simple Login System with Cookies

Let's tie it all together in one small, runnable example. This is a tiny login demo using a signed, secure-style session cookie. (Passwords are hardcoded here just for learning — in real apps use a database and hash passwords with bcrypt.)

```bash
npm install express cookie-parser
```

```js
// login-demo.js
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("change-this-secret-in-real-life"));

// Pretend database of valid users
const USERS = { alice: "password123" };

// A fake "session store" mapping sessionId -> username
const sessions = {};

// Helper: make a random session id
function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Home page
app.get("/", (req, res) => {
  const sid = req.signedCookies.sid;
  const user = sid && sessions[sid];

  if (user) {
    res.send(`
      <h1>Welcome, ${user}!</h1>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Please log in</h1>
      <form method="POST" action="/login">
        <input name="username" placeholder="username" />
        <input name="password" type="password" placeholder="password" />
        <button>Login</button>
      </form>
    `);
  }
});

// Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (USERS[username] && USERS[username] === password) {
    const sid = makeId();
    sessions[sid] = username; // store session on the server

    // Only the small random ID goes into the cookie
    res.cookie("sid", sid, {
      httpOnly: true, // JS can't read it (XSS defense)
      sameSite: "lax", // CSRF defense
      signed: true, // tamper detection
      secure: false, // set true with HTTPS in production
      maxAge: 1000 * 60 * 15, // 15 minutes
    });

    res.redirect("/");
  } else {
    res.send('Invalid credentials. <a href="/">Try again</a>');
  }
});

// Handle logout
app.get("/logout", (req, res) => {
  const sid = req.signedCookies.sid;
  delete sessions[sid]; // remove server session
  res.clearCookie("sid"); // remove the cookie
  res.redirect("/");
});

app.listen(3000, () => console.log("http://localhost:3000"));
```

This demonstrates the whole journey: setting a signed HttpOnly cookie at login, storing real data server-side, reading the cookie on each request to identify the user, and clearing it on logout.

---

<a name="14-cheat-sheet"></a>

## 14. Quick Revision Cheat Sheet

**The two headers**

- `Set-Cookie` → server tells browser to store a cookie.
- `Cookie` → browser sends stored cookies back to server.

**Core attributes**

- `Domain` → which site(s) get the cookie.
- `Path` → which URL paths get the cookie.
- `Expires` / `Max-Age` → when the cookie dies (Max-Age in seconds; Express maxAge in ms).
- `Secure` → HTTPS only.
- `HttpOnly` → JS cannot read it (XSS defense).
- `SameSite` → Strict / Lax / None (CSRF defense; None needs Secure).

**Cookie types**

- Session (no expiry, dies on browser close) vs Persistent (has expiry).
- First-party (the site you're on) vs Third-party (embedded other domains, being phased out).
- Signed (tamper-proof) vs unsigned.

**Node.js essentials**

- Raw: `res.setHeader('Set-Cookie', ...)` and parse `req.headers.cookie` yourself.
- Express: `res.cookie()`, `res.clearCookie()`, read via `req.cookies`.
- Signed: `cookieParser('secret')`, read via `req.signedCookies`.
- Sessions: `express-session`, store data server-side, cookie holds only the ID.

**Security mapping**

- XSS → fix with `HttpOnly` + input sanitization.
- CSRF → fix with `SameSite` + CSRF tokens.
- Hijacking → fix with `Secure` + HTTPS + session regeneration + short expiry.

**Golden rules**

1. Cookie holds an ID, not the real data.
2. Sensitive cookies = `HttpOnly` + `Secure` + `SameSite`.
3. Never trust an unsigned cookie value.

---
