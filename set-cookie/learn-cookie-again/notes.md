# cookies

Cookies are the small piece of key pairs value stored in browser.
The main purpose of a cookie is to remember information about a user’s visit to a website, enabling the site to personalize the experience and maintain state across otherwise stateless HTTP requests. 

Cookies were sent to server with every request.

## Cookies serve three primary functions:
- Session Management
- Personalization
- Tracking and Analytics

Way of setting cookies-
1. JavaScript in browser - document.cookie = "key=value"
2. Web Servers - using Set-Cookie header send as response. (looks like- Set-Cookie:test=test;sessionId=4f4f5 );

#### Properties of cookies-
- cookie scope
  - domain
  - path
- expires, max-age
- same-site

### cookie scope-
- domain is a property while creating a cookie and this property define the scope of the cookie and except that domain no others can access cookies.
- path property define that which path can access the cookie within a domain.

simple explain-
Like if we set domain=localhost then when i go to localhost/api/test then it will not able to access the cookie but using path property we give access to the path so following path can also access cookies

by default if we set a cookie for a domain then every path of that domain can access the cookie

### path property
path=/
this means sent cookie in every path

path=/test
this means cookie will only send to server when we send request from /test path


### **Expires/Max-Age**
Both property doing same task.
If we never set this cookie then when we close our browser the cookies were flushed. But using these property we can define when our cookie will expire.


### httpOnly cookies
Cookies which are not accessable by browser console or we cannot access using JavaScript

### Third Party Cookies
Third-party cookies are small text files stored on a user’s device by a domain different from the website the user is currently visiting.  They are primarily used for cross-site tracking, allowing external entities like ad networks and analytics providers to monitor user activity across multiple unrelated websites to build behavioral profiles for targeted advertising. 

### Zombie cookies
Zombie cookies (also known as evercookies or supercookies) are persistent tracking tools that automatically regenerate themselves after a user deletes them.


### Cookie Security
- Stealing Cookie
- Cross Site Request Forgery(CSRF)

CSRF is a vulnerability using this attacker can access your cookies.

To prevent this we use SameSite property and SameSite property denied the attacker to steal cookie, basically this property means cookies are sent only in same site means who set the cookie can only access cookie.