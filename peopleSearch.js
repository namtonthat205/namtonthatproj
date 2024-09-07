import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://svvkjjkmydfpcitvkaad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dmtqamtteWRmcGNpdHZrYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0OTQ5MDcsImV4cCI6MjAyODA3MDkwN30.7a8zDf1-LO2ptRV7lZvOjqtCB_Kn3ZCqLs7lqqLaUek');

document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const nameInput = document.getElementById('name').value.trim();
    const licenseInput = document.getElementById('license').value.trim();
    const resultsDiv = document.getElementById('results');
    const messageDiv = document.getElementById('message');

    resultsDiv.innerHTML = '';
    messageDiv.innerHTML = '';

    if (!nameInput && !licenseInput) {
        messageDiv.textContent = 'Please fill in at least one search field.';
        return;
    }
    let query = nameInput 
        ? supabase.from('PersonID').select('*').ilike('Name', `%${nameInput}%`)
        : supabase.from('PersonID').select('*').ilike('LicenseNumber', `%${licenseInput}%`)

    const { data, error } = await query;
    if (error) {
        console.error('Error fetching data:', error);
        messageDiv.textContent = 'Failed to retrieve data. Please try again.';
        return;
    }

    if (data.length === 0) {
        messageDiv.textContent = 'No results found.';
    } else {
        messageDiv.textContent = 'Search successful';
        data.forEach(person => {
            const personDiv = document.createElement('div');
            personDiv.innerHTML = `
                <strong>${person.Name}</strong><br>
                License: ${person.LicenseNumber}<br>
                Address: ${person.Address}<br>
                DOB: ${person.DOB}<br>
                License Expiry: ${person.ExpiryDate}`;
            resultsDiv.appendChild(personDiv);
        })}
});