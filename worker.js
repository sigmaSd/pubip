import htmlContent from "./docs.html";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const ip = request.headers.get("cf-connecting-ip") || "0.0.0.0";

    // Hash the IP for anonymous statistics
    const salt = env.IP_SALT || "a-permanent-secret-string-12345";
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const anonID = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
      "",
    );

    // Log anonymous ID for stats
    console.log(
      `[STAT] UniqueID: ${anonID} | Country: ${
        request.cf?.country || "Unknown"
      }`,
    );

    // Route: /api - Return JSON with IP
    if (url.pathname === "/api") {
      return new Response(JSON.stringify({ ip: ip }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // Route: / - Show API documentation
    const html = htmlContent.replaceAll("{{ORIGIN}}", url.origin);

    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    });
  },
};
