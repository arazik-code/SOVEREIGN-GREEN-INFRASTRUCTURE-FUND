import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Mock Data
const PROJECTS = [
    { id: "1", name: "Al Dhafra Solar PV", location: "UAE", stage: "Construction", budget: "$1.2B", irr: "8.5%", type: "Solar" },
    { id: "2", name: "NEOM Hydrogen Plant", location: "KSA", stage: "Development", budget: "$5.0B", irr: "12.0%", type: "Hydrogen" },
    { id: "3", name: "Barakah Unit 4", location: "UAE", stage: "Operational", budget: "$24B", irr: "7.2%", type: "Nuclear" },
    { id: "4", name: "Oman Green Ammonia", location: "Oman", stage: "Feasibility", budget: "$3.5B", irr: "11.5%", type: "Ammonia" },
    { id: "5", name: "Egypt Wind Farm", location: "Egypt", stage: "Sourcing", budget: "$300M", irr: "9.1%", type: "Wind" },
];

const KPIS = {
    aum: "$500M",
    activeProjects: 12,
    carbonOffset: "1.2M tCO2",
    irr: "14.2%"
};

const CARBON_DATA = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 280 },
    { name: 'May', value: 590 },
    { name: 'Jun', value: 350 },
    { name: 'Jul', value: 600 },
];

// Routes
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/api/projects", (req, res) => {
    // Simulate delay
    setTimeout(() => res.json(PROJECTS), 500);
});

app.get("/api/projects/:id", (req, res) => {
    const project = PROJECTS.find(p => p.id === req.params.id);
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ error: "Not found" });
    }
});

app.get("/api/kpi", (req, res) => {
    res.json(KPIS);
});

app.get("/api/carbon/forecast", (req, res) => {
    res.json(CARBON_DATA);
});

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
});
