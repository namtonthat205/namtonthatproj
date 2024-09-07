import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://svvkjjkmydfpcitvkaad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dmtqamtteWRmcGNpdHZrYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0OTQ5MDcsImV4cCI6MjAyODA3MDkwN30.7a8zDf1-LO2ptRV7lZvOjqtCB_Kn3ZCqLs7lqqLaUek');

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const regInput = document.getElementById('rego').value.trim();
    const resultsDiv = document.getElementById('results');
    const messageDiv = document.getElementById('message');

    resultsDiv.innerHTML = '';
    messageDiv.innerHTML = '';

    if (!regInput) {
        messageDiv.textContent = 'Please enter a registration number.';
        return;
    }

    const { data, error } = await supabase
        .from('VehicleID')
        .select('*')
        .ilike('VehicleID', `%${regInput}%`);

    if (error) {
        console.error('Error fetching data:', error);
        messageDiv.textContent = 'Failed to retrieve data. Please try again.';
        return;
    }

    if (data.length === 0) {
        messageDiv.textContent = 'No results found.';
    } else {
        messageDiv.textContent = 'Search successful';
        data.forEach(vehicle => {
            const vehicleDiv = document.createElement('div');
            vehicleDiv.innerHTML = `
                <strong>${vehicle.VehicleID}</strong><br>
                License: ${vehicle.Make}<br>
                Model: ${vehicle.Model}<br>
                Colour: ${vehicle.Colour}<br>`;
            resultsDiv.appendChild(vehicleDiv);
        });
    }
});







