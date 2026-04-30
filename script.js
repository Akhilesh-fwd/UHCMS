const form = document.getElementById("complaintForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const room = document.getElementById("room").value.trim();
        const type = document.getElementById("type").value;
        const description = document.getElementById("description").value.trim();
        const date = document.getElementById("date").value;

        if (name === "" || room === "" || description === "" || type === "") {
            alert("Please fill all required fields.");
            return;
        }

        const complaint = {
            name,
            room,
            type,
            description,
            date
        };

        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        complaints.push(complaint);
        localStorage.setItem("complaints", JSON.stringify(complaints));

        alert("Complaint Submitted Successfully!");
        form.reset();
    });
}

const tableBody = document.getElementById("complaintList");

if (tableBody) {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

    // Sort complaints by date descending (newest first)
    complaints.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (complaints.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No complaints registered yet.</td></tr>`;
    } else {
        complaints.forEach(c => {
            const row = `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.room}</td>
                    <td><strong>${c.type}</strong></td>
                    <td>${c.description}</td>
                    <td>${c.date}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}