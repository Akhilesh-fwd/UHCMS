const form = document.getElementById("complaintForm");

// --- 1. SAVING COMPLAINTS ---
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

        // Add a unique ID using Date.now()
        const complaint = {
            id: Date.now(), 
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

// --- 2. DISPLAYING COMPLAINTS ---
function loadComplaints() {
    const tableBody = document.getElementById("complaintList");
    
    if (tableBody) {
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

        // Sort complaints by date descending (newest first)
        complaints.sort((a, b) => new Date(b.date) - new Date(a.date));

        tableBody.innerHTML = ""; // Clear existing rows before drawing

        if (complaints.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No complaints registered yet.</td></tr>`;
        } else {
            complaints.forEach(c => {
                const row = `
                    <tr>
                        <td>${c.name}</td>
                        <td>${c.room}</td>
                        <td><strong>${c.type}</strong></td>
                        <td>${c.description}</td>
                        <td>${c.date}</td>
                        <td style="text-align: center;">
                            <button onclick="deleteComplaint(${c.id})" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    }
}

// --- 3. DELETING COMPLAINTS ---
function deleteComplaint(id) {
    // Ask the user to confirm before deleting
    if (confirm("Are you sure you want to delete this complaint?")) {
        let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
        
        // Filter out the complaint that matches the ID we want to delete
        complaints = complaints.filter(c => c.id !== id);
        
        // Save the updated list back to local storage
        localStorage.setItem("complaints", JSON.stringify(complaints));
        
        // Reload the table so the deleted item disappears
        loadComplaints();
    }
}

// Run the load function when the page opens
loadComplaints();