// Helper function: Fetch and handle JSON data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network error");
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// 1. DNS Lookup
async function runDnsLookup() {
    const target = document.getElementById("targetInput").value.trim();
    if (!target) {
        alert("Please enter a target!");
        return;
    }

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `<p>Fetching DNS records for: <strong>${target}</strong>...</p>`;

    const data = await fetchData(`https://api.allorigins.win/raw?url=https://dns.google/resolve?name=${target}`);
    if (data && data.Status === 0) {
        resultsContainer.innerHTML = `<h3>DNS Results:</h3>`;
        data.Answer.forEach((record) => {
            resultsContainer.innerHTML += `<div class="result-card">
                <p><strong>Name:</strong> ${record.name}</p>
                <p><strong>Type:</strong> ${record.type}</p>
                <p><strong>Data:</strong> ${record.data}</p>
            </div>`;
        });
    } else {
        resultsContainer.innerHTML = `<p>No DNS records found for <strong>${target}</strong>.</p>`;
    }
}

// 2. WHOIS Lookup
async function runWhoisLookup() {
    const target = document.getElementById("targetInput").value.trim();
    if (!target) {
        alert("Please enter a domain!");
        return;
    }

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `<p>Fetching WHOIS data for: <strong>${target}</strong>...</p>`;

    const data = await fetchData(`https://api.allorigins.win/raw?url=https://whoisjs.com/api/v1?name=${target}`);
    if (data && data.result) {
        const result = data.result;
        resultsContainer.innerHTML = `<h3>WHOIS Results:</h3>
            <div class="result-card">
                <p><strong>Registrar:</strong> ${result.registrar}</p>
                <p><strong>Creation Date:</strong> ${result.creation_date}</p>
                <p><strong>Expiration Date:</strong> ${result.expiration_date}</p>
                <p><strong>Nameservers:</strong> ${result.nameservers.join(", ")}</p>
            </div>`;
    } else {
        resultsContainer.innerHTML = `<p>No WHOIS data found for <strong>${target}</strong>.</p>`;
    }
}

// 3. IP Geolocation
async function runGeoLocation() {
    const target = document.getElementById("targetInput").value.trim();
    if (!target) {
        alert("Please enter an IP address!");
        return;
    }

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `<p>Fetching Geolocation data for: <strong>${target}</strong>...</p>`;

    const data = await fetchData(`https://ipapi.co/${target}/json/`);
    if (data && data.ip) {
        resultsContainer.innerHTML = `<h3>Geolocation Results:</h3>
            <div class="result-card">
                <p><strong>IP:</strong> ${data.ip}</p>
                <p><strong>City:</strong> ${data.city}</p>
                <p><strong>Region:</strong> ${data.region}</p>
                <p><strong>Country:</strong> ${data.country_name}</p>
                <p><strong>Latitude:</strong> ${data.latitude}</p>
                <p><strong>Longitude:</strong> ${data.longitude}</p>
            </div>`;
    } else {
        resultsContainer.innerHTML = `<p>No Geolocation data found for <strong>${target}</strong>.</p>`;
    }
}

// 4. Port Scanner (Simulation)
function runPortScan() {
    const target = document.getElementById("targetInput").value.trim();
    if (!target) {
        alert("Please enter an IP address!");
        return;
    }

    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = `<p>Scanning ports for: <strong>${target}</strong>...</p>`;

    setTimeout(() => {
        resultsContainer.innerHTML = `<h3>Port Scanner Results:</h3>
            <div class="result-card">
                <p><strong>Open Ports:</strong></p>
                <ul>
                    <li>Port 22: SSH</li>
                    <li>Port 80: HTTP</li>
                    <li>Port 443: HTTPS</li>
                </ul>
            </div>`;
    }, 3000); // Simulate scanning delay
}

// General UI Enhancements
function clearResults() {
    document.getElementById("resultsContainer").innerHTML = "";
}
