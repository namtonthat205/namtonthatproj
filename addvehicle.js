import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabase = createClient('https://svvkjjkmydfpcitvkaad.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dmtqamtteWRmcGNpdHZrYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0OTQ5MDcsImV4cCI6MjAyODA3MDkwN30.7a8zDf1-LO2ptRV7lZvOjqtCB_Kn3ZCqLs7lqqLaUek');


document.addEventListener('DOMContentLoaded', function() {
    const addVehicleButton = document.getElementById('addVehicle');
    const addOwnerButton = document.getElementById('addOwnerButton');

    addVehicleButton.addEventListener('click', async function() {
        const rego = document.getElementById('rego').value;
        const make = document.getElementById('make').value;
        const model = document.getElementById('model').value;
        const colour = document.getElementById('colour').value;
        const owner = document.getElementById('owner').value;

        if (!rego || !make || !model || !colour || !owner) {
            document.getElementById('message').textContent = 'Error: All fields are required.';
            return;
        }

        // Check if the owner exists
        const { data: ownerData, error: ownerError } = await supabase
            .from('PersonID')
            .select('*')
            .eq('Name', owner)
            .single();

        if (ownerError || !ownerData) {
            document.getElementById('ownerForm').style.display = 'block';
            document.getElementById('message').textContent = 'Owner not found. Please add owner details.';
        } else {
            addVehicle(rego, make, model, colour, ownerData.PersonID);
        }
    });

    addOwnerButton.addEventListener('click', async function() {
        const personid = document.getElementById('personid').value;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const dob = document.getElementById('dob').value;
        const license = document.getElementById('license').value;
        const expire = document.getElementById('expire').value;

        if (!personid || !name || !address || !dob || !license || !expire) {
            document.getElementById('message').textContent = 'Error: All fields are required.';
            return;
        }

        let { data: newOwner, error: newOwnerError } = await supabase
            .from('PersonID')
            .insert({ PersonID: personid, Name: name, Address: address, DOB: dob, LicenseNumber: license, ExpiryDate: expire });

        if (newOwnerError) {
            document.getElementById('message').textContent = 'Error';
            return;
        }

        addVehicle(rego, make, model, colour, personid);
    });

    async function addVehicle(rego, make, model, colour, ownerID) {
        let { data: newVehicle, error: vehicleError } = await supabase
            .from('VehicleID')
            .insert({VehicleID : rego, Make : make, Model : model, Colour: colour, OwnerID: ownerID });
            
        if (vehicleError) {
            document.getElementById('message').textContent = 'Error';
            return;
        }

        document.getElementById('message').textContent = 'Vehicle added successfully!';
    }
});
