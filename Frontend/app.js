
const API = "http://localhost:8080/api/incidents";

const form = document.getElementById("incidentForm");

async function loadIncidents() {

    try {
        const response = await fetch(API);

        if (!response.ok) {
            throw new Error("Unable to load incidents");
        }

        const incidents = await response.json();

        const table = document.getElementById("incidentTable");

        table.innerHTML = "";

        let open = 0;
        let progress = 0;
        let resolved = 0;

        incidents.forEach(incident => {

            if (incident.status === "OPEN") open++;
            if (incident.status === "IN_PROGRESS") progress++;
            if (incident.status === "RESOLVED") resolved++;

            const row = document.createElement("tr");

            const values = [
                incident.id,
                incident.title,
                incident.priority,
                incident.status,
                incident.assignedTo,
                incident.createdAt
            ];

            values.forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value ?? "";
                row.appendChild(cell);
            });

            const actions = document.createElement("td");

            const updateButton = document.createElement("button");
            updateButton.textContent = "Resolve";
            updateButton.className = "status-btn";

            updateButton.onclick = () => updateIncident(incident);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.onclick = () => deleteIncident(incident.id);

            actions.append(updateButton, deleteButton);
            row.appendChild(actions);

            table.appendChild(row);
        });

        document.getElementById("total").textContent = incidents.length;
        document.getElementById("open").textContent = open;
        document.getElementById("progress").textContent = progress;
        document.getElementById("resolved").textContent = resolved;

    } catch (error) {
        alert(error.message);
    }
}

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const incident = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: "OPEN",
        category: document.getElementById("category").value,
        assignedTo: document.getElementById("assignedTo").value
    };

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(incident)
        });

        if (!response.ok) {
            throw new Error("Incident creation failed");
        }

        alert("Incident created successfully!");

        form.reset();

        loadIncidents();

    } catch (error) {
        alert(error.message);
    }
});

async function updateIncident(incident) {

    const updated = {
        ...incident,
        status: "RESOLVED"
    };

    try {
        const response = await fetch(`${API}/${incident.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updated)
        });

        if (!response.ok) {
            throw new Error("Update failed");
        }

        loadIncidents();

    } catch (error) {
        alert(error.message);
    }
}

async function deleteIncident(id) {

    if (!confirm("Are you sure you want to delete this incident?")) {
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        loadIncidents();

    } catch (error) {
        alert(error.message);
    }
}

loadIncidents();
