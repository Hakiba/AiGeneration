import fs from "fs";

const company_names = [
  "Tech Solutions Inc.",
  "Innovative IT Services",
  "FutureTech Enterprises",
  "GlobalNet Solutions",
  "CyberSecure Systems",
];

const prompt = `Create a detailed case study for a fictional company named ${company_names}. The case study should include:
    1. Company Overview
    2. Network Topology
    3. Core Network Devices (routers, switches, firewalls, wireless access points)
    4. Server Infrastructure (domain controllers, file servers, application servers, database servers)
    5. Cloud Services (providers and services used)
    6. Security Measures (multi-factor authentication, endpoint protection, regular security audits, employee training)
    7. Network Management (monitoring, configuration management, help desk software)

    The description should be suitable for university-level coursework.`;

async function fetchOllama() {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "stablelm-zephyr",
      prompt: prompt,
      stream: false,
    }),
  }).then((response) => response.json());

  const answeredMessage = response.response;
  console.log(answeredMessage);
  fs.writeFile("output.txt", answeredMessage, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
}

fetchOllama();
