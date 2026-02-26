# Smart Parking Lot System

A modern, intelligent parking lot management system built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ **Add Parking Slots** - Create new parking slots with customizable features (covered, EV charging)
- ✅ **View All Slots** - Display all parking slots in a responsive grid with real-time status updates
- ✅ **Smart Slot Allocation** - Automatically finds the best available slot based on vehicle requirements
- ✅ **Vehicle Parking** - Park vehicles with optional EV charging and covered slot requirements
- ✅ **Remove Vehicles** - Quickly remove vehicles and free up parking slots
- ✅ **Error Handling** - Comprehensive error handling for edge cases and invalid inputs
- ✅ **System Output Log** - Real-time feedback and logging of all parking operations
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **HTML5** - Semantic markup and form elements
- **CSS3** - Flexbox, CSS Grid, and modern styling with gradients
- **JavaScript (ES6+)** - Event handling, data management, and DOM manipulation

## Data Model

Each parking slot object contains:

```javascript
{
  slotNo: number,           // Unique slot identifier
  isCovered: boolean,       // Whether the slot is covered
  isEVCharging: boolean,    // Whether EV charging is available
  isOccupied: boolean       // Current occupancy status
}
```

## How to Run

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your parking lot!

## Usage Guide

### Adding Slots
1. Enter a unique slot number
2. Check "Covered?" if the slot has a cover
3. Check "EV Charging?" if the slot has EV charging capability
4. Click "Add Slot" to create the slot

### Parking a Vehicle
1. Check "Needs EV Charging?" if your vehicle requires it
2. Check "Needs Cover?" if you want a covered slot
3. Click "Park Vehicle" to allocate the best available slot
4. The system will find the nearest available slot matching your requirements

### Removing a Vehicle
1. Enter the slot number where your vehicle is parked
2. Click "Remove Vehicle" to free up the slot

## Features Details

### Smart Allocation Algorithm
- Filters available (unoccupied) slots
- Applies EV charging requirement filter if needed
- Applies cover requirement filter if needed
- Sorts by slot number to assign the nearest available slot
- Returns error if no matching slots are found

### Error Handling
- Prevents duplicate slot numbers
- Validates slot existence before removal
- Prevents removal from empty slots
- Handles parking with no available slots
- Handles parking with no slots in the system

### Visual Feedback
- Color-coded slot status (Green = Available, Red = Occupied)
- Real-time system log in the output panel
- Success/error messages for each operation
- Responsive card design with hover effects

## Project Commits

This project includes multiple commits demonstrating incremental development:

1. **Commit #1**: Add parking slot functionality
   - Basic UI structure
   - Add slot form with validation
   - Initial data model

2. **Commit #2**: Implement smart parking allocation logic
   - Park vehicle functionality
   - Smart slot allocation algorithm
   - Slot filtering based on requirements

3. **Commit #3**: Complete smart parking lot system
   - Remove vehicle functionality
   - Comprehensive error handling
   - UI styling and responsive design
   - System output logging

## File Structure

```
parking-lot-system/
├── index.html      # Main HTML structure
├── script.js       # JavaScript logic and functionality
├── style.css       # Styling and layout
└── README.md       # This file
```

## Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Future Enhancements

- Database integration for persistent storage
- User authentication and account management
- Mobile app version
- Payment integration
- Vehicle reservation system
- Analytics and reporting dashboard
- Real-time notifications

## License

Open source - Feel free to use and modify as needed.

## Contact

For questions or suggestions, please reach out to the development team.
