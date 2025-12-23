import htmlContent from "./docs.html";

export default {
  fetch(request) {
    const url = new URL(request.url);
    const ip = request.headers.get("cf-connecting-ip") || "0.0.0.0";

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
