// STEP 4: Data Model
let parkingSlots = [];

// Initialize output log
let outputLog = [];

// Function to add to output
function addOutput(message) {
    outputLog.push(message);
    updateOutputPanel();
}

// Function to update output panel
function updateOutputPanel() {
    const outputPanel = document.getElementById('outputPanel');
    outputPanel.innerHTML = outputLog.map(msg => `<p>${msg}</p>`).join('');
    // Scroll to bottom
    outputPanel.scrollTop = outputPanel.scrollHeight;
}

// Function to get parking statistics
function getParkingStats() {
    const totalSlots = parkingSlots.length;
    const occupiedSlots = parkingSlots.filter(slot => slot.isOccupied).length;
    const availableSlots = totalSlots - occupiedSlots;
    const occupancyRate = totalSlots > 0 ? ((occupiedSlots / totalSlots) * 100).toFixed(1) : 0;
    
    return {
        totalSlots,
        occupiedSlots,
        availableSlots,
        occupancyRate
    };
}

// STEP 5: Add Parking Slot Logic
function addParkingSlot(slotNo, isCovered, isEVCharging) {
    // Validation: Slot number must be positive
    if (slotNo <= 0) {
        const errorMsg = `Error: Slot number must be greater than 0!`;
        document.getElementById('addSlotMessage').textContent = errorMsg;
        document.getElementById('addSlotMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Validation: Slot number must be unique
    if (parkingSlots.some(slot => slot.slotNo === slotNo)) {
        const errorMsg = `Error: Slot ${slotNo} already exists!`;
        document.getElementById('addSlotMessage').textContent = errorMsg;
        document.getElementById('addSlotMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Create slot object
    const newSlot = {
        slotNo: slotNo,
        isCovered: isCovered,
        isEVCharging: isEVCharging,
        isOccupied: false
    };

    // Push into parkingSlots
    parkingSlots.push(newSlot);

    // Success message
    const successMsg = `Slot ${slotNo} added successfully`;
    document.getElementById('addSlotMessage').textContent = successMsg;
    document.getElementById('addSlotMessage').style.color = 'green';
    addOutput(successMsg);

    // Re-render slot list
    renderSlots();

    // Clear form
    document.getElementById('addSlotForm').reset();

    return true;
}

// STEP 6: View All Slots Logic
function renderSlots() {
    const slotsContainer = document.getElementById('slotsContainer');

    if (parkingSlots.length === 0) {
        slotsContainer.innerHTML = '<p class="no-slots">No parking slots available</p>';
        return;
    }

    // Sort slots by slot number
    const sortedSlots = [...parkingSlots].sort((a, b) => a.slotNo - b.slotNo);

    const slotsHTML = sortedSlots.map(slot => {
        const status = slot.isOccupied ? 'occupied' : 'available';
        const statusText = slot.isOccupied ? 'OCCUPIED' : 'AVAILABLE';
        const features = [];
        if (slot.isCovered) features.push('🏠 Covered');
        if (slot.isEVCharging) features.push('⚡ EV Charging');

        return `
            <div class="slot-card ${status}">
                <div class="slot-number">Slot #${slot.slotNo}</div>
                <div class="slot-status">${statusText}</div>
                <div class="slot-features">${features.join(' | ') || 'Standard'}</div>
            </div>
        `;
    }).join('');

    slotsContainer.innerHTML = slotsHTML;
}

// STEP 7: Park Vehicle Logic ⭐ IMPORTANT
function parkVehicle(needsEV, needsCover) {
    // Validation: Check if any slots exist
    if (parkingSlots.length === 0) {
        const errorMsg = 'Error: No slots exist in the parking lot!';
        document.getElementById('parkMessage').textContent = errorMsg;
        document.getElementById('parkMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Filter slots
    let availableSlots = parkingSlots.filter(slot => slot.isOccupied === false);

    if (needsEV) {
        availableSlots = availableSlots.filter(slot => slot.isEVCharging === true);
    }

    if (needsCover) {
        availableSlots = availableSlots.filter(slot => slot.isCovered === true);
    }

    // Check if any slots available with requirements
    if (availableSlots.length === 0) {
        const errorMsg = 'No slot available with your requirements';
        document.getElementById('parkMessage').textContent = errorMsg;
        document.getElementById('parkMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Sort by nearest slot
    availableSlots.sort((a, b) => a.slotNo - b.slotNo);

    // Allocate first slot
    const allocatedSlot = availableSlots[0];
    allocatedSlot.isOccupied = true;

    const successMsg = `Vehicle parked at slot ${allocatedSlot.slotNo}`;
    document.getElementById('parkMessage').textContent = successMsg;
    document.getElementById('parkMessage').style.color = 'green';
    addOutput(successMsg);

    // Re-render slot list
    renderSlots();

    // Clear form
    document.getElementById('parkVehicleForm').reset();

    return true;
}

// STEP 8: Remove Vehicle Logic
function removeVehicle(slotNo) {
    // Validation: Check if slot number is valid number
    if (slotNo <= 0 || isNaN(slotNo)) {
        const errorMsg = `Error: Invalid slot number`;
        document.getElementById('removeMessage').textContent = errorMsg;
        document.getElementById('removeMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Validation: Check if slot number exists
    const slot = parkingSlots.find(s => s.slotNo === slotNo);

    if (!slot) {
        const errorMsg = `Error: Invalid slot number ${slotNo}`;
        document.getElementById('removeMessage').textContent = errorMsg;
        document.getElementById('removeMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Check if occupied
    if (!slot.isOccupied) {
        const errorMsg = `Error: Slot ${slotNo} is already empty`;
        document.getElementById('removeMessage').textContent = errorMsg;
        document.getElementById('removeMessage').style.color = 'red';
        addOutput(errorMsg);
        return false;
    }

    // Free the slot
    slot.isOccupied = false;

    const successMsg = `Vehicle removed from slot ${slotNo}`;
    document.getElementById('removeMessage').textContent = successMsg;
    document.getElementById('removeMessage').style.color = 'green';
    addOutput(successMsg);

    // Re-render slot list
    renderSlots();

    // Clear form
    document.getElementById('removeVehicleForm').reset();

    return true;
}

// Event Listeners
document.getElementById('addSlotForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const slotNumber = parseInt(document.getElementById('slotNumber').value);
    const isCovered = document.getElementById('coveredCheckbox').checked;
    const isEVCharging = document.getElementById('evChargingCheckbox').checked;

    addParkingSlot(slotNumber, isCovered, isEVCharging);
});

document.getElementById('parkVehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const needsEV = document.getElementById('parkNeedsEV').checked;
    const needsCover = document.getElementById('parkNeedsCover').checked;

    parkVehicle(needsEV, needsCover);
});

document.getElementById('removeVehicleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const slotNumber = parseInt(document.getElementById('removeSlotNumber').value);

    removeVehicle(slotNumber);
});

// Initialize
addOutput('Smart Parking Lot System started');
addOutput('---');
