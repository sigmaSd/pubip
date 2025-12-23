export default {
  async fetch(request, env) {
    const ip = request.headers.get("cf-connecting-ip") || "0.0.0.0";

    // 1. Create a secret salt (ideally move this to an Environment Variable)
    const salt = env.IP_SALT || "a-permanent-secret-string-12345";

    // 2. Hash the IP with the salt
    const encoder = new TextEncoder();
    const data = encoder.encode(ip + salt);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    // 3. Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const anonID = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
      "",
    );

    // 4. Log the anonymous ID for your stats
    // This shows up in Cloudflare Logs/Analytics but hides the real IP
    console.log(`[STAT] UniqueID: ${anonID} | Country: ${request.cf.country}`);

    return new Response(JSON.stringify({ ip: ip }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
