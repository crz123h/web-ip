async function analyzeTarget() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");

    if (!target) {
        alert("Please enter a valid target.");
        return;
    }

    // Clear previous results
    resultsContainer.innerHTML = "";

    // جلب IP باستخدام خدمة ip-api
    const ipResponse = await fetch(`http://ip-api.com/json/${target}`);
    const ipData = await ipResponse.json();

    if (ipData.status === "fail") {
        resultsContainer.innerHTML = `<p>Error: ${ipData.message}</p>`;
    } else {
        resultsContainer.innerHTML = `
            <h3>IP Information</h3>
            <p><strong>IP Address:</strong> ${ipData.query}</p>
            <p><strong>Country:</strong> ${ipData.country}</p>
            <p><strong>Region:</strong> ${ipData.regionName}</p>
            <p><strong>City:</strong> ${ipData.city}</p>
            <p><strong>Location:</strong> ${ipData.lat}, ${ipData.lon}</p>
        `;
    }
}

async function whoisLookup() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");

    if (!target) {
        alert("Please enter a valid target.");
        return;
    }

    // Clear previous results
    resultsContainer.innerHTML = "";

    // جلب بيانات WHOIS (يمكنك استخدام خدمة خارجية مثل jsonwhois)
    const whoisResponse = await fetch(`https://jsonwhoisapi.com/api/v1/whois?identifier=${target}&apiKey=YOUR_API_KEY`);
    const whoisData = await whoisResponse.json();

    resultsContainer.innerHTML = `
        <h3>WHOIS Information</h3>
        <p><strong>Domain:</strong> ${whoisData.domain_name}</p>
        <p><strong>Registrar:</strong> ${whoisData.registrar_name}</p>
        <p><strong>Creation Date:</strong> ${whoisData.created_date}</p>
        <p><strong>Expiry Date:</strong> ${whoisData.expires_date}</p>
        <p><strong>Owner Contact:</strong> ${whoisData.contact.email}</p>
    `;
async function ipLocation() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");

    if (!target) {
        alert("Please enter a valid target.");
        return;
    }

    // Clear previous results
    resultsContainer.innerHTML = "";

    // جلب بيانات الموقع الجغرافي باستخدام خدمة ip-api
    const locationResponse = await fetch(`http://ip-api.com/json/${target}`);
    const locationData = await locationResponse.json();

    if (locationData.status === "fail") {
        resultsContainer.innerHTML = `<p>Error: ${locationData.message}</p>`;
    } else {
        resultsContainer.innerHTML = `
            <h3>Geolocation Information</h3>
            <p><strong>IP Address:</strong> ${locationData.query}</p>
            <p><strong>Country:</strong> ${locationData.country}</p>
            <p><strong>Region:</strong> ${locationData.regionName}</p>
            <p><strong>City:</strong> ${locationData.city}</p>
            <p><strong>Latitude:</strong> ${locationData.lat}</p>
            <p><strong>Longitude:</strong> ${locationData.lon}</p>
        `;
    }
}

async function dnsLookup() {
    const target = document.getElementById("targetInput").value;
    const resultsContainer = document.getElementById("resultsContainer");

    if (!target) {
        alert("Please enter a valid target.");
        return;
    }

    // Clear previous results
    resultsContainer.innerHTML = "";

    // جلب بيانات DNS باستخدام خدمة DNSJS
    const dnsResponse = await fetch(`https://dns.google/resolve?name=${target}`);
    const dnsData = await dnsResponse.json();

    if (dnsData.Status !== 0) {
        resultsContainer.innerHTML = `<p>Error: Unable to fetch DNS data.</p>`;
    } else {
        resultsContainer.innerHTML = `
            <h3>DNS Information</h3>
            <p><strong>Domain:</strong> ${dnsData.Question[0].name}</p>
            <h4>DNS Records:</h4>
            <ul>
                ${dnsData.Answer.map(record => `<li><strong>${record.type}:</strong> ${record.data}</li>`).join('')}
            </ul>
        `;
    }
}